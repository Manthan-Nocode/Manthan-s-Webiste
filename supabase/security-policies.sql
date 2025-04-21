-- Enable Row Level Security on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Blog posts - Public read access, admin write access
CREATE POLICY "Blog posts are viewable by everyone" 
ON blog_posts FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert blog posts" 
ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update blog posts" 
ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete blog posts" 
ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

-- Contact submissions - Public insert, admin read/update/delete
CREATE POLICY "Anyone can submit contact forms" 
ON contact_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contact submissions" 
ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update contact submissions" 
ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete contact submissions" 
ON contact_submissions FOR DELETE USING (auth.role() = 'authenticated');

-- Portfolio items - Public read access, admin write access
CREATE POLICY "Portfolio items are viewable by everyone" 
ON portfolio_items FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert portfolio items" 
ON portfolio_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update portfolio items" 
ON portfolio_items FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete portfolio items" 
ON portfolio_items FOR DELETE USING (auth.role() = 'authenticated');

-- Waitlist - Public insert, admin read/update/delete
CREATE POLICY "Anyone can join waitlist" 
ON waitlist FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view waitlist" 
ON waitlist FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update waitlist" 
ON waitlist FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete waitlist" 
ON waitlist FOR DELETE USING (auth.role() = 'authenticated');
