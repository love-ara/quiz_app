import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import loadingLoop from '@iconify/icons-line-md/loading-loop';
import 'react-toastify/dist/ReactToastify.css';
import './../filledButton/index.module.css';
import { Icon } from "@iconify/react";
import { Styles } from "../styles/Styles";

function QuizForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const questionsPerPage = 1;
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        quizPin: Yup.string().required('Quiz pin is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:9091/start/display/${values.quizPin}`);
            console.log(response);
            const receivedQuestions = response.data.data.viewQuizQuestionResponses;
            setQuestions(receivedQuestions);

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
            console.error("Error getting quiz", error);
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

    const startIndex = currentPage * questionsPerPage;
    const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);
    const totalPages = Math.ceil(questions.length / questionsPerPage);

    return (
        <div style={Styles.container}>
            <div style={Styles.imageContainer}>
                <img src="/img/webpix.png" alt="quiz " style={Styles.image} />
            </div>
            <div style={Styles.formContainer}>
                {!questions.length ? (
                    <div>
                        <h1 style={Styles.header}>The Trivia!</h1>
                        <Formik
                            initialValues={{ quizPin: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div style={{ marginBottom: '10px' }}>
                                        <Field
                                            type="text"
                                            name="quizPin"
                                            placeholder="Quiz Pin"
                                            autoFocus={true}
                                            required={true}
                                            style={Styles.input}
                                        />
                                        <ErrorMessage name="quizPin" component="div" style={Styles.errorMessage} />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            style={Styles.button}
                                            disabled={isSubmitting || isLoading}
                                        >
                                            {isLoading ? <Icon icon={loadingLoop} width="24" /> : "Enter"}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <ToastContainer />
                        <div className="footer">
                            <p style={Styles.title}>Create your own quiz <Link to="/register" style={Styles.link}>here</Link></p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 style={Styles.header}>Quiz Questions</h2>
                        <ul style={Styles.questionsList}>
                            {currentQuestions.map((question, index) => (
                                <li key={index} style={Styles.questionItem}>
                                    <p>{question.currentQuestionNumber}. {question.questionContent}</p>
                                    <ol>
                                        {question.option.map((option, i) => (
                                            <li key={i}>{option.optionContent}</li>
                                        ))}
                                    </ol>
                                    <p>Question Type : {question.questionType}</p>
                                    <p>Time Limit : {question.timeLimit}</p>
                                </li>
                            ))}
                        </ul>
                        <div style={Styles.pagination}>
                            {currentPage > 0 && (
                            <button
                                onClick={handlePreviousPage}
                                style={Styles.paginationButton}
                                disabled={currentPage === 0}
                            >
                                Previous
                            </button>
                            )}
                            {currentPage < totalPages - 1 && (
                                <button
                                    onClick={handleNextPage}
                                    style={Styles.paginationButton}
                                    disabled={startIndex + questionsPerPage >= questions.length}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'row',
//         height: '100vh',
//     },
//     imageContainer: {
//         flex: 1,
//         backgroundColor: '#f0f0f0',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '20px',
//     },
//     image: {
//         maxWidth: '100%',
//         maxHeight: '80%',
//         borderRadius: '8px',
//     },
//     formContainer: {
//         flex: 1,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '20px',
//     },
//     header: {
//         fontFamily: 'Roboto, sans-serif',
//         fontSize: '30px',
//         textAlign: 'center',
//         marginBottom: '20px',
//     },
//     title: {
//         fontFamily: 'Roboto, sans-serif',
//         fontSize: '12px',
//         textAlign: 'center',
//         marginBottom: '20px',
//     },
//     input: {
//         width: '100%',
//         maxWidth: '200px',
//         padding: '15px 20px',
//         borderRadius: '10px',
//         fontSize: '15px',
//     },
//     errorMessage: {
//         color: 'red',
//         fontSize: '12px',
//     },
//     button: {
//         backgroundColor: '#55229e',
//         color: '#ffffff',
//         padding: '10px 20px',
//         fontSize: '16px',
//         width: '100%',
//         maxWidth: '300px',
//         borderRadius: '5px',
//         border: 'none',
//         cursor: 'pointer',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     footer: {
//         textAlign: 'center',
//         marginTop: '20px',
//         marginLeft: '90px',
//     },
//     link: {
//         color: '#55229e',
//         marginLeft: '2px',
//     },
//     questionsList: {
//         listStyleType: 'none',
//         padding: 0,
//     },
//     questionItem: {
//         marginBottom: '20px',
//     },
//     pagination: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         marginTop: '20px',
//     },
//     paginationButton: {
//         backgroundColor: '#55229e',
//         color: '#ffffff',
//         padding: '10px 20px',
//         fontSize: '16px',
//         borderRadius: '5px',
//         border: 'none',
//         cursor: 'pointer',
//     },
// };

export default QuizForm;
