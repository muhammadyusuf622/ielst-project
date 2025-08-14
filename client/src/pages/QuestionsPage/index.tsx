import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { customAxios } from "../../api";

const QuestionsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await customAxios.get(`/question/${id}`);
        console.log("Questions from backend:", res.data.data);
        setQuestions(res.data.data || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (showResult) return;
    if (timer === 0) {
      handleNext();
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, showResult, current]);

  const handleSelect = (option: string) => {
    setSelected(option);
    if (option === questions[current].correct) {
      setScore((s) => s + 1);
    }
    setTimeout(() => handleNext(), 500);
  };

  const handleNext = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setTimer(10);
    } else {
      setShowResult(true);
    }
  };

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="text-xl text-gray-700">No questions found.</div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Result</h2>
        <p className="text-xl text-gray-700 mb-2">
          You answered {score} out of {questions.length} questions correctly!
        </p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
        <div className="flex justify-between w-full mb-4">
          <span className="text-lg font-semibold text-gray-700">
            Question {current + 1} / {questions.length}
          </span>
          <span className="text-lg font-semibold text-purple-600">
            Time: {timer}s
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {q.text}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, idx) => (
            <button
              key={`${q.id}-${idx}`} // 🔹 Unik key yaratildi
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`px-6 py-3 rounded-lg border font-semibold transition-all
                ${
                  selected === opt
                    ? opt === q.correct
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-red-500 text-white border-red-500"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 border-gray-300"
                }
              `}
            >
              {String.fromCharCode(65 + idx)}. {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
