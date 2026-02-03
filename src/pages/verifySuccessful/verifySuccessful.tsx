import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailQuery } from "@/features/verifyEmail/verifyEmailApi"; 

function VerifySuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const id = searchParams.get("id") ?? "";
  const { data, isLoading, isError, isSuccess } = useVerifyEmailQuery(
    { id,token }, 
    { skip: !token } 
  );

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("token", data.token);
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);

      return () => clearTimeout(timer);
    }
    if (!token) {
      navigate("/account");
    }
  }, [isSuccess, data, navigate, token]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
        
        {isLoading && (
          <div className="animate-pulse">
            <p className="text-gray-600 font-medium">Verifying your account...</p>
          </div>
        )}

        {isSuccess && (
          <>
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Email Verified!</h1>
            <p className="text-gray-600">You are now logged in. Redirecting to home...</p>
          </>
        )}

        {isError && (
          <>
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
               <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Verification Failed</h1>
            <p className="text-gray-600 mb-4">The link may be expired or already used.</p>
            <button 
              onClick={() => navigate("/account")} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default VerifySuccess;