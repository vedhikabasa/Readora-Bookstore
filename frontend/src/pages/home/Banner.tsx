import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <section className="grid lg:grid-cols-2 items-center gap-16 min-h-[80vh] py-16">
      {/* Left Content */}
      <div>
        <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-medium mb-6">
          📚 Welcome to Readora
        </span>

        <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight text-gray-900">
          Discover Stories
          <br />
          That Stay With You
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
          Explore thousands of carefully curated books—from timeless classics
          to modern bestsellers. Find your next favorite read with Readora and
          build your personal library.
        </p>

        <div className="flex flex-wrap gap-5 mt-10">
          <button className="rounded-xl bg-violet-600 px-8 py-4 font-medium text-white shadow-lg hover:bg-violet-700 hover:-translate-y-1 transition-all duration-300">
            Explore Books
          </button>

          <button className="rounded-xl border border-violet-600 px-8 py-4 font-medium text-violet-600 hover:bg-violet-50 transition-all duration-300">
            Browse Categories
          </button>
        </div>

<div className="flex flex-wrap gap-8 mt-12">
  <div>
    <h3 className="text-xl font-bold text-violet-600">
      📚 Curated Collection
    </h3>
    <p className="text-gray-500 mt-1">
      Explore books across multiple genres.
    </p>
  </div>

  <div>
    <h3 className="text-xl font-bold text-violet-600">
      🚚 Fast Delivery
    </h3>
    <p className="text-gray-500 mt-1">
      Quick and reliable doorstep delivery.
    </p>
  </div>

  <div>
    <h3 className="text-xl font-bold text-violet-600">
      ⭐ Reader's Choice
    </h3>
    <p className="text-gray-500 mt-1">
      Discover books loved by our readers.
    </p>
  </div>
</div>
        
      </div>

      {/* Right Image */}
      <div className="flex justify-center lg:justify-end">
        <img
          src={bannerImg}
          alt="Readora Banner"
          className="w-full max-w-[650px] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default Banner;