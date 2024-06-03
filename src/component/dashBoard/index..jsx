// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { toast, ToastContainer } from "react-toastify";
// import { Icon } from '@iconify/react';
// import loadingLoop from '@iconify/icons-line-md/loading-loop';
// import 'react-toastify/dist/ReactToastify.css';
//
//
// function DashBoard(){
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//

    // const validationSchema = Yup.object().shape({
    //     quizPin: Yup.string().required('Quiz pin is required')
    // });
    //
    // const handleSubmit = async (values, { setSubmitting }) => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.post(`http://localhost:9091/start/submit`, values);
    //         console.log(response);
    //         toast.success("Quiz started successfully!", {
    //             position: 'top-right',
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         } catch (error) {
//             console.error("Error getting quiz", error);
//             toast.error("Error getting quiz: " + (error.response?.data?.error || error.message), {
//                 position: 'top-right',
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         } finally {
//             setIsLoading(false);
//             setSubmitting(false);
//         }
//     };
//
//     return (
//         <div style={styles.container}>
//             <div style={styles.imageContainer}>
//                 <img src="/img/webPix.png" alt="quiz image" style={styles.image} />
//             </div>
//             <div style={styles.formContainer}>
//                 <div>
//                     <h1 style={styles.header}>The Trivia!</h1>
//                     <Formik
//                         initialValues={{ quizPin: '' }}
//                         validationSchema={validationSchema}
//                         onSubmit={handleSubmit}
//                     >
//                         {({ isSubmitting }) => (
//                             <Form>
//                                 <div style={{marginBottom: '10px'}}>
//                                     <Field
//                                         type="text"
//                                         name="quizPin"
//                                         placeholder="Quiz Pin"
//                                         autoFocus={true}
//                                         required={true}
//                                         style={styles.input}
//                                     />
//                                     <ErrorMessage name="quizPin" component="div" style={styles.errorMessage}/>
//                                 </div>
//                                 <div>
//                                     <button
//                                         type="submit"
//                                         style={styles.button}
//                                         disabled={isSubmitting || isLoading}
//                                     >
//                                         {isLoading ? <Icon icon={loadingLoop} width="24" /> : "Enter"}
//                                     </button>
//                                 </div>
//                             </Form>
//                         )}
//                     </Formik>
//                     <ToastContainer />
//                     <div className="footer">
//                         <p>Create your own quiz <Link to="/register" style={styles.link}>here</Link></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default DashBoard;