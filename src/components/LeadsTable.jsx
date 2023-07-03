import React, { useEffect, useState } from "react";
import logo from "../assets/react.svg";
import { states } from "../data";
import Select from "react-select";

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
  // manage all states here
  const [filterStatus, setFilterStatus] = useState(true);
  //it will contain all selected data
  const [selectedFilter, setSelectedFilter] = useState([]);
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

  //other filters values
  const [storeNameValue, setstoreNameValue] = useState({
    key: "storeName",
    value: "",
    isSelect: false,
  });
  const [currentStatusValue, setCurrentStatusValue] = useState({
    key: "status",
    value: "",
    isSelect: false,
  });
  const [areaValue, setAreaValue] = useState({ key: "area", value: "" });

  const [referralStatusValue, setReferralStatusValue] = useState({
    key: "referralStatus",
    value: "",
    isSelect: false,
  });
  const [zipCodeValue, setZipCodeValue] = useState({
    key: "zipCode",
    value: "",
    isSelect: false,
  });
  const [newAddedLeadValue, setNewAddedLeadValue] = useState({
    key: "newlead",
    value: "",
    isSelect: false,
  });

  //area
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);

    setSelectedDistrict("");
    const selectedDistricts = states.find(
      (state) => state.name === selectedState
    ).districts;
    setDistricts(selectedDistricts);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

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

  const removeHandler = (item) => {
    setSelectedFilter(
      selectedFilter.filter((filter) => filter.key !== item.key)
    );

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

  const filterStatusHandler = () => {
    setFilterStatus(!filterStatus);
  };

  const HandleMultiSelect = (e) => {
  
    const allValues = e
      .map((option) => option.value)
      .join(", ");
    
    console.log(allValues);
  };

  // currentStatusValue  with select option
  useEffect(() => {
    if (selectedFilter.find((filter) => filter.key == currentStatusValue.key)) {
      setSelectedFilter(
        selectedFilter.map((prev) =>
          prev.key == currentStatusValue.key
            ? { ...prev, value: currentStatusValue.value }
            : prev
        )
      );
    } else {
      if (currentStatusValue.value.length > 0) {
        setSelectedFilter((prev) => [...prev, currentStatusValue]);
      }
    }
  }, [currentStatusValue]);

  useEffect(() => {
    if (
      selectedFilter.find((filter) => filter.key == referralStatusValue.key)
    ) {
      setSelectedFilter(
        selectedFilter.map((prev) =>
          prev.key == referralStatusValue.key
            ? { ...prev, value: referralStatusValue.value }
            : prev
        )
      );
    } else {
      if (referralStatusValue.value.length > 0) {
        setSelectedFilter((prev) => [...prev, referralStatusValue]);
      }
    }
  }, [referralStatusValue]);

  //text input
  useEffect(() => {
    if (selectedFilter.find((filter) => filter.key == storeNameValue.key)) {
      setSelectedFilter(
        selectedFilter.map((prev) =>
          prev.key == storeNameValue.key
            ? { ...prev, value: storeNameValue.value }
            : prev
        )
      );
    } else {
      if (storeNameValue.value.length > 0) {
        setSelectedFilter((prev) => [...prev, storeNameValue]);
      }
    }
  }, [storeNameValue]);

  useEffect(() => {
    if (selectedFilter.find((filter) => filter.key == zipCodeValue.key)) {
      setSelectedFilter(
        selectedFilter.map((prev) =>
          prev.key == zipCodeValue.key
            ? { ...prev, value: zipCodeValue.value }
            : prev
        )
      );
    } else if (zipCodeValue.value.length > 0) {
      setSelectedFilter((prev) => [...prev, zipCodeValue]);
    }
  }, [zipCodeValue]);

  //two date input
  useEffect(() => {
    if (selectedFilter.find((filter) => filter.key == newAddedLeadValue.key)) {
      setSelectedFilter(
        selectedFilter.map((prev) =>
          prev.key == newAddedLeadValue.key
            ? { ...prev, value: newAddedLeadValue.value }
            : prev
        )
      );
    } else {
      if (newAddedLeadValue.value.length > 0) {
        setSelectedFilter((prev) => [...prev, newAddedLeadValue]);
      }
    }
  }, [newAddedLeadValue]);

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
                  onClick={() => {
                    setStoreStatus(!storeStatus);
                    setstoreNameValue({
                      ...storeNameValue,
                      isSelect: !storeNameValue.isSelect,
                    });

                    selectHandler({
                      ...storeNameValue,
                      isSelect: !storeStatus,
                    });
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
                      className="focus:outline-none w-full shadow-md p-1"
                      value={storeNameValue.value}
                      onChange={(e) =>
                        setstoreNameValue({
                          ...storeNameValue,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Current Status */}
            <div>
              <div
                className="flex justify-between items-center p-2 cursor-pointer border border-gray-100"
                onClick={() => {
                  setCurrentStatus(!currentStatus);

                  setCurrentStatusValue({
                    ...currentStatusValue,
                    isSelect: !currentStatusValue.isSelect,
                  });

                  selectHandler({
                    ...currentStatusValue,
                    isSelect: !currentStatus,
                  });
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
                    name="colors"
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
                onClick={() => {
                  setAreaStatus(!areaStatus);

                  setAreaValue({
                    ...areaValue,
                    isSelect: !areaValue.isSelect,
                  });

                  selectHandler({
                    ...areaValue,
                    isSelect: !areaStatus,
                  });
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
                  onClick={() => {
                    setReferralStatus(!referralStatus);

                    setReferralStatusValue({
                      ...referralStatusValue,
                      isSelect: !referralStatusValue.isSelect,
                    });

                    selectHandler({
                      ...referralStatusValue,
                      isSelect: !referralStatus,
                    });
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
                      onChange={(e) =>
                        setReferralStatusValue({
                          ...referralStatusValue,
                          value: e.target.value,
                        })
                      }
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
                  onClick={() => {
                    setZipCodeStatus(!zipCodeStatus);

                    setZipCodeValue({
                      ...zipCodeValue,
                      isSelect: !zipCodeValue.isSelect,
                    });

                    selectHandler({
                      ...zipCodeValue,
                      isSelect: !zipCodeStatus,
                    });
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
                      className="focus:outline-none w-full shadow-md p-1"
                      value={zipCodeValue.value}
                      onChange={(e) =>
                        setZipCodeValue({
                          ...zipCodeValue,
                          value: e.target.value,
                        })
                      }
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
                  onClick={() => {
                    setNewAddedLeadStatus(!newAddedLeadStatus);

                    setNewAddedLeadValue({
                      ...newAddedLeadValue,
                      isSelect: !zipCodeValue.isSelect,
                    });

                    selectHandler({
                      ...newAddedLeadValue,
                      isSelect: !newAddedLeadStatus,
                    });
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
                      Enter New Added Lead
                    </p>
                    <input
                      type="text"
                      className="focus:outline-none w-full shadow-md p-1"
                      value={newAddedLeadValue.value}
                      onChange={(e) =>
                        setNewAddedLeadValue({
                          ...newAddedLeadValue,
                          value: e.target.value,
                        })
                      }
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
