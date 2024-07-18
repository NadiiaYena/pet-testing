import "../App.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AnswersPage from "../components/AnsawersPage";
// import DescriptionAnswer from "../components/DescriptionAnswer";

const QUESTIONS_NUM = 10;

function Testing() {
  const counter = useSelector((state) => state.counter);
  const [countQuestion, setCountQuestion] = useState(0);
  const [isQestion, setIsQuestion] = useState("");
  const [isAnswer, setIsAnwser] = useState(false);
  const [getAnswer, setGetAnwser] = useState("");
//   const [showAnswer, setShowAnswer] = useState(false);

  const [randomQuestions, setRandomQuestions] = useState([]);

// Функція для отримання QUESTIONS_NUM випадкових питань
const getRandomQuestions = (counter, num) => {
    const shuffled = [...counter].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  console.log('getRandomQuestions', getRandomQuestions(counter, QUESTIONS_NUM))

  useEffect(() => {
    if (counter && counter.length > 0) {
      const selectedQuestions = getRandomQuestions(counter, QUESTIONS_NUM);
      setRandomQuestions(selectedQuestions);
      setIsQuestion(selectedQuestions[0].question);
    }
  }, [counter]);

  useEffect(() => {
    if (randomQuestions.length > 0 && countQuestion < randomQuestions.length) {
      setIsQuestion(randomQuestions[countQuestion].question);
    }
  }, [randomQuestions, countQuestion]);

  const handleNextQuestionClick = () => {
    setGetAnwser("");
    if (countQuestion < randomQuestions.length - 1) {
        setRandomQuestions((prev) =>
            prev.map((question, index) =>
              index === countQuestion
                ? { ...question, answerOfUser: getAnswer }
                : question
            )
          );
      
      setCountQuestion((prevCount) => prevCount + 1);
    //   setShowAnswer(false);
    } else {
      setIsAnwser(true);
    }
  }

//   const handleSubmitClick = () => {
//     setRandomQuestions((prev) =>
//       prev.map((question, index) =>
//         index === countQuestion
//           ? { ...question, answerOfUser: getAnswer }
//           : question
//       )
//     );
//     // setShowAnswer(true);
//   }

  return (
    <div className="testing-wrap">
      {isAnswer ? (
        <AnswersPage randomQuestions={randomQuestions}  />
      ) : (
        <div className="testing-main">
          <div className="testing-container"> 
            <header className="header">
              <h2>{countQuestion+1}/{QUESTIONS_NUM}</h2>
              <h3>{isQestion}</h3>
            </header>
            <div className="general">
              {/* {showAnswer ? (
                <DescriptionAnswer count={countQuestion} randomQuestions={randomQuestions} />
              ) : ( */}
                <div className="question">
                  <textarea
                    type="text"
                    className="input-answer"
                    onChange={(e) => setGetAnwser(e.target.value)}
                    value={getAnswer}
                  />
                </div>
              {/* )} */}
            </div>
          </div>
          {/* {
            showAnswer ? (
              <button onClick={handleNextQuestionClick}>
                НАСТУПНЕ ЗАПИТАННЯ
              </button>
            ) : ( */}
              <button onClick={handleNextQuestionClick}>
              ВІДПРАВИТИ
                {/* {getAnswer ? 'ВІДПРАВИТИ' : 'ПОДИВИТИСЬ ВІДПОВІДЬ'} */}
              </button>
            {/* )
          } */}
        </div>
      )}
    </div>
  );
}

export default Testing;