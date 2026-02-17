import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailQuery } from "@/features/verifyEmail/verifyEmailApi";
import { useResendEmailMutation } from '@/features/ResendEmail/ResendEmail';
import toast from "react-hot-toast";
import { Mail,MoveLeft } from "lucide-react";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [resendAttempts, setResendAttempts] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(0);

  const {
    data,
    error,
    isSuccess,
    isLoading,
  } = useVerifyEmailQuery(
    { token: token ?? "" },
    { skip: !token }
  );

  const [resendEmail, { isLoading: isResending }] = useResendEmailMutation();

  useEffect(() => {
    const email = localStorage.getItem("pendingEmail") || "";
    setUserEmail(email);
  }, []);

  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.removeItem("pendingEmail");

      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleResendEmail = async () => {
    if (!userEmail) {
      toast.error("Email not found. Please sign up again.");
      return;
    }

    try {
      await resendEmail({ email: userEmail }).unwrap();
      toast.success("Verification email sent! Check your inbox.");
      setResendAttempts(resendAttempts + 1);
      setResendCountdown(60);
    } catch (err: any) {
      console.error("Resend error:", err);
      const errorMsg = err?.data?.message || "Failed to resend email";
      toast.error(errorMsg);
    }
  };

  return (
    <main>

              <button
                onClick={() => navigate("/account2")}
          className="group flex items-center gap-2 mt-10 pl-10 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-[var(--primary)] transition-all"
        >
          <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Account
        </button>
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
        {userEmail && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-[var(--primary-color)]" />
              <p className="text-sm text-gray-700 font-medium">Verification email sent to:</p>
            </div>
            <p className="text-[var(--primary-color)] font-semibold break-all text-center">{userEmail}</p>
          </div>
        )}
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

        {error && (
          <p className="text-red-600 mb-4 leading-relaxed">
            Verification failed. The link may be expired or already used.
          </p>
        )}
        {!isSuccess && (
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-3">
              Didn't receive the email?
            </p>
            <button
              onClick={handleResendEmail}
              disabled={isResending || resendCountdown > 0}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                resendCountdown > 0 || isResending
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color-hover)]'
              }`}
            >
              {isResending
                ? 'Sending...'
                : resendCountdown > 0
                ? `Resend in ${resendCountdown}s`
                : 'Resend Confirmation Email'}
            </button>
            {resendAttempts > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                Email resent {resendAttempts} time{resendAttempts > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
    </main>
  );
}

export default VerifyEmail;
