import bgImage from '../assets/bg.jpeg';
const HeroSection = () => {
  return (
    <section
      className="bg-cover mt-1 bg-center bg-no-repeat h-[70vh] flex items-center justify-center text-white relative"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative z-10 text-center px-6 max-w-2xl leading-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Crafted with Passion. Worn with Pride.
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Custom printed T-shirts, Keychains, Mugs & more – made just for you.
        </p>
        <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
          Customize Design
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
