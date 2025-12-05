import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Image as ImageIcon, ArrowRight, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import CreateReportForm from "@/components/CreateReportForm";

interface ReportWithDonation {
  id: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
  donation_id: string;
  donations: {
    id: string;
    title: string;
    organizer_name: string;
    image_url: string | null;
    collected_amount: number;
    target_amount: number;
  };
}

const ReportFeed = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ["all-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reports")
        .select(`
          *,
          donations (
            id,
            title,
            organizer_name,
            image_url,
            collected_amount,
            target_amount
          )
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ReportWithDonation[];
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Laporan Terbaru</h1>
            <p className="text-muted-foreground">
              Update terkini dari para penyelenggara kampanye donasi
            </p>
          </div>
          <CreateReportForm />
        </div>

        {/* Feed */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-4 flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <Skeleton className="h-64 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : reports && reports.length > 0 ? (
          <div className="space-y-6">
            {reports.map((report) => {
              const progress = report.donations
                ? Math.min(
                    (report.donations.collected_amount / report.donations.target_amount) * 100,
                    100
                  )
                : 0;

              return (
                <Card key={report.id} className="overflow-hidden">
                  {/* Post Header - Organizer Info */}
                  <div className="p-4 flex items-center gap-3 border-b border-border">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={report.donations?.image_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {report.donations?.organizer_name?.charAt(0).toUpperCase() || "O"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {report.donations?.organizer_name}
                      </p>
                      <Link
                        to={`/donasi/${report.donation_id}`}
                        className="text-xs text-primary hover:underline truncate block"
                      >
                        {report.donations?.title}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(report.created_at), "d MMM", { locale: id })}
                    </div>
                  </div>

                  {/* Post Image */}
                  {report.image_url && (
                    <div className="aspect-video bg-muted">
                      <img
                        src={report.image_url}
                        alt="Laporan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Post Content */}
                  <CardContent className="p-4">
                    {report.content && (
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap mb-4">
                        {report.content}
                      </p>
                    )}

                    {/* Campaign Progress Mini Card */}
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium">Progress Donasi</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5 mb-2">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary">
                          {formatCurrency(report.donations?.collected_amount || 0)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          dari {formatCurrency(report.donations?.target_amount || 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  {/* Post Footer */}
                  <div className="px-4 pb-4">
                    <Link
                      to={`/donasi/${report.donation_id}/report`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      Lihat semua laporan
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-muted rounded-full">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Belum ada laporan</p>
                <p className="text-sm text-muted-foreground/70">
                  Laporan dari penyelenggara akan muncul di sini
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ReportFeed;
