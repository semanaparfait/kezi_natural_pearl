import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useVerifyEmailQuery } from '@/features/verifyEmail/verifyEmailApi'

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const { data, error, isSuccess } = useVerifyEmailQuery({ token }, { skip: !token });

  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem('token', data.token);
      setTimeout(() => navigate('/'), 1500);
    }
  }, [isSuccess, data, navigate]);



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
              d="M16 12l-4 4-4-4m8-4l-4 4-4-4"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Email Confirmation
        </h1>
        <br />
        {error ? (
          <p className="text-red-600 mb-4 leading-relaxed">
            Verification failed. Please try again or contact support.
          </p>
        ) : isSuccess ? (
          <p className="text-green-600 mb-4 leading-relaxed">
            Your email has been successfully verified! Redirecting...
          </p>
        ) : (
          <p className="text-gray-600 mb-4 leading-relaxed">
            We’ve sent a confirmation link to
            <span className="font-medium text-green-600 pl-1">
              semanashema@gmail.com
            </span>
            <br />
            Please check your inbox and click the link to verify your email address.
          </p>
        )}
        <p className="text-sm text-gray-500 border-t pt-4">
          Didn’t receive the email?
          <a
            href="/resend-confirmation"
            className="ml-1 font-medium text-yellow-600 hover:underline"
          >
            Resend confirmation
          </a>
        </p>
      </div>
    </section>
  );
}

export default VerifyEmail
