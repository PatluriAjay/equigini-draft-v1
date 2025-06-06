"use client";
import { useRouter } from "next/navigation";
import { FiTag, FiLayers, FiCheckCircle, FiSliders } from "react-icons/fi";
import styles from "./Settings.module.css";

const settingsOptions = [
  {
    title: "Create Sector",
    description: "Add or manage sectors",
    icon: <FiTag size={32}  />,
    route: "/admin/settings/create-sector",
  },
  {
    title: "Create Stage",
    description: "Add or manage stages",
    icon: <FiLayers size={32}  />,
    route: "/admin/settings/create-stage",
  },
  {
    title: "Create Status",
    description: "Add or manage statuses",
    icon: <FiCheckCircle size={32}  />,
    route: "/admin/settings/create-status",
  },
  {
    title: "Create Ticket Range",
    description: "Add or manage ticket size ranges",
    icon: <FiSliders size={32}  />,
    route: "/admin/settings/create-ticket-range",
  },
];

export default function SettingsPage() {
  const router = useRouter();
  return (
    // <div className={styles.container}>
    //   <div className={styles.grid}>
    //     {settingsOptions.map((option) => (
    //       <div
    //         key={option.title}
    //         className={styles.card}
    //         onClick={() => router.push(option.route)}
    //       >
    //         <div className={styles.icon}>{option.icon}</div>
    //         <div className={styles.content}>
    //           <div className={styles.title}>{option.title}</div>
    //           <div className={styles.description}>{option.description}</div>
    //         </div>
    //         <div className={styles.arrow}>
    //           <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M9 6l6 6-6 6" stroke="#a330ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    //           </svg>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
     <div>
      <h1 className="font20 sub-heading mb-4">Settings</h1>
      <p className="font16">View and edit your settings here.</p>
    </div>
  );
}
