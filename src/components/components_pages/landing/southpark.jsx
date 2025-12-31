export default function SouthparkComponent() {
    return (
        <section>
            <div className="relative flex flex-col justify-center items-center min-h-screen">
                <img
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                    src="https://images.pluto.tv/series/60c8f203e301960013db434a/featuredImage_1755166932254.jpg"
                    alt="South Park" />

                <div className="relative z-10 flex flex-col gap-y-8 px-4 md:px-8 text-white w-full h-full">
                    <h2 className="text-4xl md:text-6xl font-bold">SOUTH PARK</h2>

                    <p className="text-base md:text-lg max-w-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>

                    <button
                        className="border-2 rounded-md px-6 py-4 cursor-pointer w-fit
                           hover:scale-110 hover:bg-white hover:text-black transition-all duration-300">
                        Watch now!
                    </button>
                </div>
            </div>
        </section>
    );
}