"use client";
import { useState } from "react";
import styles from "../Settings.module.css";

const initialRanges = [
  { min: 250000, max: 3000000, description: "Seed to Series A" },
  { min: 500000, max: 5000000, description: "Series A to Series B" },
];

const formatCurrency = (value) => {
  if (!value && value !== 0) return "";
  return `₹${Number(value).toLocaleString("en-IN")}`;
};

export default function CreateTicketRangePage() {
  const [formData, setFormData] = useState({ min: "", max: "", description: "" });
  const [errors, setErrors] = useState({});
  const [ranges, setRanges] = useState(initialRanges);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.min) newErrors.min = "Minimum is required";
    if (!formData.max) newErrors.max = "Maximum is required";
    if (formData.min && formData.max && Number(formData.min) >= Number(formData.max)) {
      newErrors.max = "Maximum must be greater than minimum";
    }
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setRanges((prev) => [
        ...prev,
        {
          min: Number(formData.min),
          max: Number(formData.max),
          description: formData.description,
        },
      ]);
      setFormData({ min: "", max: "", description: "" });
      setErrors({});
    }
  };

  return (
    // <div className="bg-white p-8 rounded shadow w-full">
    //   <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl sub-heading ">Create Ticket Size Range</h1>
    //   <form className="mb-4" onSubmit={handleSubmit} autoComplete="off">
    //     <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
    //       <div className="md:col-span-2">
    //         <label className="block font-medium mb-1">Min (₹)</label>
    //         <input
    //           type="number"
    //           className={`w-full border rounded px-3 py-2${errors.min ? " border-red-500" : ""}`}
    //           name="min"
    //           value={formData.min}
    //           onChange={handleInputChange}
    //           placeholder="Min"
    //           min="0"
    //         />
    //         {/* {errors.min && <div className="text-red-500 text-sm mt-1">{errors.min}</div>} */}
    //       </div>
    //       <div className="md:col-span-2">
    //         <label className="block font-medium mb-1">Max (₹)</label>
    //         <input
    //           type="number"
    //           className={`w-full border rounded px-3 py-2${errors.max ? " border-red-500" : ""}`}
    //           name="max"
    //           value={formData.max}
    //           onChange={handleInputChange}
    //           placeholder="Max"
    //           min="0"
    //         />
    //         {/* {errors.max && <div className="text-red-500 text-sm mt-1">{errors.max}</div>} */}
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
    //         <button type="submit" className="create-secondary-button px-6 py-2 ">Add Range</button>
    //       </div>
    //     </div>
    //   </form>
    //   <div className="overflow-x-auto">
    //     <table className="w-full text-left border-separate border-spacing-y-2 bg-white rounded shadow">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="py-3 px-4 font-semibold text-gray-700" style={{ width: "30%" }}>Range</th>
    //           <th className="py-3 px-4 font-semibold text-gray-700">Description</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {ranges.map((range, idx) => (
    //           <tr key={idx} className="bg-white">
    //             <td className="py-2 px-4 font-semibold">{formatCurrency(range.min)} – {formatCurrency(range.max)}</td>
    //             <td className="py-2 px-4">{range.description}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
      <div>
      <h1 className="font20 sub-heading mb-4 ">Ticket Sizes</h1>
      <p className="font16">Manage all Ticket Sizes here.</p>
    </div>
  );
}
