
-- Notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  icon_type TEXT NOT NULL DEFAULT 'info',
  priority TEXT NOT NULL DEFAULT 'low',
  target_type TEXT NOT NULL DEFAULT 'all',
  target_value TEXT,
  notification_type TEXT NOT NULL DEFAULT 'popup',
  button_text TEXT,
  button_url TEXT,
  created_by_admin TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  repeat_interval TEXT DEFAULT 'none',
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_draft BOOLEAN NOT NULL DEFAULT false,
  recipients_count INTEGER DEFAULT 0,
  read_count INTEGER DEFAULT 0
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read active notifications" ON public.notifications FOR SELECT TO authenticated USING (is_active = true);

-- User notifications junction table
CREATE TABLE public.user_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notification_id UUID REFERENCES public.notifications(id) ON DELETE CASCADE NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  clicked_button BOOLEAN NOT NULL DEFAULT false,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON public.user_notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.user_notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Admin settings table
CREATE TABLE public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Add missing columns to licenses
ALTER TABLE public.licenses ADD COLUMN IF NOT EXISTS price_pkr NUMERIC(10,2) DEFAULT 0;
ALTER TABLE public.licenses ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '1 month';
ALTER TABLE public.licenses ADD COLUMN IF NOT EXISTS used_by_email TEXT;
ALTER TABLE public.licenses ADD COLUMN IF NOT EXISTS generated_by_admin TEXT;

-- Add missing columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS device_info TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ip_address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS files_processed INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_activity TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Add admin_email column to activity_logs
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS admin_email TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS action_type TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS target_email TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS target_license TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'success';

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_notifications;
