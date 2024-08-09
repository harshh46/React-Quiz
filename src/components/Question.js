import { useContext } from "react";
import Answer from "./Answer";
import { QuizContext } from "../context/quiz";

const Question = ({ questions }) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  // console.log("Questions", quizState);
  // console.log("Correct Answer Count:", quizState.correctAnswersCount);
  return (
    <div>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {quizState.answers.map((answer, index) => (
          <Answer
            answerText={answer}
            key={index}
            index={index}
            currentAnswer={quizState.currentAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onSelectAnswer={() =>
              dispatch({ type: "SELECT_ANSWER", payload: answer })
            }
          />
        ))}
      </div>
    </div>
  );
};
export default Question;
