"use client";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaUserCircle, FiPlus, FaChevronDown } from "react-icons/fa";
import {
  FiFileText,
  FiBookOpen,
  FiFile,
  FiUsers,
  FiHome,
  FiLayers,
  FiClipboard,
  FiFilePlus,
  FiSettings,
  FiLogOut,
  FiGrid,
  FiFlag,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdNotificationsActive } from "react-icons/md";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";

const navLinks = [
  { name: "Dashboard", icon: <FiHome />, href: "/adminv2" },
  { name: "Investors", icon: <FiClipboard />, href: "/adminv2/registrations" },
  { name: "Deals", icon: <FiLayers />, href: "/adminv2/deals" },
  { name: "Users", icon: <FiUsers />, href: "/adminv2/users" },
  { name: "Blogs", icon: <FiHome />, href: "/adminv2/blogs" },
  // { name: "Deals", icon: <FiLayers />, href: "/adminv2/deals" },
  // { name: "Users", icon: <FiUsers />, href: "/adminv2/users" },
];

const manageLinks = [
  // { name: "Blogs", icon: <FiBookOpen />, href: "/adminv2/blogs" },
  // { name: "Pages", icon: <FiFile />, href: "/adminv2/site-pages" },
  { name: "EOI & Compliance", icon: <FiFilePlus />, href: "/adminv2/eoi" },
  // { name: "Registrations", icon: <FiClipboard />, href: "/adminv2/registrations" },
  { name: "Documents", icon: <FiFileText />, href: "/adminv2/documents" },
  { name: "Sectors", icon: <FiGrid />, href: "/adminv2/settings/create-sector" },
  { name: "Stages", icon: <FiFlag />, href: "/adminv2/settings/create-stage" },
  { name: "Status", icon: <FiCheckCircle />, href: "/adminv2/settings/create-status" },
  { name: "Ticket-Sizes", icon: <FiDollarSign />, href: "/adminv2/settings/create-ticket-range" },
  { name: "Create Deal", icon: <FiPlus />, href: "/adminv2/deals/create-deal" },
];

const cmsLinks = [
  { name: "Blogs", icon: <FiBookOpen />, href: "/adminv2/cms/blogs" },
  { name: "Pages", icon: <FiFile />, href: "/adminv2/cms/pages" },
];

export default function AdminLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [manageDropdownOpen, setManageDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cmsDropdownOpen, setCmsDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const manageDropdownRef = useRef(null);
  const cmsDropdownRef = useRef(null);
  const pathname = usePathname();

  // Close profile, manage, and CMS dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
      if (
        manageDropdownRef.current &&
        !manageDropdownRef.current.contains(event.target)
      ) {
        setManageDropdownOpen(false);
      }
      if (
        cmsDropdownRef.current &&
        !cmsDropdownRef.current.contains(event.target)
      ) {
        setCmsDropdownOpen(false);
      }
    }
    if (profileMenuOpen || manageDropdownOpen || cmsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen, manageDropdownOpen, cmsDropdownOpen]);

  return (
    <div className="min-h-screen ">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30 ">
        <div className="flex items-center gap-2">
          {/* Hamburger for mobile only */}
          <button
            className="mr-2 p-2 rounded hover:bg-gray-100 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <MenuOpenIcon style={{ fontSize: 26 }} />
            ) : (
              <MenuIcon style={{ fontSize: 26 }} />
            )}
          </button>
          {/* <a
            href="/adminv2"
            className="text-xl sm:text-2xl font-bold primary-color focus:outline-none"
          >
            Equigini
          </a> */}
          <Link href="/adminv2">
            <Image
              src={require("../../assets/equigini-logo.png")}
              alt="Equigini Logo"
              width={150}
              height={100}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-2 rounded hover:text-[#a330ae] transition-colors mr-5 link-text relative group ${
                pathname === link.href
                  ? "primary-color link-text border-t-2 border-primary"
                  : ""
              }`}
              style={{
                borderTop:
                  pathname === link.href
                    ? "2px solid var(--primary-color)"
                    : undefined,
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.borderTop =
                    "2px solid var(--primary-color)";
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.borderTop = "2px solid transparent";
                }
              }}
            >
              {link.name}
              {/* <span className="absolute left-0 right-0 -top-[2px] h-0.5 bg-[var(--primary-color)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" /> */}
            </Link>
          ))}

          {/* CMS Dropdown */}
          {/* <div className="relative" ref={cmsDropdownRef}>
            <button
              onClick={() => setCmsDropdownOpen((v) => !v)}
              className={`px-3 py-2 rounded flex items-center gap-1 link-text relative group transition-colors ${cmsDropdownOpen ? "bg-purple-100 link-text border-t-2 border-primary" : "hover:border-t-2 hover:border-primary"}`}
              style={{ borderTop: cmsDropdownOpen ? '2px solid var(--primary-color)' : '2px solid transparent' }}
              type="button"
            >
              CMS
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              <span className="absolute left-0 right-0 -top-[2px] h-0.5 bg-[var(--primary-color)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
            {cmsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
                {cmsLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-purple-50  ${pathname === link.href ? "" : ""}`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div> */}
          {/* Manage Dropdown */}
          <div
            className="relative"
            ref={manageDropdownRef}
            onMouseEnter={() => setManageDropdownOpen(true)}
            onMouseLeave={() => setManageDropdownOpen(false)}
          >
            <button
              className={`px-3 py-2 rounded flex items-center gap-1 link-text relative group transition-colors ${
                manageDropdownOpen
                  ? "bg-purple-100 link-text border-t-2 border-primary"
                  : "hover:border-t-2 hover:border-primary"
              }`}
              style={{
                borderTop: manageDropdownOpen
                  ? "2px solid var(--primary-color)"
                  : "2px solid transparent",
              }}
              type="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={manageDropdownOpen}
            >
              More
              {/* <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg> */}
              {/* <span className="absolute left-0 right-0 -top-[2px] h-0.5 bg-[var(--primary-color)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" /> */}
            </button>
            {manageDropdownOpen && (
              <div className="absolute left-0 mt-0 w-48 bg-white rounded shadow-lg z-50">
                {manageLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={
                      "flex items-center gap-2 px-4 py-2 hover:bg-purple-50"
                    }
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Profile Avatar */}

        <div className="ml-2 relative flex  gap-3" ref={profileMenuRef}>
          {/* <MdNotificationsActive size={22} className="mt-1.5 cursor-pointer" /> */}
          {/* <Badge badgeContent={4} color="error" className="mt-1.5">
            <NotificationsIcon color="action" />
          </Badge> */}
          <button
            onClick={() => setProfileMenuOpen((v) => !v)}
            aria-label="Profile menu flex"
            className="flex items-center gap-2"
          >
            <FaUserCircle
              size={32}
              className="text-purple-400 border-2 border-purple-200 rounded-full"
            />
            <span>Admin</span>
            <FaChevronDown size={16} />
          </button>
          {profileMenuOpen && (
            <div className="absolute right-0 mt-10 w-40 bg-white rounded shadow-lg z-50">
              <Link
                href="/adminv2/profile"
                className="w-full block text-left px-4 py-2 hover:bg-purple-50 text-gray-700 flex items-center gap-2"
              >
                <FaUserCircle className="text-purple-400" />
                Profile
              </Link>
              <Link 
                href="/adminv2/settings"
                className="w-full block text-left px-4 py-2 hover:bg-purple-50 text-gray-700 flex items-center gap-2"
              >
                <FiSettings className="text-purple-400" />
                Settings
              </Link>
              <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 flex items-center gap-2">
                <FiLogOut className="text-purple-400" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <button
            className="fixed inset-0  bg-opacity-30 z-40 md:hidden cursor-default"
            style={{ outline: "none", border: "none" }}
            aria-label="Close menu overlay"
            tabIndex={0}
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setMobileMenuOpen(false);
            }}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col">
            {/* Header: Equigini and Close button side by side, like investor layout */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <span className="text-xl font-bold text-purple-700">
                Equigini
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded hover:bg-gray-100"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1 p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-2 rounded hover:bg-purple-50 text-gray-700 text-lg ${
                    pathname === link.href
                      ? "bg-purple-100 text-purple-700"
                      : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-6 py-2">
                <span className="font-semibold text-gray-700">Manage</span>
                <div className="flex flex-col mt-1">
                  {manageLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-purple-50 text-gray-700 ${
                        pathname === link.href
                          ? "bg-purple-100 text-purple-700"
                          : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="pt-16">
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
