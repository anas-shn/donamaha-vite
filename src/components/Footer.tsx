import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">doneasy</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Platform donasi terpercaya untuk membantu sesama. Bersama kita bisa membuat perubahan yang berarti.
            </p>
          </div>

          {/* Navigasi */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/donasi" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Donasi
                </Link>
              </li>
              <li>
                <Link to="/laporan" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Laporan
                </Link>
              </li>
              <li>
                <Link to="/riwayat" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Riwayat
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span>hello@doneasy.id</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Dapatkan update terbaru tentang kampanye donasi kami.
            </p>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-primary-foreground/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © 2024 doneasy. Semua hak dilindungi.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/70">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Kebijakan Privasi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
