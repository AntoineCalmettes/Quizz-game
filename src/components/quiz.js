import React, { useState, useEffect } from 'react';

const Quiz = ({ quiz, onBack }) => {
    const [responses, setResponses] = useState(() => {
        const savedResponses = localStorage.getItem(`quiz-responses-${quiz.title}`);
        return savedResponses ? JSON.parse(savedResponses) : {};
    });

    const [score, setScore] = useState(() => {
        const savedScore = localStorage.getItem(`quiz-score-${quiz.title}`);
        return savedScore ? parseInt(savedScore, 10) : 0;
    });

    useEffect(() => {
        console.log("Responses updated", responses);
        localStorage.setItem(`quiz-responses-${quiz.title}`, JSON.stringify(responses));
    }, [responses, quiz.title]);

    useEffect(() => {
        console.log("Score updated", score);
        localStorage.setItem(`quiz-score-${quiz.title}`, score.toString());
    }, [score, quiz.title]);

    const handleResponse = (questionIndex, correctAnswer, selectedAnswer) => {
        if (responses[questionIndex]) return;

        const isCorrect = correctAnswer === selectedAnswer;
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionIndex]: {
                correct: correctAnswer,
                selected: selectedAnswer
            }
        }));
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }
    };

    const getButtonClass = (questionIndex, answer) => {
        if (!responses[questionIndex]) return 'bg-gray-200 text-black';
        if (responses[questionIndex].selected === answer) {
            return responses[questionIndex].correct === answer ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
        }
        return 'bg-gray-200 text-black';
    };

    return (
        <div className="mx-auto text-center max-w-lg mt-5">
            <button onClick={onBack} className="mb-5 bg-blue-500 text-white px-4 py-2 rounded">Retour</button>
            <h2 className="text-2xl mb-5">{quiz.title}</h2>
            <p className="mb-5">Score: {score}</p>
            <div>
                {quiz.questions.map((q, index) => (
                    <div key={index} className="mb-4">
                        <p className="mb-2">{q.question}</p>
                        {q.answers.map((answer, i) => (
                            <button
                                key={i}
                                onClick={() => handleResponse(index, q.correct, answer)}
                                className={`${getButtonClass(index, answer)} px-4 py-2 rounded m-1`}
                                disabled={responses[index] !== undefined}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
