import React from "react";
import tshirts from "../assets/tshirts.jpeg"
import keychain from "../assets/keychain.jpeg"
import mug from "../assets/mug.jpeg"
import hoodies from "../assets/hoodies.jpeg"

// Dummy category data — you can link them to pages or filters
const categories = [
  {
    id: 1,
    name: "T-Shirts",
    image: tshirts,
    link: "/tshirts",
  },
  {
    id: 2,
    name: "Mugs",
    image: mug,
    link: "/mugs",
  },
  {
    id: 3,
    name: "Hoodies",
    image: hoodies ,
    link: "/hoodies",
  },
  {
    id: 4,
    name: "Keychains",
    image: keychain,
    link: "/keychains",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 px-6 md:px-20 bg-gray-50 ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Featured Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((item) => (
          <a
            href={item.link}
            key={item.id}
            className="block bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full p-1 h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
              <p className="text-sm text-indigo-500 mt-1">Explore Now →</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
