import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-white">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-2">
          Task Manager
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Organize your work & life
        </p>

        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full text-center bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block w-full text-center border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition"
          >
            Register
          </Link>
        </div>

        <div className="my-6 text-center text-gray-400">or</div>

        <div className="flex justify-center">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
