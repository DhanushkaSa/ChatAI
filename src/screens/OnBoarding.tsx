import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import Onboarding from 'react-native-onboarding-swiper';
import { s, vs } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



const OnBoarding = () => {

    const navigation = useNavigation<any>();

    const Square = ({ isLight, selected }: any) => {
        let backgroundColor;
        if (isLight) {
            backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
        } else {
            backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        }
        return (


            <View style={{ width: 8, height: 8, borderRadius: 4, marginHorizontal: 3, backgroundColor, marginBottom: 150 }} />

        );




    }




    const Next = ({ ...props }: any) => (
        <TouchableOpacity style={styles.next} {...props}>
            <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
    );


    const Done = ({ ...props }) => (
        <TouchableOpacity style={styles.next} {...props} onPress={async () => {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            navigation.replace('Login');
        }}>
            <Text style={styles.nextText}>Done</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>



            <Onboarding
                DotComponent={Square}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                showSkip={false}

                pages={[
                    {
                        backgroundColor: COLORS.black,
                        image: <Image source={{ uri: "https://www.intelligenthq.com/wp-content/uploads/2023/11/Automating-HR-How-AI-And-Chatbots-Revolutionize-Employee-Onboarding1.jpg" }} style={styles.image} />,
                        title: 'Your One-Stop Name Solution',
                        subtitle: 'Simplify the process of finding the perfect and professional name.',
                        subTitleStyles: { fontSize: s(14) }
                    },
                    {
                        backgroundColor: COLORS.black,
                        image: <Image source={{ uri: "https://blog.docsbot.ai/wp-content/uploads/2024/03/image-28.jpeg" }} style={styles.image} />,
                        title: 'Meet Your AI Assistant',
                        subtitle: 'Chat, learn, and get instant answers — your personal AI is always ready to help.',
                        subTitleStyles: { fontSize: s(14) }
                    },

                    {
                        backgroundColor: COLORS.black,
                        image: <Image source={{ uri: "https://www.thelpi.org/wp-content/uploads/2023/09/shutterstock_1901618698-scaled-1.jpg" }} style={styles.image} />,
                        title: 'Empower Your Conversations',
                        subtitle: 'Experience smarter communication with AI that understands and adapts to you.',
                        subTitleStyles: { fontSize: s(14) }
                    },


                ]}
            />
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.black

    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 30,

    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        color: COLORS.white,
        marginTop: "10%",
        textAlign: "center",

    },

    imageView: {
        width: 170,
        height: 170,
        borderRadius: 30,
        position: "absolute",
        marginTop: "45%",
        marginLeft: "10%",

    },

    subTitle: {
        fontSize: 20,
        color: COLORS.textColor,
        textAlign: "center",
        marginTop: 10,
        padding: 10,

    },

    next: {
        width: 100,
        height: 50,
        backgroundColor: COLORS.btnColor,
        marginRight: s(20),
        borderRadius: 10,
        marginBottom: vs(35),
        
    },
    nextText: {
        fontSize: 15,
        color: COLORS.black,
        textAlign: "center",
        marginTop: vs(15),
        
        



    }
})