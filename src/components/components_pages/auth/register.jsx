import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/router';

export default function RegisterComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await signUp(email, password);

            if (error) {
                showToast(error.message, 'error');
            } else {
                showToast('Account created successfully!', 'success');
                setTimeout(() => {
                    router.push('/system/watch');
                }, 500);
            }
        } catch (err) {
            showToast('An unexpected error occurred while creating your account', 'error');
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

                        <p className="text-center text-gray-400 mb-8">Create your account</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    maxLength="16"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Seu nome"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    maxLength="50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    minLength="8"
                                    maxLength="16"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    required
                                />
                                <p className="text-xs text-gray-500 ml-1">Minimum 8 characters</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : 'Create account'}
                            </button>

                            <div className="text-center pt-4 border-t border-white/10">
                                <p className="text-sm text-gray-400">
                                    Already have an account?{' '}
                                    <a href="/auth/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                        Login
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