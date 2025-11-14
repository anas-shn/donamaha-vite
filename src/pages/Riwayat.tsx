import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const Riwayat = () => {
  // Sample data - akan diganti dengan data dari database
  const donations = [
    {
      id: "1",
      title: "Bantu Adik-Adik Kurang Mampu untuk Dapat Pendidikan Layak",
      amount: 100000,
      date: "2024-01-15",
      status: "success",
      organizer: "BEM Universitas Indonesia",
    },
    {
      id: "2",
      title: "Renovasi Perpustakaan Kampus untuk Mahasiswa",
      amount: 250000,
      date: "2024-01-10",
      status: "success",
      organizer: "Himpunan Mahasiswa Teknik",
    },
    {
      id: "3",
      title: "Program Beasiswa untuk Mahasiswa Berprestasi",
      amount: 500000,
      date: "2024-01-05",
      status: "pending",
      organizer: "Senat Mahasiswa IPB",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Berhasil";
      case "pending":
        return "Menunggu";
      case "failed":
        return "Gagal";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-primary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-primary-foreground space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Riwayat Donasi
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Lihat semua kontribusimu yang telah membuat perubahan
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center space-y-2 border-border/40 shadow-card">
              <p className="text-muted-foreground">Total Donasi</p>
              <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {formatCurrency(850000)}
              </p>
            </Card>
            <Card className="p-6 text-center space-y-2 border-border/40 shadow-card">
              <p className="text-muted-foreground">Program Didukung</p>
              <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                3
              </p>
            </Card>
            <Card className="p-6 text-center space-y-2 border-border/40 shadow-card">
              <p className="text-muted-foreground">Dampak Sosial</p>
              <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ⭐⭐⭐⭐⭐
              </p>
            </Card>
          </div>

          {/* Donation History */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Riwayat Transaksi
            </h2>

            {donations.map((donation) => (
              <Card
                key={donation.id}
                className="p-6 border-border/40 shadow-card hover:shadow-hover transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(donation.status)}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground mb-1">
                          {donation.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {donation.organizer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2">
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(donation.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(donation.date)}
                    </p>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        donation.status === "success"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : donation.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {getStatusText(donation.status)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/40 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Lihat Detail
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Unduh Bukti
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {donations.length === 0 && (
            <Card className="p-12 text-center border-border/40">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Belum Ada Donasi
                </h3>
                <p className="text-muted-foreground">
                  Mulai berdonasi sekarang dan jadilah bagian dari perubahan!
                </p>
                <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  Mulai Berdonasi
                </Button>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/40 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 doneasy. Platform donasi mahasiswa yang transparan dan terpercaya.</p>
        </div>
      </footer>
    </div>
  );
};

export default Riwayat;
