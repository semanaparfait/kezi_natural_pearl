import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailQuery } from "@/features/verifyEmail/verifyEmailApi";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const {
    data,
    error,
    isSuccess,
    isLoading,
  } = useVerifyEmailQuery(
    { token: token ?? "" },
    { skip: !token }
  );

  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("token", data.token);

      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, data, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
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
              d="M16 12l-4 4-4-4m8-4l-4 4-4-4"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Email Confirmation
        </h1>
        {!token && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            We’ve sent a confirmation link to your email address.
            <br />
            Please check your inbox and click the link to verify your email.
          </p>
        )}
        {isLoading && token && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            Verifying your email, please wait...
          </p>
        )}
        {isSuccess && (
          <p className="text-green-600 mb-4 leading-relaxed">
            Your email has been successfully verified!
            <br />
            Redirecting to home...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 mb-4 leading-relaxed">
            Verification failed. The link may be expired or already used.
          </p>
        )}

        {/* Footer action */}
        {!isSuccess && (
          <p className="text-sm text-gray-500 border-t pt-4">
            Didn’t receive the email?
            <a
              href="/resend-confirmation"
              className="ml-1 font-medium text-yellow-600 hover:underline"
            >
              Resend confirmation
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default VerifyEmail;
