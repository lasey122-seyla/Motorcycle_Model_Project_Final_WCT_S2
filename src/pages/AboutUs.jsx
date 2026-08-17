import React from "react";

function AboutUs() {
  // Safe inline SVG fallback for images
  const fallbackAvatar =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='130' height='130' viewBox='0 0 130 130'><rect width='100%' height='100%' fill='%23334155'/><text x='50%' y='50%' fill='%2338bdf8' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold'>Seyla</text></svg>";

  const getImageUrl = (path) => {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const baseUrl = import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <div className="p-8 max-w-[900px] mx-auto text-white">
      <h1 className="text-sky-400 mb-6 text-3xl font-bold">About MotoStore</h1>

      <div className="flex flex-col gap-6">
        {/* Banner Image */}
        <img
          src={getImageUrl("image/about-banner.jpg")}
          alt="About MotoStore"
          className="w-full max-h-[380px] object-cover rounded-lg"
          onError={(e) => (e.target.style.display = "none")}
        />

        {/* Introduction Text */}
        <div className="text-lg leading-relaxed bg-slate-800 p-6 rounded-lg">
          <p className="mb-4">
            Welcome to <strong>MotoStore</strong>, your premier destination for
            high-performance motorcycles, accessories, and dedicated maintenance
            services.
          </p>
          <p>
            Founded with a passion for riding, we strive to bring top-tier
            motorcycle models and reliable customer support to riders
            everywhere.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-sky-400 mb-3 text-lg font-bold">Our Mission</h3>
            <p className="text-slate-300 leading-normal">
              To provide riders with top-quality motorcycles, genuine spare
              parts, and exceptional customer support at competitive prices.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-sky-400 mb-3 text-lg font-bold">Our Vision</h3>
            <p className="text-slate-300 leading-normal">
              To become Cambodia's most trusted and reliable online platform for
              all motorcycle enthusiasts and daily commuters.
            </p>
          </div>
        </div>

        {/* Profile Card Section */}
        <div className="bg-slate-800 px-6 py-10 rounded-xl text-center max-w-[420px] mx-auto mt-4 w-full box-border border border-slate-700">
          <div className="w-[130px] h-[130px] mx-auto mb-5 rounded-full overflow-hidden border-2 border-sky-400">
            <img
              src={getImageUrl("image/Phaiseyla_olise.jpg")}
              alt="PHAI SEYLA"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackAvatar;
              }}
            />
          </div>

          <h2 className="text-xl font-bold tracking-wider text-white mb-1 uppercase">
            PHAI SEYLA
          </h2>
          <p className="text-sm font-semibold text-red-500 mb-4">
            Developer & Creator
          </p>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            I built this motorcycle project to combine my love for web
            development with the world of two wheels. Every line of code and
            image asset was curated to bring this experience to life.
          </p>

          <div className="flex justify-center gap-5">
            {/* GitHub Icon SVG */}
            <a
              href="https://github.com/lasey122-seyla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors duration-200 hover:text-sky-400"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn Icon SVG */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors duration-200 hover:text-sky-400"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6 fill-currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Email Icon SVG */}
            <a
              href="mailto:seyla@example.com"
              className="text-slate-400 transition-colors duration-200 hover:text-sky-400"
              aria-label="Email"
            >
              <svg className="w-6 h-6 fill-currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
