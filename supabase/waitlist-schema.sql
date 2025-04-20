-- Create waitlist table for collecting email addresses
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting new emails
CREATE POLICY "Allow public insert to waitlist" ON waitlist FOR INSERT WITH CHECK (true);

-- Create policy for admin access
CREATE POLICY "Allow admin full access to waitlist" ON waitlist FOR ALL USING (auth.role() = 'authenticated');
