import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Styles } from '../styles/Styles';
import {SideImage} from "../takeQuizForm/sideImage";

const FinalScore = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalScore } = location.state || {};

    return (
        <div style={Styles.container}>
            <SideImage/>
            <div style={Styles.formContainer}>
                <h1 style={Styles.header}>Quiz Completed!</h1>
                <div style={{marginBottom: "10px"}}>
                    <h2 style={Styles.header}>Total Score</h2>
                    <p>{totalScore !== undefined ? `${totalScore}%` : "Score not available"}</p>
                </div>
                <button style={Styles.button} onClick={() => navigate('/quiz')}>Go to Home</button>
            </div>

        </div>
    );
};

export default FinalScore;
