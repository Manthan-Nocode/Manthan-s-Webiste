-- Create tables for the portfolio website

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image TEXT NOT NULL,
  is_new BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  author_avatar TEXT,
  views TEXT NOT NULL,
  likes TEXT NOT NULL,
  comments TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);

-- Create RLS policies for security
-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to blog_posts" ON blog_posts FOR SELECT USING (true);

-- Create policies for authenticated insert access
CREATE POLICY "Allow public insert to contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Create policies for admin access
CREATE POLICY "Allow admin full access to blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access to contact_submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
