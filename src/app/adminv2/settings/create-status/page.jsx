"use client";
import { useState } from "react";
import styles from "../Settings.module.css";

const initialStatuses = [
  { name: "Unverified", description: "Initial status for new entries" },
  { name: "Pending Review", description: "Waiting for admin review" },
  { name: "Verified", description: "Successfully verified entries" },
  { name: "Deactivated", description: "Disabled or removed entries" },
];

export default function CreateStatusPage() {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const [statuses, setStatuses] = useState(initialStatuses);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Status name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStatuses((prev) => [...prev, { ...formData }]);
      setFormData({ name: "", description: "" });
      setErrors({});
    }
  };

  return (
    // <div className="bg-white p-8 rounded shadow w-full">
    //   <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl sub-heading ">Create New Status</h1>
    //   <form className="mb-4" onSubmit={handleSubmit} autoComplete="off">
    //     <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
    //       <div className="md:col-span-4">
    //         <label className="block font-medium mb-1">Status Name</label>
    //         <input
    //           type="text"
    //           className={`w-full border rounded px-3 py-2${errors.name ? " border-red-500" : ""}`}
    //           name="name"
    //           value={formData.name}
    //           onChange={handleInputChange}
    //           placeholder="Enter status name"
    //         />
    //         {/* {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>} */}
    //       </div>
    //       <div className="md:col-span-6">
    //         <label className="block font-medium mb-1">Description</label>
    //         <input
    //           type="text"
    //           className={`w-full border rounded px-3 py-2${errors.description ? " border-red-500" : ""}`}
    //           name="description"
    //           value={formData.description}
    //           onChange={handleInputChange}
    //           placeholder="Enter description"
    //         />
    //         {/* {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>} */}
    //       </div>
    //       <div className="md:col-span-2 flex items-end">
    //         <button type="submit" className="create-secondary-button px-6 py-2 ">Add Status</button>
    //       </div>
    //     </div>
    //   </form>
    //   <div className="overflow-x-auto">
    //     <table className="w-full text-left border-separate border-spacing-y-2 bg-white rounded shadow">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="py-3 px-4 font-semibold text-gray-700" style={{ width: "20%" }}>Status Name</th>
    //           <th className="py-3 px-4 font-semibold text-gray-700">Description</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {statuses.map((status, idx) => (
    //           <tr key={idx} className="bg-white">
    //             <td className="py-2 px-4 font-semibold">{status.name}</td>
    //             <td className="py-2 px-4">{status.description}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
      <div>
      <h1 className="font20 sub-heading mb-4 ">Status</h1>
      <p className="font16">Manage all statuses here.</p>
    </div>
  );
}
