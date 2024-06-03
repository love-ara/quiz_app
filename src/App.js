import './App.css';
import Hero from "./pages/home/hero";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from "./component/loginForm";
import SignupForm from "./component/signupForm";
import QuizForm from "./component/quizForm";
import TakeQuizForm from "./component/takeQuizForm";
import FinalScore from "./component/FinalScore";
function App() {
  return (
        <>
          <BrowserRouter>
              <Routes>
                  <Route>
                      <Route element={<Hero/>} path={"/home"}/>
                      <Route element={<LoginForm/>} path={"/login"}/>
                      <Route element={<SignupForm/>} path={"/signup"}/>
                      <Route element={<QuizForm/>} path={"/display"}/>
                      <Route element={<TakeQuizForm/>} path={"/quiz"}/>
                      <Route path="/final-score" element={<FinalScore/>} />
                  </Route>
              </Routes>
          </BrowserRouter>

      </>
  );
}

export default App;
