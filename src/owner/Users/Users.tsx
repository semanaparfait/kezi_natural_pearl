import React from "react";
import {
  Search,
  Download,
  UserPlus,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Trash2,
  Users as UsersIcon,
} from "lucide-react";
import { useGetUsersQuery,useUpdateRoleMutation,useDeleteUserMutation } from "@/features/users/usersApi";
import toast from "react-hot-toast";
function Users() {
  const { data: usersData = [], isLoading, isError, refetch } =
    useGetUsersQuery(undefined);
  const [updateRole] = useUpdateRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
//  console.log(usersData)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading users…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-500">
        Failed to load users
      </div>
    );
  }

  const totalUsers = usersData.length;
  const activeUsers = usersData.filter(u => u.status === "active").length;
  const inactiveUsers = totalUsers - activeUsers;

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className="">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">
            View, manage, and monitor registered users
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold-color)] focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border rounded-lg hover:bg-gray-50">
                <Download size={16} />
                Export
              </button>
              <button className=" hidden items-center gap-2 px-4 py-2.5 bg-[var(--gold-color)] text-white rounded-lg hover:bg-[var(--accent-color)]">
                <UserPlus size={16} />
                Add User
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={<UsersIcon />}
            bg="bg-blue-100"
            color="text-blue-600"
          />
          <StatCard
            title="Active Users"
            value={activeUsers}
            icon={<CheckCircle />}
            bg="bg-green-100"
            color="text-green-600"
          />
          <StatCard
            title="Inactive Users"
            value={inactiveUsers}
            icon={<XCircle />}
            bg="bg-gray-100"
            color="text-gray-600"
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full ">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {[
                    "User",
                    "Contact",
                    "Role",
                    "Status",
                    "Verified",
                    "Joined",
                    "Actions",
                  ].map(h => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {usersData.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profile ? (
                          <img
                            src={user.profile}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-(--primary) flex items-center justify-center font-semibold text-white">
                            {user.email?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.fullName}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {user.phoneNumber ?? "—"}
                      </div>
                    </td>

                    <td className="px-6 py-4 ">

                      <select 
                      value={user.role}
                      onChange={e => {
                        const selectedRole = (e.target as HTMLSelectElement).value;
                        updateRole({ email: user.email, role: selectedRole });
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--gold-color)] focus:border-transparent"
                      >
                        <option value="admin">admin</option>
                        <option value="customer">customer</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.status === "active" ? (
                          <CheckCircle size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.emailVerifiedAt
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.emailVerifiedAt ? (
                          <CheckCircle size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {user.emailVerifiedAt ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button 
                        onClick={
                          () => deleteUser({ userId: user.userId })
                          .then(() => {
                            toast.success(`User deleted successfully${user.email}`);
                            refetch();
                          })
                          .catch(() => toast.error("Failed to delete user"))}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t text-sm text-gray-600">
            Showing {usersData.length} users
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;

/* -------------------------------- */

function StatCard({
  title,
  value,
  icon,
  bg,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg} ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
