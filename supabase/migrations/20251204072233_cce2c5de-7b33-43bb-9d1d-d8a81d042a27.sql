-- Create reports table (many reports per donation/campaign)
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
  content TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteers table (many volunteers per donation/campaign)
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

-- RLS policies for reports (public read)
CREATE POLICY "Reports are viewable by everyone"
ON public.reports FOR SELECT USING (true);

CREATE POLICY "Organizers can insert reports"
ON public.reports FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.donations 
    WHERE id = donation_id AND organizer_id = auth.uid()
  )
);

-- RLS policies for volunteers (public read)
CREATE POLICY "Volunteers are viewable by everyone"
ON public.volunteers FOR SELECT USING (true);

CREATE POLICY "Organizers can manage volunteers"
ON public.volunteers FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.donations 
    WHERE id = donation_id AND organizer_id = auth.uid()
  )
);