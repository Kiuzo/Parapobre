import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sidebar() {
    const router = useRouter();
    const currentPath = router.pathname;

    const isActive = (path) => {
        // Simple check
        return currentPath.includes(path);
    };

    const activeClass = "flex items-center gap-4 border-l-2 border-red-600 bg-linear-to-r from-red-600/20 to-transparent px-4 py-3 font-medium text-red-500 transition-all";
    const inactiveClass = "flex items-center gap-4 border-l-2 border-transparent px-4 py-3 text-gray-400 transition-all hover:bg-white/5 hover:text-white";

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/5 bg-[#060606] text-white">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
            <div className="p-8">
                <a href="#" className="flex items-center gap-2">
                    <span className="text-xl font-black italic tracking-tighter uppercase">Paramonte</span>
                </a>
            </div>

            <nav className="flex-1 space-y-1 px-4">
                <p className="mb-4 mt-4 px-4 text-[10px] font-semibold tracking-widest text-gray-500 uppercase">Main Menu</p>

                <Link href="./watch" className={isActive('watch') ? activeClass : inactiveClass}>
                    <i className="fas fa-house text-lg"></i>
                    <span className="text-sm">Home</span>
                </Link>

                <div className="pt-8">
                    <p className="mb-4 px-4 text-[10px] font-semibold tracking-widest text-gray-500 uppercase">Library</p>
                    <Link href="./favorites" className={isActive('favorites') ? activeClass : inactiveClass}>
                        <i className="fas fa-heart text-lg"></i>
                        <span className="text-sm">Favorites</span>
                    </Link>
                </div>
            </nav>

            <div className="border-t border-white/5 p-4">
                <button className="flex w-full items-center gap-3 rounded-xl p-3 text-gray-400 transition-all hover:bg-red-500/10 hover:text-red-500">
                    <i className="fas fa-arrow-right-from-bracket"></i>
                    <a href="../" className="text-sm font-medium">Logout</a>
                </button>
            </div>
        </aside>
    );
}