import { AuthProvider } from '@/app/context/authcontext';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
