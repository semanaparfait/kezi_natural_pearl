import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useGetCurrentUserQuery,useUpdateUserMutation } from '@/features/auth/authApi';

function Profile() {
  const { data: currentUser } = useGetCurrentUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.phoneNumber || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);


    if (profilePicture) {
      data.append("profilePicture", profilePicture);
    }

    await updateUser(data as any);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Profile Picture"
          type="file"
          accept="image/*"
          value=""
          onChange={(e) =>
            setProfilePicture(e.target.files?.[0] || null)
          }
        />

        <Input
          label="Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <Input
          label="Phone"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />

        <Input label="Role" value={currentUser?.role || ""} onChange={() => {}}  />
        <Input
          label="Created At"
          value={
            currentUser?.createdAt
              ? new Date(currentUser.createdAt).toLocaleDateString()
              : ""
          }
          onChange={() => {}}
          
        />

        <Button type="submit">Update Profile</Button>
      </form>
    </section>
  );
}


export default Profile