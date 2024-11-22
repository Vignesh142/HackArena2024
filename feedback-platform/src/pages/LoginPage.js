import React from "react";
// import { signInWithPopup, auth, googleProvider } from "../firebase"; // Uncomment and set up Firebase
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     console.log("User:", result.user);
  //     navigate("/"); // Redirect to HomePage after successful login
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error);
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Welcome to Engage
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Log in or Sign up to continue
        </p>
        <button
          // onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 py-3 text-white font-medium shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-6 w-6"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.52 0 6.63 1.35 9.04 3.54l6.77-6.78C35.18 2.93 30.03.5 24 .5 14.94.5 7.32 6.08 3.96 13.51l7.82 6.1C13.4 13.43 18.23 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.05 24.5c0-1.67-.15-3.28-.43-4.85H24v9.19h12.45c-.62 3.16-2.5 5.85-5.3 7.68l7.81 6.08c4.53-4.18 7.09-10.37 7.09-17.1z"
            />
            <path
              fill="#4A90E2"
              d="M24 46.5c6.08 0 11.17-2.01 14.89-5.47l-7.81-6.08c-2.15 1.45-4.9 2.31-7.08 2.31-5.38 0-9.93-3.64-11.56-8.54l-7.95 6.14c3.39 7.08 10.7 12.14 19.51 12.14z"
            />
            <path
              fill="#FBBC05"
              d="M3.96 13.51l7.82 6.1C13.4 13.43 18.23 9.5 24 9.5c3.52 0 6.63 1.35 9.04 3.54l6.77-6.78C35.18 2.93 30.03.5 24 .5 14.94.5 7.32 6.08 3.96 13.51z"
            />
          </svg>
          Continue with Google
        </button>
        <p className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
