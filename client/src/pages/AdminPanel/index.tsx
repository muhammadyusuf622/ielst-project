import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { customAxios } from "../../api";
import { useNavigate } from "react-router";

type CategoryFormData = {
  name: string;
};

type QuestionFormData = {
  text: string;
  categoryName: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct: string;
};

const AdminPanel = () => {
  const [categorySuccess, setCategorySuccess] = useState("");
  const [questionSuccess, setQuestionSuccess] = useState("");
  const [categories, setCategories] = useState<CategoryFormData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      await customAxios.get("/question");
    } catch (error: any) {
      if(error?.response?.data?.message == "token not found") {
        navigate("/");
      }
    }
  };

  const fetchCategories = async () => {
    try {

      const res = await customAxios.get("/category");
      setCategories(res.data.data);

    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  // 📂 Category form
  const {
    register: registerCategory,
    handleSubmit: handleCategory,
    reset: resetCategory,
    formState: { errors: categoryErrors },
  } = useForm<CategoryFormData>();

  const {
    register: registerQuestion,
    handleSubmit: handleQuestion,
    reset: resetQuestion,
    formState: { errors: questionErrors },
  } = useForm<QuestionFormData>();

  // 📌 Create category
  const onCategorySubmit = async (data: CategoryFormData) => {
    try {
      await customAxios.post("/category", data);
      setCategorySuccess("✅ Category created successfully!");
      resetCategory();
      fetchCategories();
    } catch (error) {
      console.error(error);
      setCategorySuccess("❌ Error creating category!");
    }
  };

  // 📌 Create question
  const onQuestionSubmit = async (data: QuestionFormData) => {
    try {
      await customAxios.post("/question", data);
      setQuestionSuccess("✅ Question created successfully!");
      resetQuestion();
    } catch {
      setQuestionSuccess("❌ Error creating question!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🛠 Admin Panel</h1>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">
        {/* 📂 Create Category */}
        <form
          onSubmit={handleCategory(onCategorySubmit)}
          className="bg-white p-8 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col gap-6 border-t-4 border-blue-500"
        >
          <h2 className="text-2xl font-bold text-gray-700">
            📂 Create Category
          </h2>
          <div>
            <label className="block text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              {...registerCategory("name", {
                required: "Category name is required",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter category name"
            />
            {categoryErrors.name && (
              <span className="text-red-500 text-sm">
                {categoryErrors.name.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Create Category
          </button>
          {categorySuccess && (
            <div className="mt-2 text-center text-green-600 font-medium">
              {categorySuccess}
            </div>
          )}

          {/* 📜 Categories List */}
          {categories.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                📜 Existing Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-300 hover:bg-blue-200 transition"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* ❓ Create Question */}
        <form
          onSubmit={handleQuestion(onQuestionSubmit)}
          className="bg-white p-8 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col gap-6 border-t-4 border-purple-500"
        >
          <h2 className="text-2xl font-bold text-gray-700">
            ❓ Create Question
          </h2>

          {/* Question text */}
          <div>
            <label className="block text-gray-700 mb-2">Question Text</label>
            <input
              type="text"
              {...registerQuestion("text", {
                required: "Question text is required",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter question text"
            />
            {questionErrors.text && (
              <span className="text-red-500 text-sm">
                {questionErrors.text.message}
              </span>
            )}
          </div>

          {/* Category name */}
          <div>
            <label className="block text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              {...registerQuestion("categoryName", {
                required: "Category name is required",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter category name"
            />
            {questionErrors.categoryName && (
              <span className="text-red-500 text-sm">
                {questionErrors.categoryName.message}
              </span>
            )}
          </div>

          {/* Options */}
          {["A", "B", "C", "D"].map((opt) => (
            <div key={opt}>
              <label className="block text-gray-700 mb-2">Option {opt}</label>
              <input
                type="text"
                {...registerQuestion(`option${opt}` as keyof QuestionFormData, {
                  required: `Option ${opt} is required`,
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder={`Enter option ${opt}`}
              />
              {questionErrors[`option${opt}` as keyof QuestionFormData] && (
                <span className="text-red-500 text-sm">
                  {
                    questionErrors[`option${opt}` as keyof QuestionFormData]
                      ?.message as string
                  }
                </span>
              )}
            </div>
          ))}

          <div>
            <label className="block text-gray-700 mb-2">Correct Answer</label>
            <input
              type="text"
              {...registerQuestion("correct", {
                required: "Correct answer is required",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter correct answer"
            />
            {questionErrors.correct && (
              <span className="text-red-500 text-sm">
                {questionErrors.correct.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Create Question
          </button>
          {questionSuccess && (
            <div className="mt-2 text-center text-green-600 font-medium">
              {questionSuccess}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
