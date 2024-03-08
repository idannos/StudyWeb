import React, {useState} from 'react';
import TopBar from "../TopBar/TopBar";
import {Container} from "@mui/material";
import {useDropzone} from 'react-dropzone';
import {uploadFile} from "../../api/upoadFile";
import Quiz, {QuizData} from "../Quiz/Quiz";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const MainPage: React.FC = () => {
    const [quizData, setQuizData] = useState<QuizData | null>(null);

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        try {
            if (file.type !== 'application/pdf') {
                alert('Only PDF files are accepted. Please upload a file with a .pdf extension.');
                return;
            }
            const quizData: QuizData = await uploadFile(file);
            setQuizData(quizData);
        } catch (error) {
            console.error("Failed to upload file and receive quiz data", error);
            // Implement appropriate error handling here
        }
    };

    const onDropRejected = (fileRejections: any) => {
        alert('Only PDF files are accepted, and one file at a time. Please upload a file with a .pdf extension.');
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        onDropRejected,
        accept: {'application/pdf': [".pdf"]},
        multiple: false
    });
    const theme = createTheme({
        palette: {
            primary: {
                main: '#0dcaf0', // This is a close approximation of Tailwind's cyan-500
                contrastText: '#ffffff', // Ensuring text is white for good contrast
            },
            // You can customize other palette options as needed
        },
    });
    return (
        <div>
            <ThemeProvider theme={theme}>
                <TopBar/>
            </ThemeProvider>

            <Container maxWidth="xl">
                <div {...getRootProps()}
                     className={`mt-8 flex justify-center items-center border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out w-full max-w-md mx-auto ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'} py-8 px-4`}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p className="text-lg text-blue-500 font-semibold">Drop the file here ...</p> :
                            <p className="text-lg text-gray-700 font-semibold whitespace-nowrap">Drag 'n' drop a file
                                here, or click to select a file</p>
                    }
                </div>

                {quizData && quizData?.questions?.length && <div className={"mt-12"}>
                    <Quiz quizData={quizData}/>
                </div>}
                {quizData && !quizData?.questions?.length && <div className={"mt-12"}>
                    <h2 className="text-2xl font-bold text-center">No questions found in the quiz data (for dev-
                        probably problem with json)</h2>
                </div>}

            </Container>
        </div>
    );
};

export default MainPage;
