import Navbar from "@/components/Navbar";
import DonationCard from "@/components/DonationCard";
import { Button } from "@/components/ui/button";
import { Heart, Users, Target, TrendingUp, ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  // Fetch recent reports
  const { data: reports } = useQuery({
    queryKey: ['recent-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          donations (title, organizer_name)
        `)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });
  // Mock data untuk donasi populer
  const popularDonations = [
    {
      id: "1",
      title: "Bantu Pembangunan Perpustakaan Kampus",
      organizer: "Himpunan Mahasiswa Teknik",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop",
      target: 50000000,
      collected: 35000000,
      donors: 234,
      daysLeft: 15,
    },
    {
      id: "2",
      title: "Beasiswa untuk Mahasiswa Kurang Mampu",
      organizer: "BEM Universitas Indonesia",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
      target: 100000000,
      collected: 75000000,
      donors: 456,
      daysLeft: 30,
    },
    {
      id: "3",
      title: "Renovasi Laboratorium Komputer",
      organizer: "Fakultas Ilmu Komputer",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
      target: 30000000,
      collected: 18000000,
      donors: 123,
      daysLeft: 20,
    },
    {
      id: "4",
      title: "Program Peduli Sesama Mahasiswa",
      organizer: "Organisasi Kemahasiswaan",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop",
      target: 25000000,
      collected: 20000000,
      donors: 189,
      daysLeft: 10,
    },
  ];

  const stats = [
    {
      icon: Heart,
      value: "500+",
      label: "Donasi Terkumpul",
    },
    {
      icon: Users,
      value: "10K+",
      label: "Donatur Aktif",
    },
    {
      icon: Target,
      value: "5M+",
      label: "Dana Tersalurkan",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Tingkat Keberhasilan",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Heart className="h-4 w-4 fill-current" />
                Platform Donasi Mahasiswa #1 di Indonesia
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Wujudkan Impian,
              <br />
              Berbagi Kebaikan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Platform donasi yang menghubungkan mahasiswa untuk saling membantu.
              Mulai galang dana atau donasi untuk kampanye yang kamu percaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6">
                <Heart className="h-5 w-5 mr-2 fill-current" />
                Mulai Donasi
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                Galang Dana
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 text-center shadow-elegant hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border border-border/40"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Donations Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Donasi Populer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kampanye donasi yang sedang trending dan membutuhkan dukunganmu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {popularDonations.map((donation) => (
              <DonationCard key={donation.id} {...donation} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2">
              Lihat Semua Donasi
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-gradient-to-br from-secondary/20 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-elegant aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&auto=format&fit=crop" 
                      alt="Volunteer helping"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-elegant aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop" 
                      alt="Children receiving help"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-3xl overflow-hidden shadow-elegant aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&auto=format&fit=crop" 
                      alt="Community support"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-elegant aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&auto=format&fit=crop" 
                      alt="Donation activity"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Decorative circle */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-4 border-primary/20 -z-10" />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Tentang Kami</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
                  Membantu Sesama
                  <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Mahasiswa Indonesia
                  </span>
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Doneasy adalah platform donasi yang menghubungkan mahasiswa untuk saling membantu. 
                Kami percaya bahwa kebaikan sekecil apapun dapat membawa dampak besar bagi sesama.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Donasi</h3>
                    <p className="text-muted-foreground">
                      Berikan bantuan dalam bentuk dana untuk membantu sesama mahasiswa yang membutuhkan.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Volunteer</h3>
                    <p className="text-muted-foreground">
                      Kontribusikan waktu dan keahlianmu untuk membantu kampanye donasi berjalan dengan baik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Bergabung Bersama Kami</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Jadilah Bagian dari
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Perubahan Positif
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              Pilih peranmu dan mulai berkontribusi untuk membantu sesama mahasiswa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Organizer Card */}
            <div className="group relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="space-y-4 pr-20">
                <h3 className="text-2xl font-bold">Jadi Penyelenggara</h3>
                <p className="text-muted-foreground">
                  Buat kampanye donasi untuk membantu mahasiswa atau organisasi kampus yang membutuhkan dana.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Kelola kampanye donasi dengan mudah
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Pantau progress pengumpulan dana
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Buat laporan transparan untuk donatur
                  </li>
                </ul>
              </div>
              <Button className="mt-6 bg-gradient-primary hover:opacity-90">
                Daftar Sebagai Penyelenggara
              </Button>
            </div>

            {/* Volunteer Card */}
            <div className="group relative bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl p-8 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-accent" />
                </div>
              </div>
              <div className="space-y-4 pr-20">
                <h3 className="text-2xl font-bold">Jadi Volunteer</h3>
                <p className="text-muted-foreground">
                  Bantu kampanye donasi dengan waktu dan keahlianmu. Setiap kontribusi sangat berarti.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Bergabung dengan tim volunteer kampanye
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Bantu distribusi dan dokumentasi
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Dapatkan pengalaman sosial berharga
                  </li>
                </ul>
              </div>
              <Button variant="outline" className="mt-6 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Daftar Sebagai Volunteer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Berita Terbaru</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3">
                Kabar & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Laporan</span>
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Update terbaru dari kampanye donasi yang sedang berjalan
              </p>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 group self-start md:self-auto"
              onClick={() => navigate('/laporan')}
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {reports && reports.length > 0 ? (
              reports.map((report) => (
                <article 
                  key={report.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/40 shadow-elegant hover:shadow-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate('/laporan')}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={report.image_url || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&auto=format&fit=crop"} 
                      alt={report.donations?.title || "Report"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(report.created_at).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {report.donations?.title || "Laporan Kampanye"}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {report.content || "Update terbaru dari kampanye donasi"}
                    </p>
                    <div className="pt-2">
                      <span className="text-xs font-medium text-primary">
                        {report.donations?.organizer_name || "Penyelenggara"}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              // Placeholder cards when no reports
              [1, 2, 3].map((i) => (
                <article 
                  key={i}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/40 shadow-elegant hover:shadow-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate('/laporan')}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1559027615-cd4628902d4a' : i === 2 ? '1488521787991-ed7bbaae773c' : '1469571486292-0ba58a3f068b'}?w=600&auto=format&fit=crop`}
                      alt="News"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date().toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      Update Kampanye Donasi
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      Laporan terbaru tentang penyaluran dana dan progress kampanye
                    </p>
                    <div className="pt-2">
                      <span className="text-xs font-medium text-primary">
                        Penyelenggara
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Siap Membuat Perubahan?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Bergabung dengan ribuan mahasiswa lainnya yang sudah berkontribusi melalui doneasy.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Mulai Sekarang
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
