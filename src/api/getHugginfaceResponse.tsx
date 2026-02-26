import axios from 'axios';

import { HUGGING_FACE_KEY } from '../keys/keys';



const huggingFaceUrl = 'https://router.huggingface.co/v1/chat/completions';

export const getHuggingFaceResponse = async (msg: string) => {
    try {
        const response = await axios.post(
            huggingFaceUrl,
            {
                model: 'deepseek-ai/DeepSeek-V3',
                messages: [{ role: 'user', content: msg }],
                max_tokens: 800,
                stream: false,
            },
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_KEY}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(response.data?.choices[0]?.message?.content);

        return response.data?.choices[0]?.message?.content;
    } catch (error: any) {

        if (error.response) {

            console.error("Hugging Face Error Data:", error.response.data);
            console.error("Status Code:", error.response.status);
        } else if (error.request) {

            console.error("Network Error: Check your internet connection");
        } else {
            console.error("Error:", error.message);
        }
        return "Sorry, I couldn't get a response right now.";
    }
};