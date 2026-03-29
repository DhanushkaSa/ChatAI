import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Persist sessions to AsyncStorage
const persistSessions = (sessions: ChatSession[], userId: string) => {
  if (!userId) return;
  AsyncStorage.setItem(`chat_history_${userId}`, JSON.stringify(sessions)).catch(err =>
    console.warn('Failed to persist chat history:', err),
  );
};

// Load sessions from AsyncStorage (call on app start)
export const loadFromStorage = (userId: string) => async (dispatch: any) => {
  if (!userId) {
    dispatch(clearSessions());
    return;
  }
  try {
    const data = await AsyncStorage.getItem(`chat_history_${userId}`);
    if (data) {
      dispatch(loadSessions(JSON.parse(data)));
    } else {
      dispatch(clearSessions());
    }
  } catch (err) {
    console.warn('Failed to load chat history:', err);
  }
};

export interface ChatMessage {
  msg: string;
  answer: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

interface ChatHistoryState {
  sessions: ChatSession[];
}

const initialState: ChatHistoryState = {
  sessions: [],
};

const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<{ session: ChatSession; userId: string }>) => {
      const { session, userId } = action.payload;
      const existingIndex = state.sessions.findIndex(
        s => s.id === session.id,
      );
      if (existingIndex >= 0) {
        state.sessions[existingIndex] = session;
      } else {
        state.sessions.unshift(session);
      }
      persistSessions(state.sessions, userId);
    },
    deleteSession: (state, action: PayloadAction<{ sessionId: string; userId: string }>) => {
      const { sessionId, userId } = action.payload;
      state.sessions = state.sessions.filter(s => s.id !== sessionId);
      persistSessions(state.sessions, userId);
    },
    loadSessions: (state, action: PayloadAction<ChatSession[]>) => {
      state.sessions = action.payload;
    },
    clearSessions: (state) => {
      state.sessions = [];
    },
  },
});

export const {addSession, deleteSession, loadSessions, clearSessions} =
  chatHistorySlice.actions;
export default chatHistorySlice.reducer;
