"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaUserCircle,
  FaRegEdit,
  FaTrashAlt,
  FaTag,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import Image from "next/image";
import { ImProfile } from "react-icons/im";
import {
  FiSettings,
  FiFileText,
  FiBookOpen,
  FiFile,
  FiUsers,
  FiHome,
  FiLayers,
  FiClipboard,
  FiFilePlus,
  FiGrid,
  FiFlag,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from "next/navigation";
import { LuSquareUser } from "react-icons/lu";
import Link from "next/link";
import { MdNotificationsActive } from "react-icons/md";

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";

const navLinks = [
  { name: "Dashboard", icon: <FiHome />, href: "/admin" },
  { name: "Investors", icon: <FiClipboard />, href: "/admin/registrations" },
  { name: "Deals", icon: <FiLayers />, href: "/admin/deals" },
  // { name: "Users", icon: <FiUsers />, href: "/admin/users" },
  // { name: "Blogs", icon: <FiHome />, href: "/admin/blogs" },
];

const sidebarLinks = [
  // { name: "Dashboard", icon: <FiHome />, href: "/admin" },
  // { name: "Investors", icon: <FiClipboard />, href: "/admin/registrations" },
  // { name: "Deals", icon: <FiLayers />, href: "/admin/deals" },
  { name: "EOI & Compliance", icon: <FiFilePlus />, href: "/admin/eoi" },

  { name: "Documents", icon: <FiFileText />, href: "/admin/documents" },
  { name: "Users", icon: <FiUsers />, href: "/admin/users" },
  {
    name: "CMS",
    icon: <FiBookOpen />,
    dropdown: [
      { name: "Blogs", href: "/admin/blogs", icon: <FaRegEdit /> },
      // { name: "Categories", href: "/admin/blogs/categories", icon: <FiLayers /> },
      // { name: "Tags", href: "/admin/blogs/tags", icon: <FaTag /> },
      {
        name: "Sectors",
        href: "/admin/settings/create-sector",
        icon: <FiGrid />,
      },
      {
        name: "Stages",
        href: "/admin/settings/create-stage",
        icon: <FiFlag />,
      },
      {
        name: "Status",
        href: "/admin/settings/create-status",
        icon: <FiCheckCircle />,
      },
      {
        name: "Ticket-Sizes",
        href: "/admin/settings/create-ticket-range",
        icon: <FiDollarSign />,
      },
    ],
  },
  { name: "Profile", icon: <ImProfile />, href: "/admin/profile" },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cmsDropdownOpen, setCmsDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const cmsDropdownRef = useRef(null);
  const pathname = usePathname();

  // Responsive sidebar toggle
  const handleSidebarToggle = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen((open) => !open);
    } else {
      setSidebarCollapsed((collapsed) => !collapsed);
    }
  };

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  // Close CMS dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cmsDropdownRef.current &&
        !cmsDropdownRef.current.contains(event.target)
      ) {
        setCmsDropdownOpen(false);
      }
    }
    if (cmsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cmsDropdownOpen]);

  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-18 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30 bg-white shadow-md box-shadow-lg">
        <div className="flex items-center gap-2">
          {/* Hamburger for both desktop and mobile */}
          <button
            className="mr-2 p-2 rounded hover:bg-gray-100 md:flex"
            onClick={handleSidebarToggle}
            aria-label="Toggle sidebar"
          >
            <FaBars size={24} />
          </button>

          <Link href="/admin">
            <Image
              src={require("../../assets/equigini-logo.png")}
              alt="Equigini Logo"
              width={150}
              height={100}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex items-center ">
          {/* Add Search Bar only in desktop*/}
          <div className="flex items-center gap-2 px-6 ">
            <div className="relative flex-1 items-center flex">
              <input
                type="text"
                placeholder="Search"
                className=" px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-80"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hidden md:inline-block px-3 py-2 rounded hover:text-[#a330ae] transition-colors mr-5 link-text relative group ${
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
            </Link>
          ))}
          {/* <MdNotificationsActive size={22} className="cursor-pointer" /> */}
          {/* <Badge badgeContent={4} color="error">
                <NotificationsIcon color="action" />
            </Badge> */}
          <div className="ml-2 relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileMenuOpen((v) => !v)}
              aria-label="Profile menu"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-purple-50 text-gray-700 transition-colors link-text"
            >
              <LuSquareUser size={20} className="link-text primary-color" />
              Admin
              <FaChevronDown size={16} />
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 w-40 mt-2 bg-white rounded shadow-lg  z-50">
                {/* <Link
                  href="/admin/profile"
                  className="w-full block text-left px-4 py-2 hover:bg-purple-50 text-gray-700"
                >
                  Profile
                </Link> */}{" "}
                <Link
                  href="/admin/settings"
                  className="w-full px-4 py-2 hover:bg-purple-50 flex items-center gap-2 link-text"
                >
                  <FiSettings className="primary-color" /> Settings
                </Link>
                <button className="w-full  px-4 py-2 hover:bg-purple-50  flex items-center gap-2 link-text">
                  <IoIosLogOut className="primary-color" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-22 left-0 h-[calc(100vh-8rem)] z-20 bg-white border-r border-gray-200 transition-all duration-200 box-shadow-lg
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
          ${sidebarCollapsed ? "w-16" : "w-56"} md:block
        `}
        style={{
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.03)",
        }}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 py-4 box-shadow-lg rounded-lg">
            <ul className="space-y-1">
              {sidebarLinks.map((link) =>
                link.dropdown ? (
                  <li
                    key={link.name}
                    className=" relative"
                    ref={cmsDropdownRef}
                  >
                    {sidebarCollapsed ? (
                      // Only show icon when collapsed
                      <button
                        className="flex items-center justify-center w-full px-2 py-2 rounded-lg transition-colors hover:bg-gray-100 link-text "
                        title={link.name}
                        disabled
                      >
                        <span className="link-text primary-color">
                          {link.icon}
                        </span>
                      </button>
                    ) : (
                      <>
                        <button
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors w-full text-left ${
                            cmsDropdownOpen
                              ? "bg-gray-200"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setCmsDropdownOpen((open) => !open)}
                        >
                          <span className="link-text primary-color">
                            {link.icon}
                          </span>
                          <span className="link-text flex-1">{link.name}</span>
                          <svg
                            className={`ml-auto transition-transform ${
                              cmsDropdownOpen ? "rotate-180" : ""
                            }`}
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                        {cmsDropdownOpen && (
                          <ul className="pl-8 py-1">
                            {link.dropdown.map((item) => (
                              <li
                                key={item.name}
                                className="flex items-center gap-2 "
                              >
                                <span className="primary-color">
                                  {item.icon}
                                </span>
                                <Link
                                  href={item.href}
                                  className={`block py-2 text-[1rem] rounded transition-colors  text-black ${
                                    pathname === item.href
                                      ? "font-semibold "
                                      : ""
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </li>
                ) : (
                  <li key={link.name} className="">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-2  transition-colors hover:bg-purple-50 ${
                        sidebarCollapsed ? "justify-center px-2" : ""
                      } ${
                        pathname === link.href ? "bg-tertiary-color-3 " : ""
                      }`}
                    >
                      <span className="link-text primary-color">
                        {link.icon}
                      </span>
                      {!sidebarCollapsed && (
                        <span className="link-text">{link.name}</span>
                      )}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-13 
          ${sidebarCollapsed ? "md:ml-16" : "md:ml-56"}
        `}
      >
        <div className="p-4 ">{children}</div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
