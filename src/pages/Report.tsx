import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Users, Heart, Calendar, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const Report = () => {
  const { id: donationId } = useParams();

  const { data: donation, isLoading: loadingDonation } = useQuery({
    queryKey: ["donation", donationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .eq("id", donationId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: reports, isLoading: loadingReports } = useQuery({
    queryKey: ["reports", donationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("donation_id", donationId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: volunteers, isLoading: loadingVolunteers } = useQuery({
    queryKey: ["volunteers", donationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("volunteers")
        .select("*")
        .eq("donation_id", donationId);
      if (error) throw error;
      return data;
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const progress = donation
    ? Math.min((donation.collected_amount / donation.target_amount) * 100, 100)
    : 0;

  if (loadingDonation) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          to={`/donasi/${donationId}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Kampanye
        </Link>

        {/* Campaign Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
            {donation?.image_url && (
              <img
                src={donation.image_url}
                alt={donation.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {donation?.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                oleh {donation?.organizer_name}
              </p>
            </div>
          </div>
          
          <CardContent className="p-6">
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-primary">
                  {formatCurrency(donation?.collected_amount || 0)}
                </span>
                <span className="text-muted-foreground">
                  dari {formatCurrency(donation?.target_amount || 0)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold">{donation?.donor_count || 0}</p>
                  <p className="text-xs text-muted-foreground">Donatur</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold">{volunteers?.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Relawan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volunteers Section */}
        {volunteers && volunteers.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Tim Relawan
            </h2>
            <div className="flex flex-wrap gap-3">
              {volunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  className="flex items-center gap-3 bg-card border border-border rounded-xl p-3"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={volunteer.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {volunteer.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{volunteer.name}</p>
                    {volunteer.role && (
                      <p className="text-xs text-muted-foreground">{volunteer.role}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reports Feed */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Laporan Kegiatan
          </h2>

          {loadingReports ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full rounded-2xl" />
              ))}
            </div>
          ) : reports && reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  {report.image_url && (
                    <div className="aspect-video bg-muted">
                      <img
                        src={report.image_url}
                        alt="Laporan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(report.created_at), "d MMMM yyyy, HH:mm", {
                        locale: id,
                      })}
                    </div>
                    {report.content && (
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {report.content}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-muted rounded-full">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">
                    Belum ada laporan
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Laporan kegiatan akan ditampilkan di sini
                  </p>
                </div>
              </div>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
};

export default Report;
