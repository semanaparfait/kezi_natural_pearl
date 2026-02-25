import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '@/features/auth/authApi';
import { Camera, Mail, Phone, User, ShieldCheck, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

function Profile() {
  const { data: currentUser } = useGetCurrentUserQuery(undefined);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [formDataState, setFormDataState] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  // Sync form data when currentUser is loaded
  useEffect(() => {
    if (currentUser) {
      setFormDataState({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
      });
    }
  }, [currentUser]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", formDataState.fullName);
    formData.append("email", formDataState.email);
    formData.append("phoneNumber", formDataState.phoneNumber);

    if (profilePicture) {
      formData.append("picture", profilePicture);
    }

    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated elegantly.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed. Please try again.");
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-6 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-100 rounded-sm">
      <div className="mb-12 border-b border-slate-100 pb-8">
        <h2 className="text-3xl font-serif italic text-slate-900">Personal Account</h2>
        <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">Identity & Preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Column: Avatar Management */}
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100">
              <img 
                src={
                  previewUrl ||
                  currentUser?.profile ||
                  `https://ui-avatars.com/api/?name=${formDataState.fullName}&background=random`
                } 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <label className="absolute bottom-2 right-2 p-3 bg-white shadow-lg rounded-full cursor-pointer hover:bg-slate-50 transition-all border border-slate-100">
              <Camera size={18} className="text-slate-600" />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
          {/* <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-widest font-medium">Resolution: Min 400x400</p> */}
        </div>


        <div className="md:col-span-8 space-y-8">
          
          {/* Editable Fields */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 flex items-center gap-2">
                <User size={12} /> Full Name
              </label>
              <input 
                className="w-full border-b border-slate-200 py-2 outline-none focus:border-slate-900 transition-colors bg-transparent text-slate-800"
                value={formDataState.fullName} 
                onChange={(e) => setFormDataState({ ...formDataState, fullName: e.target.value })} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 flex items-center gap-2">
                <Mail size={12} /> Email Address
              </label>
              <input 
                type="email"
                className="w-full border-b border-slate-200 py-2 outline-none focus:border-slate-900 transition-colors bg-transparent text-slate-800"
                value={formDataState.email} 
                onChange={(e) => setFormDataState({ ...formDataState, email: e.target.value })} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 flex items-center gap-2">
                <Phone size={12} /> Contact Number
              </label>
              <input 
                className="w-full border-b border-slate-200 py-2 outline-none focus:border-slate-900 transition-colors bg-transparent text-slate-800"
                value={formDataState.phoneNumber} 
                onChange={(e) => setFormDataState({ ...formDataState, phoneNumber: e.target.value })} 
              />
            </div>
          </div>

          {/* Read Only Meta Data */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-50">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-300 flex items-center gap-2">
                <ShieldCheck size={12} /> Account Role
              </label>
              <p className="text-sm font-medium text-slate-500 italic font-serif capitalize">
                {currentUser?.role}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-300 flex items-center gap-2">
                <Calendar size={12} /> Member Since
              </label>
              <p className="text-sm font-medium text-slate-500 italic font-serif">
                {currentUser?.createdAt
                  ? new Date(currentUser.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
                  : '---'}
              </p>
            </div>
          </div>

          <div className="pt-8">
            <Button 
              type="submit" 
              loading={isLoading}
              className="w-full md:w-auto px-12 py-4 bg-slate-900 text-white rounded-sm text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-slate-800 shadow-xl transition-all"
            >
              {isLoading ? "Saving profile..." : "update Profile"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Profile;