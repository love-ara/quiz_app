import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './../filledButton/index.module.css';
import { QuizPin } from "../quizPin/quizPin";
import { Username } from "../username/username";
import { SideImage } from "./sideImage";
import style from "./index.module.css"

function TakeQuiz() {
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [quizPin, setQuizPin] = useState("");
    const [username, setUsername] = useState("");
    const [step, setStep] = useState(1);
    const [userAnswers, setUserAnswers] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    const [answerTimestamps, setAnswerTimestamps] = useState({});
    const [quizTitle, setQuizTitle] = useState("");
    const questionsPerPage = 1;
    const navigate = useNavigate();

    const quizPinValidationSchema = Yup.object().shape({
        quizPin: Yup.string().required('Quiz pin is required')
    });

    const usernameValidationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required')
    });

    const handleQuizPinSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:9091/start/submit`, values);
            setQuizPin(values.quizPin);
            setStep(2);
            toast.success("Quiz pin accepted!", {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error("Error getting quiz: " + (error.response?.data?.error || error.message), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const handleUsernameSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:9091/start/submit`, {
                quizPin: quizPin,
                username: values.username,
            });
            const receivedQuestions = response.data.data.getQuestionResponse || [];
            const receivedQuizTitle = response.data.data.quizTitle || "";
            setQuestions(receivedQuestions);
            setQuizTitle(receivedQuizTitle);
            setUsername(values.username);
            setStep(3);
            toast.success("Quiz started successfully!", {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error("Error getting quiz: " + (error.response?.data?.error || error.message), {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(questions.length / questionsPerPage)));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    useEffect(() => {
        if (step === 3 && questions.length > 0) {
            const currentQuestionId = questions[currentPage].questionId;
            setAnswerTimestamps((prevTimestamps) => ({
                ...prevTimestamps,
                [currentQuestionId]: { ...prevTimestamps[currentQuestionId], start: Date.now() },
            }));
        }
    }, [currentPage, step, questions]);

    const handleAnswerChange = (questionId, optionContent) => {
        const endTime = Date.now();
        const startTime = answerTimestamps[questionId]?.start || endTime;

        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: optionContent,
        }));

        const timeTaken = (endTime - startTime) / 1000;
        const question = questions.find(q => q.questionId === questionId);
        const correctAnswer = question.answer;

        let questionScore = 0;
        if (optionContent === correctAnswer) {
            const timeLimit = question.timeLimit;
            questionScore = Math.max(0, (timeLimit - timeTaken) / timeLimit);
        }

        setTotalScore((prevTotalScore) => prevTotalScore + questionScore);

        toast.success(`Question answered! Your score for this question: ${(questionScore * 100).toFixed(2)}%`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        if (currentPage < questions.length - 1) {
            setTimeout(handleNextPage, 1000);
        } else {
            setTimeout(handleSubmitQuiz, 1000);
        }
    };

    const handleSubmitQuiz = async () => {
        setIsLoading(true);
        try {
            const score = Math.round((totalScore / questions.length) * 100);
            navigate('/final-score', { state: { totalScore: score } });

            toast.success(`Quiz submitted successfully! Your total score: ${score}%`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error("Error submitting quiz: " + error.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const startIndex = currentPage * questionsPerPage;
    const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);
    const totalPages = Math.ceil(questions.length / questionsPerPage);

    return (
        <div className={style.container}>
            {step !== 3 && <SideImage />}
            <div className={style.formContainer}>
                {step === 1 && (
                    <div>
                        <h1 className={style.header}>Enter Quiz Pin</h1>
                        <Formik
                            initialValues={{ quizPin: '' }}
                            validationSchema={quizPinValidationSchema}
                            onSubmit={handleQuizPinSubmit}
                        >
                            {({ isSubmitting }) => (
                                <QuizPin submitting={isSubmitting} loading={isLoading} />
                            )}
                        </Formik>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h1 className={style.header}>Enter Username</h1>
                        <Formik
                            initialValues={{ username: '' }}
                            validationSchema={usernameValidationSchema}
                            onSubmit={handleUsernameSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Username submitting={isSubmitting} loading={isLoading} />
                            )}
                        </Formik>
                    </div>
                )}
                {step === 3 && questions.length > 0 && (
                    <div>
                        <h2 className={style.header}>{quizTitle}</h2>
                        <ul className={style.questionsList}>
                            {currentQuestions.map((question, index) => (
                                <li key={index} className={style.questionItem}>
                                    <p style={{
                                        background: "white",
                                        borderRadius: "20px",
                                        border: "solid none",
                                        padding: "50px 50px 50px 10px",
                                        fontSize: "35px"
                                    }}>
                                        {question.currentQuestionNumber}.&nbsp; &#160;{question.questionContent}
                                    </p>
                                    <ol >
                                        {question.option.map((option, optionIndex) => (
                                            <li key={optionIndex}>
                                                <label  style={{
                                                    padding: "10px 10px 10px 10px",
                                                    border: "none", borderRadius: "10px",
                                                    background: "gold",
                                                    marginBottom: "-100px",
                                                    marginTop: "-100px",
                                                }}>
                                                    <input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value={option.optionContent}
                                                        checked={userAnswers[question.questionId] === option.optionContent}
                                                        onChange={() => handleAnswerChange(question.questionId, option.optionContent)}

                                                    />
                                                    {option.optionContent}
                                                </label>
                                            </li>
                                        ))}
                                    </ol>
                                    <div>
                                        <p>Question Type:&#160;{question.questionType}</p>
                                        <p>Time Limit: {question.timeLimit}</p>
                                    </div>

                                </li>
                            ))}
                        </ul>
                        <div className={style.pagination}>
                            {currentPage > 0 && (
                                <button
                                    onClick={handlePreviousPage}
                                    className={style.paginationButton}
                                >
                                    Previous
                                </button>
                            )}
                            {currentPage === totalPages - 1 && (
                                <button
                                    onClick={handleSubmitQuiz}
                                    className={style.paginationButton}
                                >
                                    Submit Quiz
                                </button>
                            )}
                            {currentPage < totalPages - 1 && (
                                <button
                                    onClick={handleNextPage}
                                    className={style.paginationButton}
                                    disabled={startIndex + questionsPerPage >= questions.length}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default TakeQuiz;
