import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';

export default function ProfileComponent() {
    const { user, loading: authLoading } = useAuth();
    const { showToast } = useToast();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                console.log('Auth user:', user);

                // Search user in custom users table
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                console.log('Custom users table data:', data);
                console.log('Error:', error);

                if (data) {
                    setEmail(data.email || user.email || '');
                    setFullName(data.display_name || data.username || '');
                    setBio(data.bio || '');
                    setAvatarUrl(data.avatar_url || '');
                    setBannerUrl(data.banner_url || '');
                } else {
                    // If no record exists in the custom users table, use auth data
                    setEmail(user.email || '');
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Atualizar na tabela users customizada (usando upsert para criar caso não exista)
            const { error } = await supabase
                .from('users')
                .upsert({
                    id: user.id,
                    email: email,
                    display_name: fullName,
                    bio: bio,
                    avatar_url: avatarUrl,
                    banner_url: bannerUrl,
                    updated_at: new Date().toISOString(),
                });

            if (error) {
                showToast(error.message, 'error');
            } else {
                showToast('Perfil atualizado com sucesso!', 'success');
            }
        } catch (err) {
            showToast('Erro ao atualizar perfil', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <main className="ml-64 p-10 font-sans text-white flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-400">Carregando...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="ml-64 p-10 font-sans text-white">
            {/* HEADER */}
            <header className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md">Profile</h1>
                        <p className="mt-2 text-lg text-gray-300">Manage your account settings and preferences.</p>
                    </div>
                </div>
            </header>

            {/* PROFILE CONTENT */}
            <div className="relative w-full max-w-5xl mx-auto">
                <form onSubmit={handleSubmit}>
                    {/* Glassmorphism Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">

                        {/* Cover Image */}
                        <div
                            className="relative h-48 w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${bannerUrl || 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg'})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/40"></div>
                        </div>

                        {/* Content Container */}
                        <div className="px-8 pb-8">

                            {/* Avatar & Header */}
                            <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-8 gap-6">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 rounded-full opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                                    <img
                                        className="relative w-32 h-32 rounded-full border-4 border-black object-cover shadow-lg"
                                        src={avatarUrl || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                                        alt="Profile"
                                    />
                                    <button type="button" className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full border-4 border-black text-white hover:bg-green-500 transition-colors shadow-md" title="Change Avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-center sm:text-left flex-1">
                                    <h2 className="text-3xl font-bold text-white mb-1">{fullName || 'Usuário'}</h2>
                                    <p className="text-gray-400 text-sm">{email}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button type="button" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-semibold transition-all backdrop-blur-md">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={loading} className="px-6 py-2 bg-green-600 hover:bg-green-500 hover:shadow-[0_0_20px_rgba(22,163,74,0.4)] rounded-xl text-sm font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                                    </button>
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* Personal Info */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold border-b border-white/10 pb-2 text-gray-200">Personal Information</h3>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Nome</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
                                            placeholder="Seu nome"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Email </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            disabled
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all opacity-60 cursor-not-allowed"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Avatar URL</label>
                                        <input
                                            type="text"
                                            name="avatar_url"
                                            value={avatarUrl}
                                            onChange={(e) => setAvatarUrl(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
                                            placeholder="https://exemplo.com/foto.jpg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Banner URL</label>
                                        <input
                                            type="text"
                                            name="banner_url"
                                            value={bannerUrl}
                                            onChange={(e) => setBannerUrl(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
                                            placeholder="https://exemplo.com/banner.jpg"
                                        />
                                    </div>

                                </div>

                                {/* Bio & Links */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold border-b border-white/10 pb-2 text-gray-200">Bio & Details</h3>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Biography</label>
                                        <textarea
                                            name="bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all h-32 resize-none"
                                            placeholder="Escreva sobre você..."
                                        ></textarea>
                                    </div>

                                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-4 items-start">
                                        <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-orange-200">Public Profile</h4>
                                            <p className="text-sm text-orange-200/70 mt-1">Your profile is currently visible to everyone. You can change this in account settings.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}