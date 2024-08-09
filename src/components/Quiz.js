//use state hook has 2 params first is the current state and second is the function to update the current state
//anything script variables or functions created can be used inside curly braces

//   const [state, setState] = useState({
//     currentQuestionIndex: 0,
//     questions: [],
//   });
// setCurrenQuestionIndex(currentQuestionIndex + 1);
// setState({
//   ...state,
//   currentQuestionIndex: state.currentQuestionIndex + 1,
// });

import { useContext, useEffect } from "react";
import Question from "./Question";
import { QuizContext } from "../context/quiz";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const apiUrl =
    "https://opentdb.com/api.php?amount=10&category=18&type=multiple&encode=url3986";
  useEffect(() => {
    if (quizState.questions.length > 0 || quizState.error) {
      return;
    }
    console.log("On initialize");
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        dispatch({ type: "LOADED_QUESTIONS", payload: data.results });
      })
      .catch((err) => {
        console.log("Error", err.message);
        dispatch({ type: "SERVER_ERROR", payload: err.message });
      });
  });

  // console.log("QuizState", quizState);

  return (
    <div className="quiz">
      {quizState.error && (
        <div className="results">
          <div className="congratulations">SERVER ERROR</div>
          <div className="results-info">
            <div>{quizState.error}</div>
          </div>
        </div>
      )}
      {quizState.showResults ? (
        <div className="results">
          <div className="congratulations"> Congratulations </div>
          <div className="results-info">
            <div>You have completed the test</div>
            <div>
              You've got {quizState.correctAnswersCount} out of{" "}
              {quizState.questions.length}
            </div>
          </div>
          <div
            className="next-button"
            onClick={() => dispatch({ type: "RESTART" })}
          >
            Restart
          </div>
        </div>
      ) : quizState.questions.length > 0 ? (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next Question
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
