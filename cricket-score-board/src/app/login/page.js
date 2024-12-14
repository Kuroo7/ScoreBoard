'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/authcontext';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const { message } = await res.json();
                setError(message);
                return;
            }

            const { token, role } = await res.json();
            login(token, role);

            router.push('/dashboard'); // Redirect to dashboard
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Login
            </button>
        </form>
    );
}
