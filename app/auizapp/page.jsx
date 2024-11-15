'use client'
import React, { useState } from "react";

import { quiz } from "./data";

const Page = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const { questions } = quiz;
    const { question, answers, correctAnswer } = questions[activeQuestion];

    // select and check answer
    const onAnswerSelected = (answer, idx) => {
        setChecked(true);
        setSelectedAnswerIndex(idx);
        if (answer === correctAnswer) {
            setSelectedAnswer(true);
            console.log('true');
        } else {
            setSelectedAnswer(false);
            console.log('false');
        }
    };

    // Calculate score and increment to next question
    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
        );
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setActiveQuestion(0);
            setShowResult(true);
        }
        setChecked(false);
    };

    return (
        <div className="max-w-[740px] mx-auto p-4 mb-2 mt-1 bg-black rounded">
            <h1 className="text-[#eee] text-3xl">Quiz Page</h1>
            <div>
                <h2 className="text-[#eee] text-xl">
                    Question: {activeQuestion + 1}
                    <span>/{questions.length}</span>
                </h2>
            </div>
            <div>
                {!showResult ? (
                    <div className="bg-[#f8f8f8] p-4 mt-4 rounded-md">
                        <h3 className="text-[#000105] text-xl pb-8">{questions[activeQuestion].question}</h3>
                        {answers.map((answer, idx) => (
                            <li
                                key={idx}
                                onClick={() => onAnswerSelected(answer, idx)}
                                className={`p-4 mb-2 cursor-pointer border-2 rounded-lg ${selectedAnswerIndex === idx ? 'bg-[#000925] text-white rounded-md' : 'hover:bg-[#d8d8d8]'}`}
                            >
                                <span>{answer}</span>
                            </li>
                        ))}
                        {checked ? (
                            <button
                                onClick={nextQuestion}
                                className="w-full mt-4 py-3 px-6 bg-[#808080] text-[#f8f8f8] rounded-md hover:bg-[#5a5a5a]"
                            >
                                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        ) : (
                            <button
                                onClick={nextQuestion}
                                disabled
                                className="w-full mt-4 py-3 px-6 bg-gray-400 font-bold text-[#f8f8f8] rounded-md hover:bg-red-300"
                            >
                                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="bg-[#f8f8f8] p-4 mt-4 rounded-md">
                        <div className="relative text-center bg-green-600 h-8 pt-1 rounded"><h3>Successfully Finished!</h3></div>
                        <h3 className="text-[#000105] text-xl ">Results</h3>
                        <h3 className="text-xl">Overall {(result.score / 25) * 100}%</h3>
                        <p className="py-2">
                            Total Questions: <span>{questions.length}</span>
                        </p>
                        <p className="py-2">
                            Total Score: <span>{result.score}</span>
                        </p>
                        <p className="py-2">
                            Correct Answers: <span>{result.correctAnswers}</span>
                        </p>
                        <p className="py-2">
                            Wrong Answers: <span>{result.wrongAnswers}</span>
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full mt-4 py-3 px-6 bg-[#808080] text-[#f8f8f8] rounded-md hover:bg-[#5a5a5a]"
                        >
                            Restart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
