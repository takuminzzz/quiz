import { useState, useEffect } from "react";

export default function Home() {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        // JSONファイルからデータを取得
        fetch("/quizData.json")
          .then((response) => response.json())
          .then((data) => setQuizData(data));
      }, []);


  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (quizData[currentQuestionIndex].answer === index) {
      alert("当たり！");
      setShowExplanation(false);
      setCurrentQuestionIndex((prev) => (prev + 1) % quizData.length);
    } else {
      setShowExplanation(true);
    }
  };

  if (quizData.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <h1>クイズアプリ</h1>
      <h2>{quizData[currentQuestionIndex].question}</h2>
      {quizData[currentQuestionIndex].options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(index)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          {option}
        </button>
      ))}
      {showExplanation && (
        <p style={{ color: "red" }}>
          {quizData[currentQuestionIndex].explanation}
        </p>
      )}
    </div>
  );
}
