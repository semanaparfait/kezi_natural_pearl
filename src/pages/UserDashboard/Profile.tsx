import { useEffect, useState } from "react"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { useGetCurrentUserQuery,useUpdateUserMutation,useDeleteUserMutation } from "@/features/auth/authApi"


import { useNavigate } from "react-router-dom";

function Profile() {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery(undefined)
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  // const [updateUser, { isLoading: isUpdating, isSuccess: updateSuccess, error: updateError }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [memberSince, setMemberSince] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.fullName ?? "")
      setEmail(currentUser.email ?? "")
      setPhone(currentUser.phoneNumber ?? "")
      setMemberSince(
        currentUser.createdAt
          ? new Date(currentUser.createdAt).toLocaleDateString()
          : ""
      )
    }
  }, [currentUser])

  if (isLoading) {
    return (
      <section className="p-6 bg-gray-100 rounded-lg md:max-w-6xl mx-auto">
        <p className="text-gray-500">Loading profile...</p>
      </section>
    )
  }

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md md:max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        My Profile {name || email}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form
          className="flex flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setUpdateMsg("");
            try {
              await updateUser({ fullName: name, email, phoneNumber: phone }).unwrap();
              setUpdateMsg("Profile updated successfully.");
            } catch (err) {
              setUpdateMsg("Failed to update profile.");
            }
          }}
        >
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />

          <Input
            label="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            
          />

          <Input
            label="Member Since"
            type="text"
            value={memberSince}
            onChange={() => {}}
          />

          <Button
            variant="primary"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
          {updateMsg && (
            <p className={updateMsg.includes("success") ? "text-green-600" : "text-red-600"}>{updateMsg}</p>
          )}
        </form>
      </div>

      <div className="mt-10 border border-red-300 bg-red-50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-md">
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
            onClick={() => setShowDeleteModal(true)}
            className="w-full sm:w-auto"
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-2 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => {
                setShowDeleteModal(false);
                setDeletePassword("");
                setDeleteError("");
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-red-700 mb-2">Confirm Account Deletion</h2>
            <p className="text-sm text-gray-700 mb-4">Please enter your password to confirm account deletion. This action cannot be undone.</p>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-red-300"
              placeholder="Password"
              value={deletePassword}
              onChange={e => setDeletePassword(e.target.value)}
              disabled={isDeleting}
            />
            {deleteError && <p className="text-sm text-red-600 mb-2">{deleteError}</p>}
            <div className="flex gap-2 mt-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={async () => {
                  setIsDeleting(true);
                  setDeleteError("");
                  try {
                    await deleteUser({ password: deletePassword }).unwrap();
                    setShowDeleteModal(false);
                    setDeletePassword("");
                    setIsDeleting(false);
                    localStorage.clear();
                    navigate("/");
                  } catch (err: any) {
                    setDeleteError(err?.data?.message || "Incorrect password. Please try again.");
                    setIsDeleting(false);
                  }
                }}
                disabled={!deletePassword || isDeleting || isDeletingUser}
              >
                {isDeleting || isDeletingUser ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Profile
