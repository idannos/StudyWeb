import axios from 'axios';
import {QuizData} from "../Components/Quiz/Quiz";


export const uploadFile = async (file: File): Promise<QuizData> => {
    const formData = new FormData();
    formData.append('file', file);
    const url = 'http://localhost:5000/upload';
    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    // Assuming the server responds with the quiz data in the expected format
    return response.data as QuizData;
};