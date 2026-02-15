import { useState } from "react";
import { Plus, Trash2, Edit2, MapPin, Phone, User, CheckCircle2, XCircle } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface AddressItem {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

function Address() {
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: "1",
      name: "Home",
      phone: "+250 78X XXX XXX",
      street: "123 Nyarugenge Avenue",
      city: "Kigali",
      province: "Kigali City",
      postalCode: "1234",
      country: "Rwanda",
      isDefault: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updateMsg, setUpdateMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMsg("");

    if (!formData.name || !formData.phone || !formData.street || !formData.city) {
      setUpdateMsg("Please fill in all required fields.");
      return;
    }

    if (editingId) {
      setAddresses(addresses.map(addr => 
        addr.id === editingId ? { ...formData, id: editingId } : addr
      ));
      setUpdateMsg("Address updated successfully.");
      setEditingId(null);
    } else {
      const newAddress: AddressItem = {
        ...formData,
        id: Date.now().toString(),
      };
      setAddresses([...addresses, newAddress]);
      setUpdateMsg("Address added successfully.");
    }

    setFormData({
      name: "",
      phone: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
      isDefault: false,
    });
    setShowForm(false);
  };

  const handleEdit = (address: AddressItem) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    setUpdateMsg("Address deleted successfully.");
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <section className=" w-full  p-6 md:p-10 font-sans text-gray-800">
      {/* Background Decor */}
      {/* <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[var(--gold-color)]/10 blur-[140px] rounded-full -mr-48 -mt-48" /> */}

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif italic text-[var(--primary)] mb-2">Delivery Addresses</h1>
            <p className="text-sm text-gray-500">Manage your shipping and billing addresses</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
            >
              <Plus size={16} /> Add Address
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white/90 backdrop-blur-md border border-[var(--bolder-gray)] rounded-[32px] p-8 shadow-xl mb-8">
            <h2 className="text-lg font-serif italic text-[var(--primary)] mb-6">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>
            <form onSubmit={handleAddAddress} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Address Label"
                  placeholder="e.g., Home, Office"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  fullWidth
                />
                <Input
                  label="Phone Number"
                  placeholder="+250 78X XXX XXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  fullWidth
                />
              </div>

              <Input
                label="Street Address"
                placeholder="123 Main Street"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
                fullWidth
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  placeholder="Kigali"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  fullWidth
                />
                <Input
                  label="Province/State"
                  placeholder="Kigali City"
                  value={formData.province}
                  onChange={(e) => handleInputChange("province", e.target.value)}
                  fullWidth
                />
                <Input
                  label="Postal Code"
                  placeholder="1234"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  fullWidth
                />
              </div>

              <Input
                label="Country"
                placeholder="Rwanda"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                fullWidth
              />

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleInputChange("isDefault", e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--bolder-gray)] accent-[var(--primary)]"
                />
                <span className="text-sm text-gray-600">Set as default address</span>
              </label>

              {updateMsg && (
                <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold ${updateMsg.includes("success") ? "text-[var(--primary)]" : "text-red-500"}`}>
                  {updateMsg.includes("success") ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  {updateMsg}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 bg-[var(--primary)] hover:bg-[var(--primary)]/90 rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      phone: "",
                      street: "",
                      city: "",
                      province: "",
                      postalCode: "",
                      country: "",
                      isDefault: false,
                    });
                    setUpdateMsg("");
                  }}
                  className="flex-1 border border-[var(--bolder-gray)] text-gray-600 hover:bg-gray-50 rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`relative bg-white/90 backdrop-blur-md rounded-[32px] p-6 shadow-lg border-2 transition-all ${
                address.isDefault
                  ? "border-[var(--gold-color)] bg-[var(--gold-color)]/5"
                  : "border-[var(--bolder-gray)]"
              }`}
            >
              {/* Default Badge */}
              {address.isDefault && (
                <div className="absolute -top-3 -right-3 bg-[var(--gold-color)] text-white px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg">
                  Default
                </div>
              )}

              {/* Address Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[var(--gold-color)]/20 rounded-full flex items-center justify-center">
                    <MapPin size={18} className="text-[var(--gold-color)]" />
                  </div>
                  <div>
                    <h3 className="font-serif italic text-lg text-[var(--primary)]">{address.name}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Delivery Address</p>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-3 mb-6 border-t border-[var(--bolder-gray)]/50 pt-4">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <User size={14} className="text-[var(--gold-color)]" />
                  <span>{address.street}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <MapPin size={14} className="text-[var(--gold-color)]" />
                  <span>{address.city}, {address.province} {address.postalCode}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Phone size={14} className="text-[var(--gold-color)]" />
                  <span>{address.phone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex-1 text-[9px] uppercase tracking-widest font-bold text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg py-2 transition-all"
                  >
                    Make Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(address)}
                  className="flex-1 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest font-bold text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg py-2 transition-all"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex-1 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest font-bold text-red-500 hover:bg-red-50 rounded-lg py-2 transition-all"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {addresses.length === 0 && !showForm && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[var(--gold-color)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-[var(--gold-color)]" />
            </div>
            <p className="text-gray-500 mb-4">No addresses yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all"
            >
              <Plus size={16} /> Add Your First Address
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Address;