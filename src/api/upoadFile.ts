import axios from 'axios';
import {QuizData} from "../Components/Quiz/Quiz";


export const uploadFile = async (file: File): Promise<QuizData> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    // Assuming the server responds with the quiz data in the expected format
    return response.data as QuizData;
};