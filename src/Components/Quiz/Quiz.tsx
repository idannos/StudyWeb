import React, { useState } from 'react';

interface Question {
    question: string;
    options: string[];
    correct_answer: string;
}

export interface QuizData {
    exam_title: string;
    subject: string;
    questions: Question[];
}

interface QuizProps {
    quizData: QuizData;
}

const Quiz: React.FC<QuizProps> = ({ quizData }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(quizData.questions.length).fill(''));
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleOptionSelect = (questionIndex: number, option: string) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionIndex] = option;
        setSelectedOptions(newSelectedOptions);
    };

    const handleSubmitQuiz = () => {
        setSubmitted(true);
    };

    return (
        <div className="max-w-4xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4 text-center">{quizData.exam_title}: {quizData.subject}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                {quizData.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {question.options.map((option, optionIndex) => (
                                <button
                                    key={optionIndex}
                                    type="button"
                                    disabled={submitted}
                                    className={`p-4 border rounded-lg ${selectedOptions[questionIndex] === option ? (submitted ? (option === question.correct_answer ? 'bg-green-200' : 'bg-red-200') : 'bg-blue-200') : 'bg-white'} hover:bg-blue-100 focus:bg-blue-300`}
                                    onClick={() => handleOptionSelect(questionIndex, option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className={`mt-2 ${submitted && selectedOptions[questionIndex] !== question.correct_answer ? 'visible' : 'invisible'}`}>
                            <p className="text-red-500">Correct answer: {question.correct_answer}</p>
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    <button
                        type="button"
                        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                        onClick={handleSubmitQuiz}
                        disabled={submitted}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Quiz;
