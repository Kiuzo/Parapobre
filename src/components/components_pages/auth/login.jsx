import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/router';

export default function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await signIn(email, password);

            if (error) {
                showToast(error.message, 'error');
            } else {
                showToast('Logged in successfully!', 'success');
                setTimeout(() => {
                    router.push('/system/watch');
                }, 500);
            }
        } catch (err) {
            showToast('An unexpected error occurred while logging in', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-28 text-white">
            <div className="w-full max-w-md">
                {/* Glassmorphism Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 pointer-events-none"></div>

                    <div className="relative px-8 py-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Parapobre
                        </h1>

                        <p className="text-center text-gray-400 mb-8">Welcome back</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                    required
                                />
                            </div>

                            <div className="text-center">
                                <a
                                    href="#"
                                    className="text-sm text-gray-400 hover:text-green-400 underline transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-xl font-bold text-white shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : 'Login'}
                            </button>

                            <div className="text-center pt-4 border-t border-white/10">
                                <p className="text-sm text-gray-400">
                                    Don't have an account?{' '}
                                    <a href="/auth/register" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}