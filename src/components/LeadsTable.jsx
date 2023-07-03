import React, { useEffect, useState } from "react";
import logo from "../assets/react.svg";
import { states } from "../data";
import Select from "react-select";

//multi select data
const statusMultiOption = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const commonFilterData = [
  { key: "currentStatus", value: "converted", common: false, isSelect: false },
  { key: "paymentStatus", value: "single", common: false, isSelect: false },
  { key: "assignedTo", value: "1", common: false, isSelect: false },
  { key: "documentStatus", value: "pending", common: false, isSelect: false },
  {
    key: "interactionStatus",
    value: "pending",
    common: false,
    isSelect: false,
  },
];

const otherFilterData = [
  { key: "storeName", value: "" },
  { key: "status", value: "" },
  { key: "state", value: "" },
  { key: "district", value: "" },
  { key: "referralStatus", value: "" },
  { key: "zipCode", value: "" },
  { key: "addedFromDate", value: "" },
  { key: "addedToDate", value: "" },
  { key: "newlead", value: "" },
  { key: "area", value: "" },
];

const LeadsTable = () => {
  //filter button hide/hide
  const [filterStatus, setFilterStatus] = useState(true);

  //common filter options
  const [commonFilter, setCommonFilter] = useState(commonFilterData);

  //accordion status start
  const [storeStatus, setStoreStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(false);
  const [areaStatus, setAreaStatus] = useState(false);
  const [referralStatus, setReferralStatus] = useState(false);
  const [zipCodeStatus, setZipCodeStatus] = useState(false);
  const [newAddedLeadStatus, setNewAddedLeadStatus] = useState(false);
  //accordion status end

  //area
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);

  //it will contain all selected data
  const [selectedFilter, setSelectedFilter] = useState([
    { key: "storeName", value: "", isSelect: storeStatus },
    { key: "status", value: "", isSelect: currentStatus },
    { key: "state", value: selectedState, isSelect: areaStatus },
    { key: "district", value: "", isSelect: areaStatus },
    { key: "referralStatus", value: "", isSelect: referralStatus },
    { key: "zipCode", value: "", isSelect: zipCodeStatus },
    { key: "addedFromDate", value: "", isSelect: newAddedLeadStatus },
    { key: "addedToDate", value: "", isSelect: newAddedLeadStatus },
    { key: "newlead", value: "", isSelect: newAddedLeadStatus },
    { key: "area", value: "", isSelect: areaStatus },
  ]);

  // to select State
  const handleStateChange = (event) => {
    handleOtherFilterChange(event);
    const selectedState = event.target.value;
    setSelectedState(selectedState);

    setSelectedDistrict("");
    const selectedDistricts = states.find(
      (state) => state.name === selectedState
    ).districts;
    setDistricts(selectedDistricts);
  };

  // to select District
  const handleDistrictChange = (event) => {
    handleOtherFilterChange(event);
    setSelectedDistrict(event.target.value);
  };

  // add to applied filter section
  const selectHandler = (item) => {
    let exit = selectedFilter.find((filter) => filter.key === item.key);
    if (!exit) {
      //find is item is present in commonFilter Data or not
      if (commonFilterData.find((filter) => filter.key === item.key)) {
        setSelectedFilter((prev) => [...prev, { ...item, isSelect: true }]);
        setCommonFilter(
          commonFilter.map((filter) =>
            filter.key == item.key
              ? { ...filter, common: true, isSelect: true }
              : filter
          )
        );
      } else {
        setSelectedFilter((prev) => [
          ...prev,
          { ...item, isSelect: item.isSelect },
        ]);
      }
    } else {
      //other remove if again click
      setSelectedFilter(
        selectedFilter.filter((filter) => filter.key !== item.key)
      );
    }
  };

  // remove from applied filter section
  const removeHandler = (item) => {
    setSelectedFilter((prevState) => {
      const updatedFilter = prevState.map((filter) => {
        if (filter.key === item.key) {
          return { ...filter, isSelect: false };
        }
        return filter;
      });
      return updatedFilter;
    });

    if (commonFilterData.find((filter) => filter.key === item.key)) {
      setCommonFilter(
        commonFilter.map((filter) =>
          filter.key == item.key
            ? { ...filter, common: false, isSelect: false }
            : filter
        )
      );
    } else if (otherFilterData.find((filter) => filter.key === item.key)) {
      console.log(item);

      if (item.key == "storeName") {
        setStoreStatus(!storeStatus);
      } else if (item.key == "status") {
        setCurrentStatus(!currentStatus);
      } else if (item.key == "area") {
        setAreaStatus(!areaStatus);
      } else if (item.key == "referralStatus") {
        setReferralStatus(!referralStatus);
      } else if (item.key == "zipCode") {
        setZipCodeStatus(!zipCodeStatus);
      } else if (item.key == "newlead") {
        setNewAddedLeadStatus(!newAddedLeadStatus);
      }
    }
  };

  //hide unhide filter button
  const filterStatusHandler = () => {
    setFilterStatus(!filterStatus);
  };

  //status multi select
  const HandleMultiSelect = (e) => {
    const inputValue = e.map((option) => option.value).join(", ");

    setSelectedFilter((prevState) => {
      const updatedFilter = prevState.map((filter) => {
        if (filter.key === "status") {
          return { ...filter, value: inputValue };
        }
        return filter;
      });
      return updatedFilter;
    });
  };

  //accordion select/deselect
  const handleOtherFilterAccordion = (event) => {
    let name = event.currentTarget.getAttribute("name");
    setSelectedFilter((prevState) => {
      const updatedFilter = prevState.map((filter) => {
        if (filter.key === name) {
          return { ...filter, isSelect: !filter.isSelect };
        }
        return filter;
      });
      return updatedFilter;
    });
  };

  //to add value to respective key
  const handleOtherFilterChange = (event) => {
    const inputValue = event.target.value;
    setSelectedFilter((prevState) => {
      const updatedFilter = prevState.map((filter) => {
        if (filter.key === event.target.name) {
          return { ...filter, value: inputValue };
        }
        return filter;
      });
      return updatedFilter;
    });
  };

  return (
    <div className="w-11/12 p-4 my-5 absolute left-20 flex gap-2">
      {/* filter code */}
      {filterStatus && (
        <div className="w-1/4 shadow-md">
          <div className="flex justify-between border border-gray-200 p-1">
            <div className="flex items-center">
              <img src={logo} className="h-3" alt="" />
              <p className="font-medium">Filters</p>
            </div>
            <div
              className="items-center cursor-pointer"
              onClick={filterStatusHandler}
            >
              <img src={logo} className="h-3" alt="" />
              <p className="text-sm">Min</p>
            </div>
          </div>
          <div className="border border-gray-200 ">
            <div className="flex justify-between items-center p-1">
              <p className="font-medium text-gray-500">Applied Filters</p>
              <p className="text-blue-500 text-sm cursor-pointer">Clear All</p>
            </div>
            {/* applied filter */}
            <div className="grid grid-cols-2 gap-1 py-4 px-2">
              {selectedFilter.map((item, index) => (
                <>
                  {item.isSelect && (
                    <div
                      className="text-white bg-blue-400 rounded-md text-xs flex justify-between space-x-1 py-1.5 px-2 hover:cursor-pointer flex-wrap"
                      onClick={() => removeHandler(item)}
                    >
                      <p className="break-words">{item.key}</p>
                      <p>x</p>
                    </div>
                  )}
                </>
              ))}
            </div>
            {/* common filter */}
            {commonFilter && (
              <div className="grid grid-cols-2 gap-1 mt-2 border border-gray-200 p-2">
                {commonFilter.map((item, index) => (
                  <div
                    className={
                      item?.common
                        ? "text-white border bg-blue-400 rounded-sm text-xs font-medium flex justify-center p-1 hover:cursor-pointer"
                        : "text-gray-600 border border-gray-300 rounded-sm text-xs font-medium flex justify-center p-1 hover:bg-blue-400 hover:text-white hover:cursor-pointer"
                    }
                    onClick={() => selectHandler(item)}
                  >
                    <span>{item.key}</span>
                  </div>
                ))}
              </div>
            )}

            {/* accordion section */}
            {/* Store Name */}
            <div>
              <div>
                <div
                  className="flex justify-between items-center p-2 cursor-pointer border border-gray-100"
                  name="storeName"
                  onClick={(event) => {
                    setStoreStatus(!storeStatus);
                    handleOtherFilterAccordion(event);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={storeStatus}
                    />
                    <span className="font-medium text-gray-600">
                      Store Name
                    </span>
                  </div>
                  <div>
                    <img src={logo} className="h-4" alt="" />
                  </div>
                </div>

                {storeStatus && (
                  <div className="w-full bg-gray-200  space-y-2 p-3">
                    <p className="text-xs text-gray-500">Enter Store Name</p>
                    <input
                      type="text"
                      name="storeName"
                      className="focus:outline-none w-full shadow-md p-1"
                      value={selectedFilter[0].value}
                      onChange={handleOtherFilterChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Current Status */}
            <div>
              <div
                className="flex justify-between items-center p-2 cursor-pointer border border-gray-100"
                onClick={(event) => {
                  setCurrentStatus(!currentStatus);
                  handleOtherFilterAccordion(event);
                }}
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={currentStatus}
                  />
                  <span className="font-medium text-gray-600">
                    Current Status
                  </span>
                </div>
                <div>
                  <img src={logo} className="h-4" alt="" />
                </div>
              </div>

              {currentStatus && (
                <div className=" bg-gray-200 p-4 space-y-2">
                  <p className="text-xs text-gray-500">select Current Status</p>
                  <Select
                    onChange={HandleMultiSelect}
                    isMulti
                    name="status"
                    options={statusMultiOption}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              )}
            </div>

            {/* Area */}
            <div>
              <div
                className="flex justify-between items-center p-2 cursor-pointer border border-gray-100"
                name="area"
                onClick={(event) => {
                  setAreaStatus(!areaStatus);
                  handleOtherFilterAccordion(event);
                }}
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={areaStatus}
                  />
                  <span className="font-medium text-gray-600">Area</span>
                </div>
                <div>
                  <img src={logo} className="h-4" alt="" />
                </div>
              </div>

              {areaStatus && (
                <div className="flex flex-col gap-2 p-2">
                  <select
                    id="state"
                    name="state"
                    className="border border-gray-300 rounded"
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>

                  {selectedState && (
                    <div>
                      <select
                        id="district"
                        name="district"
                        className="border border-gray-300 rounded w-full"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Referral Status */}
            <div>
              <div>
                <div
                  className="flex justify-between items-center p-2 cursor-pointer border border-gray-100"
                  name="referralStatus"
                  onClick={(event) => {
                    setReferralStatus(!referralStatus);
                    handleOtherFilterAccordion(event);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={referralStatus}
                    />
                    <span className="font-medium text-gray-600">
                      Referral Status {referralStatus}
                    </span>
                  </div>
                  <div>
                    <img src={logo} className="h-4" alt="" />
                  </div>
                </div>

                {referralStatus && (
                  <div className=" bg-gray-200 p-4 space-y-2">
                    <p className="text-xs text-gray-500">
                      select Referral Status
                    </p>
                    <select
                      name="referralStatus"
                      onChange={handleOtherFilterChange}
                      className="text-gray-600 text-sm w-full shadow-md outline-none"
                    >
                      <option value="">Select......</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            {/* Zip Code */}
            <div>
              <div>
                <div
                  className="flex justify-between items-center p-2 cursor-pointer border border-gray-100"
                  name="zipCode"
                  onClick={(event) => {
                    setZipCodeStatus(!zipCodeStatus);
                    handleOtherFilterAccordion(event);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={zipCodeStatus}
                    />
                    <span className="font-medium text-gray-600">Zip Code</span>
                  </div>
                  <div>
                    <img src={logo} className="h-4" alt="" />
                  </div>
                </div>

                {zipCodeStatus && (
                  <div className="w-full bg-gray-200  space-y-2 p-3">
                    <p className="text-xs text-gray-500">Enter Zip Code</p>
                    <input
                      type="text"
                      name="zipCode"
                      className="focus:outline-none w-full shadow-md p-1"
                      value={selectedFilter[5].value}
                      onChange={handleOtherFilterChange}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* New Added Lead */}
            <div>
              <div>
                <div
                  className="flex justify-between items-center p-2 cursor-pointer border border-gray-100"
                  name="newlead"
                  onClick={(event) => {
                    setNewAddedLeadStatus(!newAddedLeadStatus);
                    handleOtherFilterAccordion(event);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={newAddedLeadStatus}
                    />
                    <span className="font-medium text-gray-600">
                      New Added Lead
                    </span>
                  </div>
                  <div>
                    <img src={logo} className="h-4" alt="" />
                  </div>
                </div>

                {newAddedLeadStatus && (
                  <div className="w-full bg-gray-200  space-y-2 p-3">
                    <p className="text-xs text-gray-500">
                      From
                    </p>
                    <input
                      type="date"
                      name="addedFromDate"
                      className="focus:outline-none w-full shadow-md p-1"
                      value={selectedFilter[6].value}
                      onChange={handleOtherFilterChange}
                    />
                    <p className="text-xs text-gray-500">
                      To
                    </p>
                    <input
                      type="date"
                      name="addedToDate"
                      className="focus:outline-none w-full shadow-md p-1"
                      value={selectedFilter[7].value}
                      onChange={handleOtherFilterChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* table code */}
      <div className="w-full">
        {/* top table actions */}
        <div className="flex justify-between w-ful">
          <div className="flex gap-2">
            <div
              className="relative cursor-pointer"
              onClick={filterStatusHandler}
            >
              <p className="absolute right-0 -top-2 text-white bg-blue-500 rounded-full w-3 h-3 flex justify-center items-center">
                <span className="text-xs">{selectedFilter.length}</span>
              </p>
              <div className="flex items-center p-1 border border-gray-300 bg-gray-100 rounded-sm gap-x-3">
                <img src={logo} className="h-4" alt="" />
                <p className="text-blue-500 font-medium">Filters</p>
              </div>
            </div>

            <div>sort</div>
          </div>
          <div>other</div>
        </div>
        {/* table code */}
        <div>
          <h1>Table Code</h1>
        </div>
      </div>
    </div>
  );
};

export default LeadsTable;
