import { useEffect, useState } from "react";
import { Link } from "react-router";
import { customAxios } from "../../api";

interface Category {
  id: string;
  name: string;
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const axiosData = async () => {
      try {
        const res = await customAxios.get("/category");
        setCategories(res.data.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };

    axiosData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
        {categories?.map((cat) => (
          <Link
            key={cat?.id}
            to={`/question/${cat.id}`}
            className="bg-white rounded-xl shadow-lg flex flex-col items-center p-8 hover:scale-105 transition-transform duration-300 group"
          >
            <span className="text-xl font-semibold text-gray-700 mb-2 group-hover:text-blue-600">
              {cat?.name}
            </span>
            <span className="text-sm text-gray-500">
              Go to {cat?.name} questions
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
