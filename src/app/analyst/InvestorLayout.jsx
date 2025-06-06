"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiUser, FiChevronDown, FiLogOut,  } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Dashboard", href: "/analyst" },
  { name: "Investors", href: "/analyst/investors" },
  { name: "Deals", href: "/analyst/deals" },
  { name: "EOI", href: "/analyst/eoi" },
  { name: "Legal Documents", href: "/analyst/documents" },
];

export default function InvestorLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-18 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-10 z-30 box-shadow ">
        <div className="flex items-center gap-2">
          {/* Hamburger for mobile */}
          <button
            className="mr-2 p-2 rounded hover:bg-gray-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FiMenu size={26} />
          </button>
          <Link href="/analyst" className="text-xl sm:text-2xl font-bold primary-color focus:outline-none">
            Equigini
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hidden md:inline-block px-3 py-2 rounded hover:bg-purple-50 text-gray-700 text-xl transition-colors ${
                pathname === link.href
                  ? "bg-purple-100 text-purple-700 "
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="ml-2 relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((v) => !v)}
              aria-label="Profile menu"
            >
                <FaUserCircle size={32} className="text-purple-400 border-2 border-purple-200 rounded-full" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 ">
                <Link
                  href="/analyst/profile"
                  className="block px-4 py-2 hover:bg-purple-50 text-gray-700"
                >
                  Profile
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 flex items-center gap-2">
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Sidebar Nav */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-200 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-xl font-bold primary-color">Equigini</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded hover:bg-gray-100"
          >
            <FiMenu size={26} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium py-2 px-3 rounded hover:bg-purple-50 text-lg ${
                pathname === link.href ? "bg-purple-100 text-purple-700" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      {/* Overlay for mobile nav */}
      {menuOpen && (
        <div
          className="fixed inset-0  bg-opacity-30 z-30 md:hidden"
          role="button"
          tabIndex={0}
          aria-label="Close menu overlay"
          onClick={() => setMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setMenuOpen(false);
          }}
        />
      )}
      <main className="pt-16  mt-3">
        <div className="p-4 px-10">{children}</div>
      </main>
    </div>
  );
}

