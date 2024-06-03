import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export {QuizPin} from "./component/quizPin/quizPin";
export {Username} from "./component/username/username";
export {Styles} from "./component/styles/Styles";