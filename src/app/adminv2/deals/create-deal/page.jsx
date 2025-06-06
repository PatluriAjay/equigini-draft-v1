"use client";
import React, { useState } from "react";
import Select from "react-select";
import { FaCloudUploadAlt, FaTrashAlt, FaPlus, FaCheck, FaEdit } from "react-icons/fa";

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
    color: "black",
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

const steps = [
  { title: "Basic Details" },
  { title: "Deal Details" },
  { title: "Document Upload" },
];

export default function CreateDealStepper() {
  const [step, setStep] = useState(0);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (selected, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selected }));
  };
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, teaser: e.target.files[0] }));
  };
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

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validation and API integration
  };

  return (
    <div className="flex flex-col h-[calc(100vh-0)] p-4 bg-white rounded-lg box-shadow-lg mt-5">
      <div className="w-full ">
        <h2 className="font20 sub-heading mb-4 poppins-font fw-600 px-6">
          Create Deal
        </h2>
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8 px-6 w-full">
          {steps.map((s, idx) => {
            const isCompleted = idx < step;
            const isCurrent = idx === step;
            let StepIcon = null;
            if (isCompleted) {
              StepIcon = FaCheck;
            } else if (isCurrent) {
              StepIcon = FaEdit;
            } else {
              StepIcon = () => <span style={{fontWeight:600}}>{idx+1}</span>;
            }
            return (
              <React.Fragment key={s.title}>
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${
                      isCompleted
                        ? "bg-[#174ea6] border-4 border-[#174ea6] text-white"
                        : isCurrent
                        ? "bg-white border-4 border-[#174ea6] text-[#174ea6]"
                        : "bg-gray-200 border-4 border-gray-200 text-gray-400"
                    }`}
                    style={{ width: 44, height: 44, fontSize: 22 }}
                  >
                    <StepIcon />
                  </div>
                  <span className="text-xs md:text-sm text-center poppins-font mt-2 text-gray-700 whitespace-nowrap">
                    {s.title}
                  </span>
                  <div className="w-full h-1 bg-white rounded-full mt-2"></div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="h-1 w-full max-w-[80px] bg-[#174ea6] mx-2 md:mx-4 rounded-full"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Details */}
          {step === 0 && (
            <div className=" p-6">
              <h3 className="font-semibold text-lg mb-4">Basic Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block font-medium mb-1 font16 intervar-font">
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
                  <label className="block font-medium mb-1 font16 intervar-font">
                    Geography
                  </label>
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
                  <label className="block font-medium mb-1 font16 intervar-font">
                    Sector
                  </label>
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
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 font16 intervar-font">
                    Stage
                  </label>
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
                    styles={customStyles}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Step 2: Deal Details */}
          {step === 1 && (
            <div className=" p-6">
              <h3 className="font-semibold text-lg mb-4">Deal Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block font-medium mb-1 font16 intervar-font">
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
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 font16 intervar-font">
                    Status
                  </label>
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
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 font16 intervar-font">
                    Summary
                  </label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    placeholder="Brief summary for listing"
                    required
                    rows={2}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="block font-medium mb-1 font16 intervar-font">
                    Deal Priority Flag
                  </label>
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
                    className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out bg-gray-200 border ${
                      formData.priority?.value === true
                        ? "border-primary"
                        : "border-gray-300"
                    }`}
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
                <div>
                  <label className="block font-medium mb-1 font16 intervar-font">
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
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 font16 intervar-font">
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
              </div>
            </div>
          )}
          {/* Step 3: Document Upload */}
          {step === 2 && (
            <div className=" p-6">
              <h3 className="font-semibold text-lg mb-4">Document Upload</h3>
              <div className="mb-4">
                <label className="block font-medium mb-1 font16 intervar-font">
                  Teaser Document
                </label>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded px-4 py-3">
                    <FaCloudUploadAlt className="text-gray-400 mr-2" />
                    <span className="text-gray-500 flex-1 truncate">
                      {formData.teaser ? formData.teaser.name : "No file selected"}
                    </span>
                  </div>
                  <label className="inline-block fileupload-button hover:bg-[#0a3871]/90 text-white px-4 py-2 rounded cursor-pointer create-secondary-button">
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
              <div>
                <label className="block font-medium mb-1 font16 intervar-font">
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
                          styles={customStyles}
                        />
                      </div>
                      <div className="flex-1 flex items-center bg-white border border-gray-200 rounded px-3 py-2 min-w-0">
                        <FaCloudUploadAlt className="text-gray-400 mr-2" />
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
                            className="equi-action-btn equi-action-editbtn hover:bg-[#f3e6fa]"
                            onClick={addCollateralRow}
                            title="Add"
                          >
                            <FaPlus />
                          </button>
                          {collateralUploads.length > 1 && (
                            <button
                              type="button"
                              className="equi-action-btn equi-action-deletebtn hover:bg-red-100"
                              onClick={() => removeCollateralRow(idx)}
                              title="Delete"
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
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow-sm transition"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 rounded bg-primary hover:bg-[#a330ae]/90 text-white font-semibold shadow-md transition"
              >
                Next
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow-sm transition"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-primary hover:bg-[#a330ae]/90 text-white font-semibold shadow-md transition"
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}