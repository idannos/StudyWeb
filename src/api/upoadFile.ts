import axios from 'axios';

const baseRemoteUrl = 'https://study-backend-f93592ee2f5e.herokuapp.com'
const baseLocalUrl = 'http://127.0.0.1:5000'
const currentUrl = baseRemoteUrl
export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${currentUrl}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.task_id;
};

export const checkStatus = async (task_id: string): Promise<any> => {
    const statusUrl = `${currentUrl}/status/${task_id}`;
    const response = await axios.get(statusUrl);
    return response.data;
};

