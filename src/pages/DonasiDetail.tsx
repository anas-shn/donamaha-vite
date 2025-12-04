import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  Users, 
  Calendar, 
  Share2, 
  ChevronLeft,
  Shield,
  Clock,
  MapPin
} from "lucide-react";

// Mock data - will be replaced with real data from Supabase
const mockDonation = {
  id: "1",
  title: "Bantu Pembangunan Masjid Al-Ikhlas di Desa Terpencil",
  description: `Assalamualaikum Wr. Wb.

Kami mengajak seluruh umat Muslim untuk bersama-sama membangun Masjid Al-Ikhlas di Desa Sukamaju, Kecamatan Cianjur. Desa ini terletak di daerah terpencil yang sulit dijangkau dan belum memiliki tempat ibadah yang layak.

Saat ini, warga desa hanya memiliki mushola kecil yang sudah tidak mampu menampung jamaah yang semakin bertambah. Kondisi bangunan pun sudah sangat memprihatinkan dengan atap yang bocor dan lantai yang rusak.

**Dana yang Dibutuhkan:**
- Material bangunan: Rp 150.000.000
- Upah pekerja: Rp 50.000.000
- Perlengkapan masjid: Rp 30.000.000
- Biaya operasional: Rp 20.000.000

**Target Pembangunan:**
- Kapasitas 200 jamaah
- 2 lantai dengan fasilitas wudhu terpisah
- Ruang TPA untuk anak-anak

Mari bersama-sama kita wujudkan tempat ibadah yang layak bagi saudara-saudara kita. Setiap rupiah yang Anda donasikan akan menjadi amal jariyah yang pahalanya terus mengalir.

Jazakallahu Khairan Katsira.`,
  image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800",
  target: 250000000,
  collected: 187500000,
  donors: 1247,
  daysLeft: 23,
  category: "Tempat Ibadah",
  location: "Cianjur, Jawa Barat",
  createdAt: "2024-01-15",
  organizer: {
    id: "org-1",
    name: "Yayasan Amal Sejahtera",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    bio: "Yayasan sosial yang bergerak di bidang pembangunan tempat ibadah dan pendidikan sejak 2010.",
    verified: true,
    totalCampaigns: 15,
    totalRaised: 2500000000,
  },
  updates: [
    {
      date: "2024-02-01",
      title: "Progress Pembangunan Minggu ke-3",
      content: "Alhamdulillah, fondasi masjid sudah selesai dikerjakan. Terima kasih atas dukungan para donatur.",
    },
    {
      date: "2024-01-25",
      title: "Peletakan Batu Pertama",
      content: "Hari ini kami telah melaksanakan peletakan batu pertama pembangunan Masjid Al-Ikhlas.",
    },
  ],
  recentDonors: [
    { name: "Hamba Allah", amount: 1000000, time: "2 jam lalu" },
    { name: "Ahmad S.", amount: 500000, time: "5 jam lalu" },
    { name: "Fatimah", amount: 250000, time: "1 hari lalu" },
  ],
};

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000, 1000000];

const DonasiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const donation = mockDonation;
  
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  
  const amount = selectedAmount || parseInt(customAmount) || 0;
  const percentage = (donation.collected / donation.target) * 100;

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

  const handleDonateClick = () => {
    if (amount >= 10000) {
      navigate("/payment", {
        state: {
          donationId: donation.id,
          donationTitle: donation.title,
          amount,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/donasi" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Donasi
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Meta */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {donation.category}
                </span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {donation.location}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {donation.title}
              </h1>
            </div>

            {/* Organizer Card */}
            <Card className="p-5 border-border/40">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={donation.organizer.avatar} />
                  <AvatarFallback>{donation.organizer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{donation.organizer.name}</h3>
                    {donation.organizer.verified && (
                      <Shield className="h-4 w-4 text-primary fill-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{donation.organizer.bio}</p>
                  <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                    <span>{donation.organizer.totalCampaigns} Kampanye</span>
                    <span>•</span>
                    <span>{formatCurrency(donation.organizer.totalRaised)} terkumpul</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 border-border/40">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Tentang Donasi Ini</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {donation.description}
              </div>
            </Card>

            {/* Updates */}
            <Card className="p-6 border-border/40">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Update Terbaru</h2>
              <div className="space-y-4">
                {donation.updates.map((update, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-4">
                    <p className="text-sm text-muted-foreground">{update.date}</p>
                    <h3 className="font-medium text-foreground">{update.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{update.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Progress Card */}
            <Card className="p-6 border-border/40 sticky top-4">
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(donation.collected)}</p>
                  <p className="text-sm text-muted-foreground">
                    terkumpul dari {formatCurrency(donation.target)}
                  </p>
                </div>

                <Progress value={percentage} className="h-3" />

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{donation.donors.toLocaleString()} donatur</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{donation.daysLeft} hari lagi</span>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="pt-4 border-t border-border space-y-4">
                  <Label className="text-sm font-medium">Pilih Nominal Donasi</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_AMOUNTS.map((preset) => (
                      <Button
                        key={preset}
                        variant={selectedAmount === preset ? "default" : "outline"}
                        className={`text-xs ${selectedAmount === preset ? "bg-gradient-primary" : ""}`}
                        onClick={() => handleAmountSelect(preset)}
                      >
                        {formatCurrency(preset).replace("Rp", "").trim()}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Atau masukkan nominal lain</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        Rp
                      </span>
                      <Input
                        type="text"
                        placeholder="Minimal 10.000"
                        value={customAmount ? parseInt(customAmount).toLocaleString("id-ID") : ""}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {amount > 0 && (
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Nominal Donasi</span>
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full h-12 text-base bg-gradient-primary hover:opacity-90"
                  onClick={handleDonateClick}
                  disabled={amount < 10000}
                >
                  <Heart className="h-5 w-5 mr-2 fill-current" />
                  Donasi Sekarang
                </Button>

                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan
                </Button>
              </div>

              {/* Recent Donors */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold mb-3 text-foreground">Donatur Terbaru</h3>
                <div className="space-y-3">
                  {donation.recentDonors.map((donor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Heart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{donor.name}</p>
                          <p className="text-xs text-muted-foreground">{donor.time}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-primary">
                        {formatCurrency(donor.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 doneasy. Platform donasi terpercaya untuk kebaikan bersama.</p>
        </div>
      </footer>
    </div>
  );
};

export default DonasiDetail;
