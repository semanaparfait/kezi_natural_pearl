import { useEffect, useState } from "react"
import { Pen, Calendar, Mail } from "lucide-react";
import Button from "@/components/Button"
import Input from "@/components/Input"
import { toast } from "react-hot-toast";
import { useGetCurrentUserQuery, useUpdateUserMutation } from "@/features/auth/authApi"

function Profile() {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery(undefined)
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [memberSince, setMemberSince] = useState("")

const handleUpdateUser = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!currentUser) {
    toast.error("User data not loaded yet.");
    return;
  }

  try {
    const updatedData: any = {};
    const normalize = (value: string) => value.trim();

    if (normalize(name) !== normalize(currentUser.fullName ?? "")) {
      updatedData.fullName = normalize(name);
    }

    if (normalize(email) !== normalize(currentUser.email ?? "")) {
      updatedData.email = normalize(email);
    }

    if (normalize(phone) !== normalize(currentUser.phoneNumber ?? "")) {
      updatedData.phoneNumber = normalize(phone);
    }

    if (Object.keys(updatedData).length === 0) {
      toast("No changes made");
      return;
    }

    await updateUser(updatedData).unwrap();
    toast.success("Profile updated successfully.");
  } catch (err) {
    toast.error("Failed to update profile.");
  }
};




  useEffect(() => {
    if (currentUser) {
      setName(currentUser.fullName ?? "")
      setEmail(currentUser.email ?? "")
      setPhone(currentUser.phoneNumber ?? "")
      setMemberSince(
        currentUser.createdAt
          ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : ""
      )
    }
  }, [currentUser])

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? ")) return;

  };


  if (isLoading) {
    return (
      <section className="flex items-center justify-center   uppercase tracking-[0.3em] text-xs">
        Syncing Rituals...
      </section>
    )
  }

  return (
    <section className="  p-6 md:p-10 font-sans text-gray-800 flex items-center justify-center relative">
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 h-fit md:h-[85vh]">
        <div className="md:col-span-4 bg-white/90 backdrop-blur-xl border border-[var(--bolder-gray)] rounded-[32px] p-8 flex flex-col items-center justify-center text-center space-y-6 shadow-xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-[var(--gold-color)]/20 blur-2xl rounded-full group-hover:bg-[var(--gold-color)]/40 transition-all duration-500" />
            <img 
              src={currentUser?.profile || "https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"} 
              alt="Profile" 
              className="relative w-32 h-32 rounded-full object-cover border-2 border-[var(--gold-color)]/60 shadow-2xl"
            />
            <button className="absolute bottom-1 right-1 bg-[var(--primary)] p-2 rounded-full border border-white/20 hover:scale-110 transition-transform">
              <Pen size={14} className="text-white" />
            </button>
          </div>
          
          <div>
            <h1 className="text-2xl font-serif italic text-[var(--primary)]">{name || "Your Name"}</h1>
            <p className="text-[var(--gold-color)]/70 text-[10px] uppercase tracking-[0.2em] mt-1">Customer Member</p>
          </div>

          <div className="w-full pt-6 space-y-4 border-t border-[var(--bolder-gray)]/60">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <Calendar size={14} className="text-[var(--gold-color)]" /> <span>Joined {memberSince}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <Mail size={14} className="text-[var(--gold-color)]" /> <span>{email}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 ">
          <div className="md:col-span-2 bg-white/90 backdrop-blur-md border border-[var(--bolder-gray)] rounded-[32px] p-8 shadow-xl">
            <h2 className="text-lg font-serif italic mb-6 text-[var(--primary)]">Personal Details</h2>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              onSubmit={handleUpdateUser}
            >
              <div className="space-y-4">
                <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)}  />
                <Input label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}  />
              </div>
              <div className="space-y-4 flex flex-col justify-between">
                <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}  />
                <Button variant="primary" type="submit" disabled={isUpdating} className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest transition-all">
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
      <div className="mt-10 border w-full border-red-300 bg-red-50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mr-0 sm:mr-6">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-red-700 mb-1">Danger Zone</h2>
          <p className="text-sm text-red-600 mb-4">
            Deleting your account is <span className="font-semibold">irreversible</span>. All your data will be lost.
          </p>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            className="w-full sm:w-auto"
          >
            Delete Account
          </Button>
        </div>
      </div>

        </div>
      </div>

 
    </section>
  )
}

export default Profile