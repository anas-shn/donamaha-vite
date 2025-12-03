import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  Copy, 
  ArrowLeft,
  Building2,
  Wallet,
  CreditCard,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentState {
  donationId: string;
  donationTitle: string;
  amount: number;
  paymentMethod: string;
  name: string;
  email: string;
  message: string;
  isAnonymous: boolean;
}

// Mock bank/payment details
const PAYMENT_DETAILS = {
  transfer: {
    icon: Building2,
    title: "Transfer Bank",
    accounts: [
      { bank: "BCA", number: "1234567890", name: "Yayasan Doneasy Indonesia" },
      { bank: "Mandiri", number: "0987654321", name: "Yayasan Doneasy Indonesia" },
    ],
  },
  ewallet: {
    icon: Wallet,
    title: "E-Wallet",
    accounts: [
      { bank: "GoPay", number: "081234567890", name: "Doneasy" },
      { bank: "OVO", number: "081234567890", name: "Doneasy" },
      { bank: "DANA", number: "081234567890", name: "Doneasy" },
    ],
  },
  card: {
    icon: CreditCard,
    title: "Kartu Kredit/Debit",
    accounts: [],
  },
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<"pending" | "processing" | "success">("pending");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  const paymentData = location.state as PaymentState;

  useEffect(() => {
    if (!paymentData) {
      navigate("/donasi");
      return;
    }
  }, [paymentData, navigate]);

  // Countdown timer
  useEffect(() => {
    if (status !== "pending" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status, timeLeft]);

  if (!paymentData) return null;

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

  const handleConfirmPayment = () => {
    setStatus("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const paymentInfo = PAYMENT_DETAILS[paymentData.paymentMethod as keyof typeof PAYMENT_DETAILS];
  const PaymentIcon = paymentInfo.icon;

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Donasi Berhasil!
            </h1>
            <p className="text-muted-foreground">
              Terima kasih atas kebaikan Anda. Semoga menjadi amal jariyah.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nominal</span>
              <span className="font-bold text-primary">{formatCurrency(paymentData.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Donatur</span>
              <span className="font-medium">
                {paymentData.isAnonymous ? "Hamba Allah" : paymentData.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID Transaksi</span>
              <span className="font-mono text-xs">TRX{Date.now()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link to={`/donasi/${paymentData.donationId}`}>
              <Button className="w-full bg-gradient-primary">
                Kembali ke Donasi
              </Button>
            </Link>
            <Link to="/donasi">
              <Button variant="outline" className="w-full">
                Lihat Donasi Lainnya
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (status === "processing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <Loader2 className="h-16 w-16 mx-auto text-primary animate-spin" />
          <div>
            <h1 className="text-xl font-bold text-foreground mb-2">
              Memproses Pembayaran...
            </h1>
            <p className="text-muted-foreground">
              Mohon tunggu sebentar
            </p>
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
          <Link
            to={`/donasi/${paymentData.donationId}`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
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

          {/* Payment Summary */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Ringkasan Donasi</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kampanye</span>
                <span className="font-medium text-right max-w-[60%] line-clamp-2">
                  {paymentData.donationTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Donatur</span>
                <span className="font-medium">
                  {paymentData.isAnonymous ? "Anonim" : paymentData.name}
                </span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-base">
                <span className="font-medium">Total Pembayaran</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(paymentData.amount)}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Instructions */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <PaymentIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-semibold">{paymentInfo.title}</h2>
            </div>

            {paymentData.paymentMethod === "card" ? (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Pembayaran kartu kredit/debit akan segera tersedia</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Transfer ke salah satu rekening berikut:
                </p>
                {paymentInfo.accounts.map((account, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{account.bank}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-mono font-bold">{account.number}</p>
                        <p className="text-sm text-muted-foreground">{account.name}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(account.number)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Salin
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Penting:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Transfer sesuai nominal: <strong>{formatCurrency(paymentData.amount)}</strong></li>
                    <li>• Pembayaran akan diverifikasi otomatis</li>
                    <li>• Simpan bukti transfer Anda</li>
                  </ul>
                </div>
              </div>
            )}
          </Card>

          {/* Confirm Button */}
          <Button
            className="w-full h-12 text-base bg-gradient-primary"
            onClick={handleConfirmPayment}
          >
            Saya Sudah Bayar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;