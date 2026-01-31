import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifySuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Read token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Save token for authentication
      localStorage.setItem("token", token);

      // Optional: you can also fetch current user here if needed
      // e.g., dispatch(getCurrentUser(token))

      // Redirect to home page after 1.5s
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      // No token? Redirect to login page
      navigate("/account");
    }
  }, [navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Email Verified!
        </h1>

        <p className="text-gray-600 mb-4">
          Your email has been successfully verified. You are being redirected to
          the home page...
        </p>
      </div>
    </section>
  );
}

export default VerifySuccess;
