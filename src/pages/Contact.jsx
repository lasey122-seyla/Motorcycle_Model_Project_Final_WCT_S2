function Contact() {
  return (
    <div className="p-8 max-w-[900px] mx-auto text-white">
      <h1 className="text-sky-400 mb-6 text-3xl font-bold">Contact Us</h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {/* Contact Info Card */}
        <div className="bg-slate-800 p-6 rounded-lg flex flex-col gap-1">
          <h3 className="text-sky-400 text-lg font-semibold mt-2">
            📍 Our Location
          </h3>
          <p className="text-slate-300 mb-3">Phnom Penh, Cambodia</p>

          <h3 className="text-sky-400 text-lg font-semibold mt-2">📞 Phone</h3>
          <p className="text-slate-300 mb-3">+855 12 345 678</p>

          <h3 className="text-sky-400 text-lg font-semibold mt-2">✉️ Email</h3>
          <p className="text-slate-300 mb-3">support@motostore.com</p>
        </div>

        {/* Contact Form */}
        <form
          className="flex flex-col gap-4 bg-slate-800 p-6 rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h3 className="text-white text-xl font-bold mb-1">
            Send us a Message
          </h3>

          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded border-none bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded border-none bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <textarea
            placeholder="Your Message"
            className="p-3 rounded border-none bg-slate-700 text-white placeholder-slate-400 h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <button
            type="submit"
            className="p-3 bg-sky-400 text-slate-950 rounded font-bold cursor-pointer hover:bg-sky-500 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
