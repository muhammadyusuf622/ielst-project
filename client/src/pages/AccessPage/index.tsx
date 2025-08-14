import { useNavigate } from "react-router";

const AccessPage = () => {

  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 gap-8">
      <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-8 w-80 hover:scale-105 transition-transform duration-300">
        <img
          src="/src/assets/AdminAvtoriTarixi.png"
          alt="Admin"
          className="w-20 h-20 mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">I am Admin</h2>
        <button onClick={() => navigate('/login')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Login as Admin
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-8 w-80 hover:scale-105 transition-transform duration-300">
        <img
          src="/src/assets/student.png"
          alt="Student"
          className="w-20 h-20 mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">I am Student</h2>
        <button onClick={() => navigate('/home')} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Student
        </button>
      </div>
    </div>
  );
};

export default AccessPage;
