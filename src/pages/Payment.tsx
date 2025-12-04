import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CheckCircle2, 
  Clock, 
  Copy, 
  ArrowLeft,
  Building2,
  Wallet,
  CreditCard,
  Loader2,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentState {
  donationId: string;
  donationTitle: string;
  amount: number;
}

const PAYMENT_METHODS = [
  { id: "transfer", label: "Transfer Bank", icon: Building2, description: "BCA, Mandiri, BRI, BNI" },
  { id: "ewallet", label: "E-Wallet", icon: Wallet, description: "GoPay, OVO, DANA, ShopeePay" },
  { id: "card", label: "Kartu Kredit/Debit", icon: CreditCard, description: "Visa, Mastercard" },
];

const BANK_ACCOUNTS = {
  transfer: [
    { bank: "BCA", number: "1234567890", name: "Yayasan Doneasy Indonesia" },
    { bank: "Mandiri", number: "0987654321", name: "Yayasan Doneasy Indonesia" },
  ],
  ewallet: [
    { bank: "GoPay", number: "081234567890", name: "Doneasy" },
    { bank: "OVO", number: "081234567890", name: "Doneasy" },
    { bank: "DANA", number: "081234567890", name: "Doneasy" },
  ],
};

const ADMIN_FEE_PERCENTAGE = 0.025; // 2.5%

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: form, 2: payment, 3: success
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    isAnonymous: false,
  });

  const paymentData = location.state as PaymentState;

  useEffect(() => {
    if (!paymentData) {
      navigate("/donasi");
    }
  }, [paymentData, navigate]);

  useEffect(() => {
    if (step !== 2 || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  if (!paymentData) return null;

  const adminFee = Math.round(paymentData.amount * ADMIN_FEE_PERCENTAGE);
  const totalAmount = paymentData.amount + adminFee;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil disalin",
      description: "Nomor rekening telah disalin ke clipboard",
    });
  };

  const handleProceedToPayment = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Nama wajib diisi",
        description: "Silakan masukkan nama Anda",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  // Step 3: Success
  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Donasi Berhasil!</h1>
            <p className="text-muted-foreground">Terima kasih atas kebaikan Anda. Semoga menjadi amal jariyah.</p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nominal Donasi</span>
              <span className="font-medium">{formatCurrency(paymentData.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Biaya Admin</span>
              <span className="font-medium">{formatCurrency(adminFee)}</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold text-primary">{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-muted-foreground">Donatur</span>
              <span className="font-medium">{formData.isAnonymous ? "Hamba Allah" : formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID Transaksi</span>
              <span className="font-mono text-xs">TRX{Date.now()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link to={`/donasi/${paymentData.donationId}`}>
              <Button className="w-full bg-gradient-primary">Kembali ke Donasi</Button>
            </Link>
            <Link to="/donasi">
              <Button variant="outline" className="w-full">Lihat Donasi Lainnya</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Processing state
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <Loader2 className="h-16 w-16 mx-auto text-primary animate-spin" />
          <div>
            <h1 className="text-xl font-bold text-foreground mb-2">Memproses Pembayaran...</h1>
            <p className="text-muted-foreground">Mohon tunggu sebentar</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => step === 1 ? navigate(-1) : setStep(1)}
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 1 ? "Kembali" : "Ubah Data"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 ? (
              <>
                {/* Donor Info */}
                <Card className="p-6">
                  <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Data Donatur
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama Anda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (opsional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@contoh.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Pesan/Doa (opsional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Tulis pesan atau doa untuk penerima donasi..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={formData.isAnonymous}
                        onCheckedChange={(checked) => setFormData({ ...formData, isAnonymous: checked as boolean })}
                      />
                      <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                        Sembunyikan nama saya (donasi anonim)
                      </Label>
                    </div>
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6">
                  <h2 className="font-semibold mb-4">Metode Pembayaran</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="p-2 bg-muted rounded-lg">
                          <method.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="cursor-pointer font-medium">
                            {method.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </Card>

                <Button className="w-full h-12 bg-gradient-primary" onClick={handleProceedToPayment}>
                  Lanjut ke Pembayaran
                </Button>
              </>
            ) : (
              <>
                {/* Timer */}
                <Card className="p-4 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                      <Clock className="h-5 w-5" />
                      <span className="font-medium">Selesaikan pembayaran dalam</span>
                    </div>
                    <span className="text-xl font-bold text-orange-700 dark:text-orange-400">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </Card>

                {/* Payment Instructions */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {paymentMethod === "transfer" && <Building2 className="h-5 w-5 text-primary" />}
                      {paymentMethod === "ewallet" && <Wallet className="h-5 w-5 text-primary" />}
                      {paymentMethod === "card" && <CreditCard className="h-5 w-5 text-primary" />}
                    </div>
                    <h2 className="font-semibold">
                      {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                    </h2>
                  </div>

                  {paymentMethod === "card" ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Pembayaran kartu kredit/debit akan segera tersedia</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Transfer ke salah satu rekening berikut:</p>
                      {BANK_ACCOUNTS[paymentMethod as keyof typeof BANK_ACCOUNTS]?.map((account, index) => (
                        <div key={index} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{account.bank}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg font-mono font-bold">{account.number}</p>
                              <p className="text-sm text-muted-foreground">{account.name}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(account.number)}>
                              <Copy className="h-4 w-4 mr-1" />
                              Salin
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-2">Penting:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Transfer sesuai nominal: <strong>{formatCurrency(totalAmount)}</strong></li>
                          <li>• Pembayaran akan diverifikasi otomatis</li>
                          <li>• Simpan bukti transfer Anda</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </Card>

                <Button className="w-full h-12 bg-gradient-primary" onClick={handleConfirmPayment}>
                  Saya Sudah Bayar
                </Button>
              </>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="font-semibold mb-4">Ringkasan Pembayaran</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Kampanye</p>
                  <p className="font-medium line-clamp-2">{paymentData.donationTitle}</p>
                </div>
                
                <hr className="border-border" />
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nominal Donasi</span>
                  <span className="font-medium">{formatCurrency(paymentData.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Biaya Admin (2.5%)</span>
                  <span className="font-medium">{formatCurrency(adminFee)}</span>
                </div>
                
                <hr className="border-border" />
                
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Total Pembayaran</span>
                  <span className="font-bold text-primary">{formatCurrency(totalAmount)}</span>
                </div>

                {formData.name && step === 2 && (
                  <>
                    <hr className="border-border" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Donatur</span>
                      <span className="font-medium">{formData.isAnonymous ? "Anonim" : formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Metode</span>
                      <span className="font-medium">
                        {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
