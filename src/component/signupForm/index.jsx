import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Icon } from '@iconify/react';
import loadingLoop from '@iconify/icons-line-md/loading-loop';
import 'react-toastify/dist/ReactToastify.css';
import { Styles } from "../styles/Styles";
import webPageTwo from "../../img/webPageTwo.png"


function SignupForm() {
    // const [, setFormData] = useState({
    //     username: "",
    //     password: "",
    // });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    });

    const handleSubmit = async (values, { resetForm }) => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:9091/user/register", values);
            console.log(response);
            toast.success("Your account has been registered successfully!", {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            resetForm();
            navigate("/login");
        } catch (error) {
            console.log("Error registering", error);
            toast.error("Error registering: " + (error.response?.data?.data || error.message), {
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

    return (
        <div style={Styles.container}>
            <div style={Styles.imageContainer}>
                <img src={webPageTwo} alt="Sign up" style={Styles.image} />
            </div>
            <div style={Styles.formContainer}>
                <div>
                    <h1 style={Styles.header}>Welcome!</h1>
                    <p style={Styles.title}>Sign up by   the information below</p>
                    <Formik
                        initialValues={{ username: '', email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange }) => (
                            <Form>
                                <div style={{ marginBottom: '10px' }}>
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="Username:"
                                        autoFocus={true}
                                        required={true}
                                        style={Styles.input}
                                    />
                                    <ErrorMessage name="username" component="div" style={Styles.errorMessage} />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required={true}
                                        style={Styles.input}
                                    />
                                    <ErrorMessage name="email" component="div" style={Styles.errorMessage} />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        required={true}
                                        style={Styles.input}
                                    />
                                    <ErrorMessage name="password" component="div" style={Styles.errorMessage} />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <button
                                        type="submit"
                                        style={Styles.button}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Icon icon={loadingLoop} width="24" /> : "Register"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <ToastContainer />
                    <div>
                        <p>Already have an account? <Link to="/login" style={Styles.footer}>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );

}




export default SignupForm;
