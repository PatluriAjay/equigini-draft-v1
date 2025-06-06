"use client";
import { useState } from "react";
import Select from "react-select";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const sectorOptions = [
  { value: "Fintech", label: "Fintech" },
  { value: "Consumer", label: "Consumer" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "EdTech", label: "EdTech" },
];
const stageOptions = [
  { value: "Early", label: "Early" },
  { value: "Growth", label: "Growth" },
  { value: "Debt", label: "Debt" },
  { value: "Pre-IPO", label: "Pre-IPO" },
];
const ticketSizeOptions = [
  { value: "250000-3000000", label: "₹2,50,000 – ₹30,00,000" },
  { value: "500000-5000000", label: "₹5,00,000 – ₹50,00,000" },
];
const statusOptions = [
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
  { value: "Archived", label: "Archived" },
];
const priorityOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];
const visibilityOptions = [
  { value: "all", label: "All Investors" },
  { value: "None", label: "None" },
];
const collateralTypeOptions = [
  { value: "pitch_deck", label: "Pitch Deck" },
  { value: "im", label: "IM" },
  { value: "financials", label: "Financials" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor:
      state.isFocused || state.isSelected ? "#a330ae20" : "white",
    color: "black", // or adjust based on your theme
    cursor: "pointer",
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#a330ae20" : provided.borderColor,
    boxShadow: state.isFocused ? `0 0 0 1px #a330ae20` : provided.boxShadow,
    "&:hover": {
      borderColor: "#a330ae20",
    },
  }),
};

export default function CreateDealPage() {
  const [formData, setFormData] = useState({
    title: "",
    sector: null,
    stage: null,
    geography: "",
    ticketSize: null,
    summary: "",
    description: "",
    status: null,
    priority: null,
    visibility: null,
    teaser: null,
    collateral: [],
  });

  const [collateralUploads, setCollateralUploads] = useState([
    { file: null, type: null },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selected, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selected,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      teaser: e.target.files[0],
    }));
  };

  // For multiple collateral uploads with type
  const handleCollateralFileChange = (idx, file) => {
    const updated = [...collateralUploads];
    updated[idx].file = file;
    setCollateralUploads(updated);
  };
  const handleCollateralTypeChange = (idx, selected) => {
    const updated = [...collateralUploads];
    updated[idx].type = selected;
    setCollateralUploads(updated);
  };
  const addCollateralRow = () => {
    setCollateralUploads((prev) => [...prev, { file: null, type: null }]);
  };
  const removeCollateralRow = (idx) => {
    setCollateralUploads((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validation and API integration
    // alert("Deal submitted (demo)");
  };

  return (
    <div className="flex flex-col min-h-screen py-4">
      <h2 className="sub-heading font20  mb-5">Create Deal</h2>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full  space-y-8"
      >
        {/* Basic Information */}
        <div className="bg-white rounded-xl box-shadow-lg mb-5 p-6">
          <div className="flex items-center mb-4">
            <span className="text-xl text-primary mr-2">
              <i className="fa fa-info-circle primary-color" />
            </span>
            <span className="sub-heading font18 poppins-font">
              Basic Information
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 font16 ">
                Deal Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter deal title"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 font16">Geography</label>
              <input
                type="text"
                name="geography"
                value={formData.geography}
                onChange={handleInputChange}
                placeholder="Enter geography"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 font16">Sector</label>
              <Select
                instanceId="sector-select"
                name="sector"
                options={sectorOptions}
                value={formData.sector}
                onChange={handleSelectChange}
                isSearchable
                placeholder="Select Sector"
                required
                classNamePrefix="react-select tertiary-color-3"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 font16">Stage</label>
              <Select
                instanceId="stage-select"
                name="stage"
                options={stageOptions}
                value={formData.stage}
                onChange={handleSelectChange}
                isSearchable
                placeholder="Select Stage"
                required
                classNamePrefix="react-select tertiary-color-3"
                // className="tertiary-color-3"
              />
            </div>
          </div>
        </div>
        {/* Deal Details */}
        <div className="bg-white rounded-xl box-shadow-lg mb-5 mb-5 mb-5 p-6 mb-2">
          <div className="flex items-center mb-4">
            <span className="text-xl text-primary mr-2">
              <i className="fa fa-chart-line primary-color" />
            </span>
            <span className="sub-heading font18 poppins-font">
              Deal Details
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 font16">
                Ticket Size Range
              </label>
              <Select
                instanceId="ticket-size-select"
                name="ticketSize"
                options={ticketSizeOptions}
                value={formData.ticketSize}
                onChange={handleSelectChange}
                isSearchable
                placeholder="Select Range"
                required
                classNamePrefix="react-select tertiary-color-3"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 font16">Status</label>
              <Select
                instanceId="status-select"
                name="status"
                options={statusOptions}
                value={formData.status}
                onChange={handleSelectChange}
                isSearchable
                placeholder="Select Status"
                required
                classNamePrefix="react-select tertiary-color-3"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-1 font16">Summary</label>
              <input
                type="text"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                placeholder="Brief summary for listing"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        {/* Priority & Visibility */}
        <div className="bg-white rounded-xl box-shadow-lg mb-5 mb-5 mb-5 mb-5 p-6 mb-2">
          <div className="flex items-center mb-4">
            <span className="text-xl text-primary mr-2">
              <i className="fa fa-eye primary-color" />
            </span>
            <span className="sub-heading font18 poppins-font">
              Priority & Visibility
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex flex-col gap-2">
              <label className="block font-medium mb-1 font16">
                Deal Priority Flag
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-pressed={formData.priority?.value === true}
                  onClick={() =>
                    handleSelectChange(
                      priorityOptions[
                        formData.priority?.value === true ? 1 : 0
                      ],
                      { name: "priority" }
                    )
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out bg-gray-200`}
                  style={{
                    boxShadow:
                      formData.priority?.value === true
                        ? "0 0 0 2px #a330ae55"
                        : undefined,
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                      formData.priority?.value === true ? "translate-x-5" : ""
                    }`}
                    style={{
                      backgroundColor:
                        formData.priority?.value === true
                          ? "#a330ae"
                          : "#ffffff",
                    }}
                  ></div>
                </button>

                <span className="text-gray-600 poppins-font font16">
                  High Priority
                </span>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1 font16">
                Visibility
              </label>
              <Select
                instanceId="visibility-select"
                name="visibility"
                options={visibilityOptions}
                value={formData.visibility}
                onChange={handleSelectChange}
                placeholder="Select Visibility"
                required
                classNamePrefix="react-select tertiary-color-3"
              />
            </div>
          </div>
        </div>
        {/* Document Uploads */}
        <div className="bg-white rounded-xl box-shadow-lg mb-5 p-6 ">
          <div className="flex items-center mb-4">
            <span className="text-xl text-primary mr-2">
              <i className="fa fa-cloud-upload-alt primary-color" />
            </span>
            <span className="sub-heading font18 poppins-font">
              Document Uploads
            </span>
          </div>
          {/* Teaser Document Upload */}
          <div className="mb-4">
            <label className="block font-medium mb-1 font16">
              Teaser Document
            </label>
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded px-4 py-3">
                <i className="fa fa-file-alt text-gray-400 mr-2" />
                <span className="text-gray-500 flex-1 truncate">
                  {formData.teaser ? formData.teaser.name : "No file selected"}
                </span>
              </div>
              <label className="inline-block fileupload-button fo hover:bg-[#0a3871]/90 text-white px-4 py-2 rounded  cursor-pointer create-secondary-button">
                Browse
                <input
                  type="file"
                  name="teaser"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {/* Collateral Uploads */}
          <div>
            <label className="block font-medium mb-1 font16">
              Deal Collateral Documents
            </label>
            {collateralUploads.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center gap-2 mb-2 bg-gray-50 border border-gray-200 rounded p-3"
              >
                <div className="flex flex-col md:flex-row flex-1 gap-2 w-full min-w-0">
                  <div className="w-full md:w-56 min-w-0">
                    <Select
                      instanceId={`collateral-type-select-${idx}`}
                      options={collateralTypeOptions}
                      value={item.type}
                      onChange={(selected) =>
                        handleCollateralTypeChange(idx, selected)
                      }
                      placeholder="Select Type"
                      classNamePrefix="react-select tertiary-color-3"
                    />
                  </div>
                  <div className="flex-1 flex items-center bg-white border border-gray-200 rounded px-3 py-2 min-w-0">
                    <i className="fa fa-file-alt text-gray-400 mr-2" />
                    <span className="text-gray-500 flex-1 truncate">
                      {item.file ? item.file.name : "No file selected"}
                    </span>
                    <label className="inline-block create-secondary-button fileupload-button hover:bg-gray-700 text-white px-3 py-1 rounded font-semibold cursor-pointer ml-2">
                      Browse
                      <input
                        type="file"
                        onChange={(e) =>
                          handleCollateralFileChange(idx, e.target.files[0])
                        }
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        className="hidden"
                      />
                    </label>
                    <div className="flex items-center gap-2 ml-2">
                      <button
                        type="button"
                        className="equi-action-btn equi-action-editbtn"
                        onClick={addCollateralRow}
                      >
                        <FaPlus />
                      </button>
                      {collateralUploads.length > 1 && (
                        <button
                          type="button"
                          className="equi-action-btn equi-action-deletebtn"
                          onClick={() => removeCollateralRow(idx)}
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Full Description */}
        <div className="bg-white rounded-xl box-shadow-lg mb-5 mb-5 mb-5 mb-5 p-6 mb-2">
          <div className="flex items-center mb-4">
            <span className="text-xl text-primary mr-2">
              <i className="fa fa-align-left primary-color" />
            </span>
            <span className="sub-heading font18 poppins-font">
              Full Description
            </span>
          </div>
          <label className="block font-medium mb-1 font16">
            Detailed Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide a comprehensive description of the deal..."
            rows={5}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            type="submit"
            className=" create-secondary-button fileupload-button"
          >
            Save Draft
          </button>
          <button type="submit" className="create-secondary-button ">
            Create
          </button>
          {/* <button
            type="submit"
            className="create-secondary-button"
          >
          Go Back
          </button> */}
        </div>
      </form>
    </div>
  );
}
