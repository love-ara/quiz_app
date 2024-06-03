import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Icon } from '@iconify/react';
import loadingLoop from '@iconify/icons-line-md/loading-loop';
import 'react-toastify/dist/ReactToastify.css';
import webPix from "../../img/webPix.png"
import style from  "./index.module.css"

function LoginForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
    });

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {

            const payload = {
                username: values.username,
                password: values.password,
                status: 'logged-in'
            };
            const response = await axios.post("http://localhost:9091/user/login", values);
            console.log(response);
            toast.success(`Hi ${values.username}, you !`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/quiz");
        } catch (error) {
            console.log("Error logging in", error);
            toast.error("Error logging in: " + (error.response?.data?.data || error.message), {
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
        <div className={style.container}>
            <div style={{ flex: '1', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={webPix} alt="Your img" style={{ maxWidth: '50%', maxHeight: '80%', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', marginLeft: '70px' }}>Welcome Back!</h1>
                    <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px', marginLeft: '65px', marginBottom: '30px' }}>Log in to your dashboard</p>

                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '10px' }}>
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="Username:"
                                        autoFocus={true}
                                        required={true}
                                        style={{ width: '250px', padding: '15px 20px', borderRadius: '10px', fontSize: '15px' }}
                                    />
                                    <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password:"
                                        required={true}
                                        style={{ width: '250px', border: '1 solid white', padding: '15px 20px', borderRadius: '10px', fontSize: '15px' }}
                                    />
                                    <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '12px' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <div
                                        onClick={() => setFormData(prevState => ({
                                            ...prevState,
                                            rememberMe: !prevState.rememberMe
                                        }))}
                                        style={{
                                            width: '15px',
                                            height: '15px',
                                            border: '1px solid black',
                                            borderRadius: '10%',
                                            marginRight: '10px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            background: formData.rememberMe ? '#55229e' : 'white'
                                        }}
                                    >
                                        {formData.rememberMe && <span style={{ color: '#fff' }}>✓</span>}
                                    </div>
                                    <label style={{ cursor: 'pointer' }}>Remember Me</label>
                                    <div style={{ marginLeft: 'auto' }}>
                                        <p><span style={{ marginRight: '5px' }}>ℹ️</span>Forgot Password?</p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className={style.button}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Icon icon={loadingLoop} width="24" /> : "Login"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <ToastContainer />
                    <div>
                        <p>Don't have an account? <Link to="/signup" className={style.footer}>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}







export default LoginForm;
