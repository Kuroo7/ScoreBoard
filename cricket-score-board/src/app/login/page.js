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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-2xl mb-4 text-center font-semibold">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out shadow-md hover:shadow-xl"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
