import { useState } from "react";
import Navbar from "@/components/Navbar";
import DonationCard from "@/components/DonationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const Donasi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Sample data - akan diganti dengan data dari database
  const allDonations = Array.from({
    length: 45
  }, (_, i) => ({
    id: `${i + 1}`,
    title: ["Bantu Adik-Adik Kurang Mampu untuk Dapat Pendidikan Layak", "Renovasi Perpustakaan Kampus untuk Mahasiswa", "Program Beasiswa untuk Mahasiswa Berprestasi", "Bantuan Laptop untuk Mahasiswa Kurang Mampu", "Pembangunan Lab Komputer Fakultas", "Donasi Buku untuk Perpustakaan Desa", "Bantu Mahasiswa Terdampak Bencana", "Pelatihan Gratis untuk Mahasiswa"][i % 8],
    organizer: ["BEM Universitas Indonesia", "Himpunan Mahasiswa Teknik", "Senat Mahasiswa IPB", "BEM Fakultas Ilmu Komputer", "Komunitas Peduli Pendidikan", "Forum Mahasiswa"][i % 6],
    image: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop"][i % 6],
    target: [50000000, 30000000, 75000000, 45000000, 60000000][i % 5],
    collected: [35000000, 18000000, 42000000, 28000000, 38000000][i % 5],
    donors: [234, 156, 189, 112, 201][i % 5],
    daysLeft: [15, 22, 30, 18, 25][i % 5]
  }));
  const totalPages = Math.ceil(allDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedDonations = allDonations.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      {/* Header */}
      

      {/* Filters */}
      <section className="bg-background/50 backdrop-blur-sm border-b border-border/40 py-6 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari program donasi..." className="pl-10" />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select defaultValue="terbaru">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terbaru">Terbaru</SelectItem>
                  <SelectItem value="terpopuler">Terpopuler</SelectItem>
                  <SelectItem value="deadline">Deadline Terdekat</SelectItem>
                  <SelectItem value="target">Target Tertinggi</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Donations Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allDonations.length)} dari {allDonations.length} program donasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedDonations.map(donation => <DonationCard key={donation.id} {...donation} />)}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Sebelumnya
          </Button>

          {Array.from({
          length: Math.min(5, totalPages)
        }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          return <Button key={pageNum} variant={currentPage === pageNum ? "default" : "outline"} onClick={() => handlePageChange(pageNum)} className={currentPage === pageNum ? "bg-gradient-primary" : ""}>
                {pageNum}
              </Button>;
        })}

          <Button variant="outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Selanjutnya
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/40 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 doneasy. Platform donasi mahasiswa yang transparan dan terpercaya.</p>
        </div>
      </footer>
    </div>;
};
export default Donasi;