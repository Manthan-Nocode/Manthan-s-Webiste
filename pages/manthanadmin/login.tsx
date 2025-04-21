import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/manthanadmin');
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
}
