import { Link, useNavigate } from "react-router";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

  const cartItems = useSelector(
    (state: { cart: { cartItems: CartItem[] } }) => state.cart.cartItems
  );

  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  const token = localStorage.getItem("token");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <nav className="max-w-[1600px] mx-auto flex items-center justify-between 8 py-5">
        {}
        <div className="flex items-center md:gap-16 gap-4">
          <Link
  to="/"
  className="flex items-center gap-3"
>
  <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-2xl text-white shadow-lg">
    📖
  </div>

  <div>
    <h1 className="text-3xl font-black tracking-tight text-slate-900">
      READORA
    </h1>

    <p className="text-sm text-slate-500 -mt-1">
      Discover Your Next Story
    </p>
  </div>
</Link>

          {}
          <div className="relative hidden md:block w-[420px]">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <input
  type="text"
  placeholder="Search here"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
  console.log("Key:", e.key);

  if (e.key === "Enter") {
    e.preventDefault();
    console.log("Enter pressed");
    navigate(`/?search=${search}`);
  }
}}
  className="w-full rounded-full border border-gray-200 bg-slate-50 py-3.5 pl-12 pr-5 text-sm shadow-sm transition-all duration-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100 outline-none"
/>
          </div>
        </div>

        {}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`w-10 h-10 rounded-full border-2 border-violet-500 ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 border-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                {" "}
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-100 transition">
            <HiOutlineHeart className="size-6" />
          </button>

          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-white shadow-lg hover:bg-violet-700 transition-all duration-300 hover:scale-105"
          >
            <HiOutlineShoppingCart className="" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
