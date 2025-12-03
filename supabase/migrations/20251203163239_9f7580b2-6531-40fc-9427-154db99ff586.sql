-- Create transactions table for donation payments
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID REFERENCES public.donations(id) ON DELETE CASCADE NOT NULL,
  donor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  amount BIGINT NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'transfer',
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Transactions are viewable by everyone (for showing donor list)
CREATE POLICY "Transactions are viewable by everyone" ON public.transactions
  FOR SELECT USING (true);

-- Anyone can create a transaction (for donations)
CREATE POLICY "Anyone can create transactions" ON public.transactions
  FOR INSERT WITH CHECK (true);

-- Add trigger for updated_at
CREATE TRIGGER set_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();