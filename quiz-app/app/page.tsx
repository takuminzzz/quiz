"use client";

import { useState, useEffect } from "react";
import styles from "./styles/Quiz.module.css";

export default function Home() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    fetch("/quizData.json")
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("データ取得エラー:", error));
  }, []);

  const handleOptionClick = (index: number) => {
    const isAnswerCorrect = index === quizData[currentQuestionIndex].answer;
    setIsCorrect(isAnswerCorrect);
    setSelectedOption(index);
    setShowExplanation(true);

    if (isAnswerCorrect) {
      alert("正解です！"); // 正解時のアラート
      setTimeout(() => nextQuestion(), 2000);
    }
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    setCurrentQuestionIndex((prev) => (prev + 1) % quizData.length);
  };

  if (quizData.length === 0) return <p>Loading...</p>;

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <h1 className={styles.question}>{currentQuestion.question}</h1>
      <div className={styles.options}>
        {currentQuestion.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`${styles.optionButton} ${
              showExplanation
                ? index === quizData[currentQuestionIndex].answer
                  ? styles.correct
                  : selectedOption === index
                  ? styles.wrong
                  : ""
                : ""
            }`}
            disabled={showExplanation} // 正誤判定中はボタンを無効化
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className={styles.explanation}>
          {isCorrect ? (
            <p>正解です！次の問題に進みます。</p>
          ) : (
            <div>
              <p>{quizData[currentQuestionIndex].explanation}</p>
              <button
                onClick={nextQuestion}
                className={styles.nextButton} // 「次の問題へ」ボタン
              >
                次の問題へ
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
