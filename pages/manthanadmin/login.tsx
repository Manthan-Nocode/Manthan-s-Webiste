import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/manthanadmin');
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
            autoFocus
          />
          {error && <div className="text-destructive text-sm text-center">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg btn-primary font-semibold shadow disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-8 text-center text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} Manthan Tiwari | Admin Panel
        </div>
      </div>
    </div>
  );
}
