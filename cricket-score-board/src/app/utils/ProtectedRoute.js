"use client"
import { useAuth } from '@/app/context/authcontext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login'); // Redirect to login if not logged in
      } else if (adminOnly && user.role !== 'admin') {
        router.push('/'); // Redirect if not an admin
      }
    }
  }, [user, loading, adminOnly, router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
