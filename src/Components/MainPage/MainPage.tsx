import React, {useState, useEffect} from 'react';
import TopBar from "../TopBar/TopBar";
import {CircularProgress, Container} from "@mui/material";
import {useDropzone} from 'react-dropzone';
import {uploadFile, checkStatus} from "../../api/upoadFile"
import Quiz, {QuizData} from "../Quiz/Quiz";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const MainPage: React.FC = () => {
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [taskID, setTaskID] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        try {
            if (file.type !== 'application/pdf') {
                alert('Only PDF files are accepted. Please upload a file with a .pdf extension.');
                return;
            }
            setIsLoading(true);
            const taskId = await uploadFile(file);
            setTaskID(taskId);
        } catch (error) {
            console.error("Failed to upload file and receive task ID", error);
            window.alert("Failed to upload file and receive task ID");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const pollTaskStatus = async () => {
            if (taskID) {
                try {
                    const status = await checkStatus(taskID);
                    if (status.status === 'completed') {
                        setIsLoading(false);
                        setQuizData(status.result);
                    } else {
                        setTimeout(pollTaskStatus, 4000);
                    }
                } catch (error) {
                    console.error("Failed to fetch task status", error);
                    window.alert("Failed to fetch task status");
                }
            }
        };
        pollTaskStatus();

        return () => {
            setTaskID(null); // Reset taskID when component unmounts
        };
    }, [taskID]);

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
                            <div
                                className="text-lg text-gray-700 font-semibold whitespace-nowrap flex-col items-center justify-center">
                                <div>
                                    Drag 'n' drop a file here
                                </div>
                                <div className={"flex justify-center"}>or click to select a file</div>
                            </div>
                    }
                </div>
                {!isLoading && (
                    <div className="flex flex-col justify-center items-center mt-8">
                        <CircularProgress/>
                        <h2 className="text-center text-lg mt-6">
                            <div className={"font-bold"}>Generating quiz!</div>
                            <div>
                                this may take about 40 seconds. Please
                                do
                                not leave or reload the page.
                            </div>
                        </h2>
                    </div>
                )}
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
