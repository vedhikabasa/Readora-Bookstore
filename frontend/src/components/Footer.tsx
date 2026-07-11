import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 mt-24">
      <div className="max-w-[1600px] mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-2xl text-white shadow-lg">
                📖
              </div>

              <div>
                <h2 className="text-3xl font-black text-white">
                  READORA
                </h2>

                <p className="text-sm text-gray-400">
                  Discover Your Next Story
                </p>
              </div>
            </div>

            <p className="leading-7 text-gray-400">
              Readora is your digital bookstore where readers discover
              bestselling books, timeless classics and inspiring stories from
              every genre.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Explore
            </h3>

            <ul className="space-y-4">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Books</Link></li>
              <li><Link to="/">Categories</Link></li>
              <li><Link to="/">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Support
            </h3>

            <ul className="space-y-4">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Newsletter
            </h3>

            <p className="text-gray-400 mb-5">
              Get book recommendations and exclusive updates directly in your inbox.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-3 mb-4 outline-none focus:border-violet-500"
            />

            <button className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 transition">
              Subscribe
            </button>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 Readora. All rights reserved.
          </p>

          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-violet-400 transition">
              Privacy
            </a>

            <a href="#" className="hover:text-violet-400 transition">
              Terms
            </a>

            <a href="#" className="hover:text-violet-400 transition">
              Cookies
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;