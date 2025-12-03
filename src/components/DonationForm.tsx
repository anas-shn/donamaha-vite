import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, CreditCard, Wallet, Building2 } from "lucide-react";

interface DonationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donationId: string;
  donationTitle: string;
}

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000, 1000000];

const PAYMENT_METHODS = [
  { id: "transfer", label: "Transfer Bank", icon: Building2 },
  { id: "ewallet", label: "E-Wallet", icon: Wallet },
  { id: "card", label: "Kartu Kredit/Debit", icon: CreditCard },
];

const DonationForm = ({
  open,
  onOpenChange,
  donationId,
  donationTitle,
}: DonationFormProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    isAnonymous: false,
  });

  const amount = selectedAmount || parseInt(customAmount) || 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setCustomAmount(numericValue);
    setSelectedAmount(null);
  };

  const handleSubmit = () => {
    if (step === 1 && amount >= 10000) {
      setStep(2);
    } else if (step === 2 && formData.name) {
      // Navigate to payment page with data
      const paymentData = {
        donationId,
        donationTitle,
        amount,
        paymentMethod,
        ...formData,
      };
      navigate("/payment", { state: paymentData });
      onOpenChange(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedAmount(null);
    setCustomAmount("");
    setPaymentMethod("transfer");
    setFormData({ name: "", email: "", message: "", isAnonymous: false });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) resetForm();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            {step === 1 ? "Pilih Nominal Donasi" : "Data Donatur"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6">
            {/* Preset Amounts */}
            <div className="grid grid-cols-3 gap-2">
              {PRESET_AMOUNTS.map((preset) => (
                <Button
                  key={preset}
                  variant={selectedAmount === preset ? "default" : "outline"}
                  className={selectedAmount === preset ? "bg-gradient-primary" : ""}
                  onClick={() => handleAmountSelect(preset)}
                >
                  {formatCurrency(preset).replace("Rp", "").trim()}
                </Button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label>Atau masukkan nominal lain</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  Rp
                </span>
                <Input
                  type="text"
                  placeholder="Minimal Rp 10.000"
                  value={customAmount ? parseInt(customAmount).toLocaleString("id-ID") : ""}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Metode Pembayaran</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <method.icon className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor={method.id} className="cursor-pointer flex-1">
                      {method.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Total */}
            {amount > 0 && (
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Donasi</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>
            )}

            <Button
              className="w-full bg-gradient-primary"
              disabled={amount < 10000}
              onClick={handleSubmit}
            >
              Lanjutkan
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                placeholder="Masukkan nama Anda"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (opsional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Pesan/Doa (opsional)</Label>
              <Textarea
                id="message"
                placeholder="Tulis pesan atau doa untuk penerima donasi..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={formData.isAnonymous}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isAnonymous: checked as boolean })
                }
              />
              <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                Sembunyikan nama saya (donasi anonim)
              </Label>
            </div>

            {/* Summary */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nominal</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Metode</span>
                <span className="font-medium">
                  {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Kembali
              </Button>
              <Button
                className="flex-1 bg-gradient-primary"
                disabled={!formData.name}
                onClick={handleSubmit}
              >
                Bayar Sekarang
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonationForm;