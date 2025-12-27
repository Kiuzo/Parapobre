export default function BackgroundComponent() {
    return (
        <main>
            {/* bg */}
            <div class="fixed inset-0 -z-10 bg-[url('https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg')] bg-cover bg-center bg-no-repeat"></div>
            {/* overlay */}
            <div class="fixed inset-0 -z-10 bg-black/60"></div>
        </main>
    );
}