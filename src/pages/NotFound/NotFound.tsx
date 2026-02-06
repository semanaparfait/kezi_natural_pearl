import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      
      {/* 404 Text */}
      <h1 className="text-7xl md:text-9xl font-bold text-green-400 mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-400 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-gray-500 hover:bg-gray-800 rounded-lg font-semibold transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
