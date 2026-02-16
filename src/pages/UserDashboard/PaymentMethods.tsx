import { useState } from "react";
import { Plus, Trash2, Edit2, CreditCard, Lock, CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface PaymentMethod {
  id: string;
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardType: "visa" | "mastercard" | "amex";
  isDefault: boolean;
}

type PaymentMethodForm = Omit<PaymentMethod, "id">;

function PaymentMethods() {
  const [payments, setPayments] = useState<PaymentMethod[]>([
    {
      id: "1",
      cardholderName: "Jane Doe",
      cardNumber: "4532123456789876",
      expiryMonth: "12",
      expiryYear: "2026",
      cvv: "123",
      cardType: "visa",
      isDefault: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updateMsg, setUpdateMsg] = useState("");
  const [showCVV, setShowCVV] = useState(false);
  const [formData, setFormData] = useState<PaymentMethodForm>({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardType: "visa",
    isDefault: false,
  });

  const handleInputChange = (field: string, value: any) => {
    if (field === "cardNumber") {
      value = value.replace(/\s/g, "").slice(0, 16);
    }
    if (field === "cvv") {
      value = value.slice(0, 4);
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCardType = (cardNumber: string): "visa" | "mastercard" | "amex" => {
    const num = cardNumber.replace(/\s/g, "");
    if (/^4/.test(num)) return "visa";
    if (/^5[1-5]/.test(num)) return "mastercard";
    if (/^3[47]/.test(num)) return "amex";
    return "visa";
  };

  const maskCardNumber = (cardNumber: string) => {
    const last4 = cardNumber.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^\d]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMsg("");

    if (!formData.cardholderName || !formData.cardNumber || !formData.expiryMonth || !formData.expiryYear || !formData.cvv) {
      setUpdateMsg("Please fill in all required fields.");
      return;
    }

    if (formData.cardNumber.length < 15) {
      setUpdateMsg("Card number must be valid.");
      return;
    }

    if (editingId) {
      setPayments(payments.map(pm => 
        pm.id === editingId ? { ...formData, id: editingId, cardType: getCardType(formData.cardNumber) } : pm
      ));
      setUpdateMsg("Payment method updated successfully.");
      setEditingId(null);
    } else {
      const newPayment: PaymentMethod = {
        ...formData,
        id: Date.now().toString(),
        cardType: getCardType(formData.cardNumber),
      };
      setPayments([...payments, newPayment]);
      setUpdateMsg("Payment method added successfully.");
    }

    setFormData({
      cardholderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardType: "visa",
      isDefault: false,
    });
    setShowForm(false);
  };

  const handleEdit = (payment: PaymentMethod) => {
    setFormData({
      cardholderName: payment.cardholderName,
      cardNumber: payment.cardNumber,
      expiryMonth: payment.expiryMonth,
      expiryYear: payment.expiryYear,
      cvv: payment.cvv,
      cardType: payment.cardType,
      isDefault: payment.isDefault,
    });
    setEditingId(payment.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setPayments(payments.filter(pm => pm.id !== id));
    setUpdateMsg("Payment method deleted successfully.");
  };

  const handleSetDefault = (id: string) => {
    setPayments(payments.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case "visa":
        return "🅥";
      case "mastercard":
        return "🅜";
      case "amex":
        return "🅰";
      default:
        return "💳";
    }
  };

  return (
    <section className="min-h-screen w-full  p-6 md:p-10 font-sans text-gray-800">
      {/* Background Decor */}
      {/* <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[var(--gold-color)]/10 blur-[140px] rounded-full -mr-48 -mt-48" /> */}

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif italic text-[var(--primary)] mb-2">Payment Methods</h1>
            <p className="text-sm text-gray-500">Manage your credit and debit cards</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
            >
              <Plus size={16} /> Add Card
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white/90 backdrop-blur-md border border-[var(--bolder-gray)] rounded-[32px] p-8 shadow-xl mb-8">
            <h2 className="text-lg font-serif italic text-[var(--primary)] mb-6">
              {editingId ? "Edit Payment Method" : "Add New Card"}
            </h2>
            <form onSubmit={handleAddPayment} className="space-y-6">
              <Input
                label="Cardholder Name"
                placeholder="Jane Doe"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                fullWidth
              />

              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(formData.cardNumber)}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                fullWidth
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Expiry Month"
                  placeholder="MM"
                  type="number"
                  min={1}
                  max={12}
                  value={formData.expiryMonth}
                  onChange={(e) => handleInputChange("expiryMonth", e.target.value.slice(0, 2))}
                  fullWidth
                />
                <Input
                  label="Expiry Year"
                  placeholder="YYYY"
                  type="number"
                  min={2024}
                  value={formData.expiryYear}
                  onChange={(e) => handleInputChange("expiryYear", e.target.value.slice(0, 4))}
                  fullWidth
                />
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-700 block mb-2">
                    CVV
                  </label>
                  <div className="relative flex">
                    <input
                      type={showCVV ? "text" : "password"}
                      placeholder="123"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className="w-full px-4 py-2.5 border border-[var(--bolder-gray)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCVV(!showCVV)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCVV ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleInputChange("isDefault", e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--bolder-gray)] accent-[var(--primary)]"
                />
                <span className="text-sm text-gray-600">Set as default payment method</span>
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
                  {editingId ? "Update Card" : "Save Card"}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      cardholderName: "",
                      cardNumber: "",
                      expiryMonth: "",
                      expiryYear: "",
                      cvv: "",
                      cardType: "visa",
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

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className={`relative bg-white/90 backdrop-blur-md rounded-[32px] p-6 shadow-lg border-2 transition-all overflow-hidden ${
                payment.isDefault
                  ? "border-[var(--gold-color)] bg-[var(--gold-color)]/5"
                  : "border-[var(--bolder-gray)]"
              }`}
            >
              {/* Default Badge */}
              {payment.isDefault && (
                <div className="absolute -top-3 -right-3 bg-[var(--gold-color)] text-white px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg">
                  Default
                </div>
              )}

              {/* Card Design */}
              <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                
                <div className="relative z-10 flex justify-between items-start mb-12">
                  <div className="text-3xl font-bold">{getCardIcon(payment.cardType)}</div>
                  <Lock size={16} className="text-white/60" />
                </div>

                <div className="relative z-10 mb-8">
                  <p className="text-white/70 text-xs uppercase tracking-widest mb-2">Card Number</p>
                  <p className="text-lg font-mono tracking-wider">{maskCardNumber(payment.cardNumber)}</p>
                </div>

                <div className="relative z-10 flex justify-between items-end">
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Cardholder</p>
                    <p className="font-semibold">{payment.cardholderName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Expires</p>
                    <p className="font-mono">{payment.expiryMonth}/{payment.expiryYear}</p>
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="mb-6 border-t border-[var(--bolder-gray)]/50 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={14} className="text-[var(--gold-color)]" />
                  <span className="text-sm font-semibold text-gray-700 capitalize">{payment.cardType}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {payment.expiryMonth}/{payment.expiryYear} • {maskCardNumber(payment.cardNumber)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!payment.isDefault && (
                  <button
                    onClick={() => handleSetDefault(payment.id)}
                    className="flex-1 text-[9px] uppercase tracking-widest font-bold text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg py-2 transition-all"
                  >
                    Make Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(payment)}
                  className="flex-1 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest font-bold text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg py-2 transition-all"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="flex-1 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest font-bold text-red-500 hover:bg-red-50 rounded-lg py-2 transition-all"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {payments.length === 0 && !showForm && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[var(--gold-color)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={32} className="text-[var(--gold-color)]" />
            </div>
            <p className="text-gray-500 mb-4">No payment methods yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all"
            >
              <Plus size={16} /> Add Your First Card
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PaymentMethods;