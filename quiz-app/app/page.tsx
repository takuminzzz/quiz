"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    fetch("/quizData.json")
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("データ取得エラー:", error));
  }, []);

  const handleOptionClick = (index: number) => {
    if (index === quizData[currentQuestionIndex].answer) {
      alert("当たり！");
      nextQuestion();
    } else {
      setShowExplanation(true);
    }
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % quizData.length);
  };

  if (quizData.length === 0) return <p>Loading...</p>;

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div style={{ padding: "20px", color: "#fff", backgroundColor: "#000" }}>
      <h1>クイズアプリ</h1>
      <h2>{currentQuestion.question}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentQuestion.options.map((option: string, index: number) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              fontSize: "18px",
            }}
          >
            {`${index + 1}. ${option}`}
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        {currentQuestion.options.map((_, index: number) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)} // クリックで即時反映
            style={{
              padding: "10px",
              border: "1px solid gray",
              backgroundColor: "#fff",
              cursor: "pointer",
              width: "60px",
              height: "60px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black", // ボタンの文字色を黒
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>間違い！</strong>
          <p>{currentQuestion.explanation}</p>
          <button
            onClick={nextQuestion}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "white",
              cursor: "pointer",
            }}
          >
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
}
