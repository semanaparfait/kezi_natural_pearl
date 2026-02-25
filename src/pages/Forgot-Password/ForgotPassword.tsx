

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1200));
      toast.success('Password reset successfully!');
      setFormData({ newPassword: '', confirmPassword: '' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-emerald-900">Reset Password</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
            rightIcon={<Eye size={17} onClick={() => setShowNewPassword(v => !v)} className="cursor-pointer" />}
            fullWidth
            required
          />
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
            rightIcon={<Eye size={17} onClick={() => setShowConfirmPassword(v => !v)} className="cursor-pointer" />}
            fullWidth
            required
          />
          <Button
            type="submit"
            loading={isLoading}
            className="w-full py-3 bg-emerald-900 text-white font-bold text-[10px] uppercase tracking-widest rounded-lg shadow-lg"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;