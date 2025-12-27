"use client";

import { useEffect } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

export default function CarroselComponent() {
    useEffect(() => {
        const splide = new Splide(".splide", {
            perPage: 4,
            gap: "1rem",
            pagination: false,
            arrows: true,
            breakpoints: {
                1024: { perPage: 3 },
                768: { perPage: 2 },
                640: { perPage: 1 },
            },
        });

        splide.mount();

        return () => splide.destroy();
    }, []);

    return (
        <article>
            <div className="py-16 px-4 md:px-8">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Popular Series
                </h2>

                <div className="splide">
                    <div className="splide__track">
                        <ul className="splide__list">
                            {[
                                "https://m.media-amazon.com/images/M/MV5BNTBlMzA3ZTUtODZjNi00NTM0LWExMjMtNjJhYzA3YTkwMWYwXkEyXkFqcGc@._V1_.jpg",
                                "https://m.media-amazon.com/images/M/MV5BNTZlMGQ1YjEtMzVlNC00ZmMxLTk0MzgtZjdkYTU1NmUxNTQ0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                                "https://i.pinimg.com/736x/40/0c/d2/400cd28987e23604114eb00278f1fa3f.jpg",
                                "https://br.web.img3.acsta.net/pictures/14/04/22/09/03/422873.jpg",
                                "https://m.media-amazon.com/images/S/pv-target-images/4467381f8ccbbc2d17e06f78f3961adedaedc40293abd78a7a2948daf4b52096.jpg",
                            ].map((img, i) => (
                                <li className="splide__slide" key={i}>
                                    <img
                                        src={img}
                                        className="w-full h-96 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    );
}
