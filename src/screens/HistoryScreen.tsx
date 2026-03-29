import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../styles/colors';
import {s, vs} from 'react-native-size-matters';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  ChatSession,
  deleteSession,
  loadSessions,
  loadFromStorage,
  clearSessions,
} from '../store/chatHistorySlice';
import {useAuth} from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const HistoryScreen = () => {
  const sessions: ChatSession[] = useSelector(
    (state: any) => state.chatHistory.sessions,
  );
  const dispatch = useDispatch();
  const authContext = useAuth();
  const user = authContext?.user;
  const navigation = useNavigation<any>();

  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load persisted history from AsyncStorage on mount
  useEffect(() => {
    if (user?.uid) {
      dispatch(loadFromStorage(user.uid) as any);
    } else {
      dispatch(clearSessions());
    }
  }, [dispatch, user?.uid]);

  // Load chat history from Firestore on mount (falls back to Redux if permission denied)
  useEffect(() => {
    if (!user?.uid) return;

    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('chatHistory')
        .orderBy('updatedAt', 'desc')
        .onSnapshot(
          snapshot => {
            if (snapshot) {
              const loaded: ChatSession[] = snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title || 'Untitled',
                messages: doc.data().messages || [],
                createdAt: doc.data().createdAt || 0,
                updatedAt: doc.data().updatedAt || 0,
              }));
              dispatch(loadSessions(loaded));
            }
          },
          _error => {
            // Permission denied or other Firestore error — silently fall back to Redux data
            console.warn('Firestore sync unavailable, using local data only.');
          },
        );
    } catch (_e) {
      console.warn('Firestore connection failed, using local data only.');
    }

    return () => unsubscribe?.();
  }, [user?.uid, dispatch]);

  // Toggle expand
  const toggleExpand = useCallback((id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  // Delete session
  const handleDelete = useCallback(
    (session: ChatSession) => {
      Alert.alert(
        'Delete Chat',
        `Delete "${session.title}"?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              if (user?.uid) {
                dispatch(deleteSession({ sessionId: session.id, userId: user.uid }));
                firestore()
                  .collection('users')
                  .doc(user.uid)
                  .collection('chatHistory')
                  .doc(session.id)
                  .delete()
                  .catch((err: any) =>
                    console.error('Firestore delete error:', err),
                  );
              }
            },
          },
        ],
        {cancelable: true},
      );
    },
    [dispatch, user?.uid],
  );

  // Resume session — navigate to Home with session data
  const handleResume = useCallback(
    (session: ChatSession) => {
      navigation.navigate('Home', {resumedSession: session});
    },
    [navigation],
  );

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Render a session card
  const renderSessionCard = ({item}: {item: ChatSession}) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => toggleExpand(item.id)}
        onLongPress={() => handleDelete(item)}
        style={styles.sessionCard}>
        {/* Header row */}
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <MaterialIcon
              name="chat-bubble-outline"
              size={s(18)}
              color={COLORS.btnColor}
            />
          </View>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.cardMeta}>
              {item.messages.length} messages • {formatDate(item.updatedAt)}
            </Text>
          </View>
          <FeatherIcon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={s(18)}
            color={COLORS.textColor}
          />
        </View>

        {/* Expanded messages preview */}
        {isExpanded && (
          <View style={styles.expandedContainer}>
            {item.messages.slice(0, 4).map((msg, idx) => (
              <View key={idx} style={styles.previewMessageRow}>
                <View style={styles.previewBubbleUser}>
                  <Text style={styles.previewLabel}>You</Text>
                  <Text style={styles.previewText} numberOfLines={2}>
                    {msg.msg}
                  </Text>
                </View>
                <View style={styles.previewBubbleAI}>
                  <Text style={styles.previewLabelAI}>AI</Text>
                  <Text style={styles.previewTextAI} numberOfLines={2}>
                    {msg.answer}
                  </Text>
                </View>
              </View>
            ))}
            {item.messages.length > 4 && (
              <Text style={styles.moreText}>
                +{item.messages.length - 4} more messages
              </Text>
            )}

            {/* Action buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.resumeButton}
                onPress={() => handleResume(item)}>
                <FeatherIcon
                  name="play-circle"
                  size={s(14)}
                  color={COLORS.white}
                />
                <Text style={styles.resumeText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item)}>
                <FeatherIcon
                  name="trash-2"
                  size={s(14)}
                  color="#ff5555"
                />
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcon
        name="chat-bubble-outline"
        size={s(60)}
        color={COLORS.lightGray}
      />
      <Text style={styles.emptyTitle}>No Conversations Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start chatting on the Home tab and your conversations will appear here.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat History</Text>
        <Text style={styles.headerSubtitle}>
          {sessions.length} conversation{sessions.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Sessions list */}
      <FlatList
        data={sessions}
        keyExtractor={item => item.id}
        renderItem={renderSessionCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  // Header
  header: {
    paddingTop: vs(50),
    paddingBottom: vs(15),
    paddingHorizontal: s(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: s(22),
    fontWeight: '700',
  },
  headerSubtitle: {
    color: COLORS.textColor,
    fontSize: s(12),
    marginTop: vs(2),
  },

  // List
  listContent: {
    paddingHorizontal: s(15),
    paddingTop: vs(10),
    paddingBottom: vs(30),
    flexGrow: 1,
  },

  // Session card
  sessionCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: s(12),
    padding: s(14),
    marginBottom: vs(10),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    width: s(36),
    height: s(36),
    borderRadius: s(18),
    backgroundColor: 'rgba(29, 190, 26, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(10),
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: s(14),
    fontWeight: '600',
  },
  cardMeta: {
    color: COLORS.textColor,
    fontSize: s(11),
    marginTop: vs(2),
  },

  // Expanded section
  expandedContainer: {
    marginTop: vs(12),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: vs(10),
  },
  previewMessageRow: {
    marginBottom: vs(8),
  },
  previewBubbleUser: {
    backgroundColor: 'rgba(29, 190, 26, 0.15)',
    borderRadius: s(8),
    padding: s(8),
    marginBottom: vs(4),
  },
  previewBubbleAI: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: s(8),
    padding: s(8),
  },
  previewLabel: {
    color: COLORS.btnColor,
    fontSize: s(9),
    fontWeight: '700',
    marginBottom: vs(2),
    textTransform: 'uppercase',
  },
  previewLabelAI: {
    color: COLORS.textColor,
    fontSize: s(9),
    fontWeight: '700',
    marginBottom: vs(2),
    textTransform: 'uppercase',
  },
  previewText: {
    color: COLORS.white,
    fontSize: s(12),
  },
  previewTextAI: {
    color: COLORS.gray,
    fontSize: s(12),
  },
  moreText: {
    color: COLORS.textColor,
    fontSize: s(11),
    textAlign: 'center',
    marginTop: vs(4),
    marginBottom: vs(8),
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(8),
  },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.btnColor,
    paddingHorizontal: s(14),
    paddingVertical: vs(8),
    borderRadius: s(20),
    gap: s(5),
  },
  resumeText: {
    color: COLORS.white,
    fontSize: s(12),
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 85, 85, 0.12)',
    paddingHorizontal: s(14),
    paddingVertical: vs(8),
    borderRadius: s(20),
    gap: s(5),
  },
  deleteText: {
    color: '#ff5555',
    fontSize: s(12),
    fontWeight: '600',
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(40),
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: s(18),
    fontWeight: '700',
    marginTop: vs(15),
  },
  emptySubtitle: {
    color: COLORS.textColor,
    fontSize: s(13),
    textAlign: 'center',
    marginTop: vs(8),
    lineHeight: vs(18),
  },
});