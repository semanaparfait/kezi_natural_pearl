import { useEffect, useState } from "react"
import { Pen, Calendar, Mail, Phone, ShieldAlert, Loader2 } from "lucide-react";
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
    if (!currentUser) return;

    try {
      const updatedData: any = {};
      const normalize = (value: string) => value.trim();

      if (normalize(name) !== (currentUser.fullName ?? "")) updatedData.fullName = normalize(name);
      if (normalize(email) !== (currentUser.email ?? "")) updatedData.email = normalize(email);
      if (normalize(phone) !== (currentUser.phoneNumber ?? "")) updatedData.phoneNumber = normalize(phone);

      if (Object.keys(updatedData).length === 0) return toast("No changes made");

      await updateUser(updatedData).unwrap();
      toast.success("Profile refined successfully.");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.fullName ?? "")
      setEmail(currentUser.email ?? "")
      setPhone(currentUser.phoneNumber ?? "")
      setMemberSince(currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "")
    }
  }, [currentUser])

  if (isLoading) return (
    <div className="min-h-[80vh] flex items-center justify-center text-[10px] uppercase tracking-[0.4em] text-gray-400 animate-pulse">
      Syncing Rituals...
    </div>
  );

  return (
    <section className="min-h-screen bg-[#FAF9F6] ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: MINIMALIST AVATAR & STATS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <div className="absolute inset-0 bg-[var(--gold-color)]/10 blur-3xl rounded-full group-hover:bg-[var(--gold-color)]/20 transition-all duration-700" />
              <img 
                src={currentUser?.profile || "https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"} 
                alt="Profile" 
                className="relative w-40 h-40 rounded-full object-cover border-[6px] border-white shadow-2xl"
              />
              <button className="absolute bottom-2 right-2 bg-(--primary) text-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform border-4 border-white">
                <Pen size={14} />
              </button>
            </div>
            
            <h1 className="text-3xl font-serif italic text-(--primary)">{name || "Member"}</h1>
            <p className="text-[var(--gold-color)] text-[10px] font-black uppercase tracking-[0.3em] mt-2">The Collective Member</p>

            <div className="w-full mt-10 pt-8 border-t border-gray-50 space-y-5">
              <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                <div className="w-8 h-8 rounded-full bg-[var(--gold-color)]/5 flex items-center justify-center text-[var(--gold-color)]">
                  <Calendar size={14} />
                </div>
                <span>Since {memberSince}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                <div className="w-8 h-8 rounded-full bg-[var(--gold-color)]/5 flex items-center justify-center text-[var(--gold-color)]">
                  <Mail size={14} />
                </div>
                <span className="truncate">{email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: EDITABLE DETAILS */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50">
              <h2 className="text-2xl font-serif italic text-(--primary)">Personal Details</h2>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 px-4 py-1 border border-gray-100 rounded-full">Identity</p>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                
                <div className="flex flex-col justify-end">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-4 italic">Confirm your changes above</p>
                  <button 
                    disabled={isUpdating}
                    className="w-full bg-(--primary) text-white rounded-full py-5 font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-black hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isUpdating && <Loader2 size={14} className="animate-spin" />}
                    {isUpdating ? "Refining..." : "Update Profile"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* DANGER ZONE: CLASSIC & CLEAN */}
          <div className="bg-red-50/30 rounded-[2.5rem] p-8 md:p-10 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-red-50/50">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-red-500 shadow-sm">
                <ShieldAlert size={28} />
              </div>
              <div className="text-left">
                <h3 className="text-red-900 font-bold text-sm uppercase tracking-wider">Account Deactivation</h3>
                <p className="text-red-500/70 text-xs mt-1">This will remove all your order history and community points.</p>
              </div>
            </div>
            <button 
              onClick={() => window.confirm("Are you sure? This ritual cannot be undone.")}
              className="text-red-400 hover:text-red-600 text-[9px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-full border border-red-200 hover:bg-white transition-all"
            >
              Close Account
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile;