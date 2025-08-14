import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { customAxios } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface userData {
  email: string;
  password: string;
}

const LoginPage = () => {

  const [data, setData] = useState<userData>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    email: string;
    password: string;
  };

  useEffect(() => {
    if(data){
      const fetchData = async () => {
        try {
          const adminInfo = await customAxios.post("/admin/login", data);
          console.log(adminInfo);
          toast.success("Login successful");
          navigate("/admin-panel");
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed");
          return;
        }
      }

      fetchData();
    }
  }, [data]);

  const onSubmit = (data: any) => {
    setData(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Admin Login
        </h2>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
