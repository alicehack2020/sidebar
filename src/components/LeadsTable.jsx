import React, { useEffect, useState } from "react";
import logo from "../assets/react.svg";
import { states } from "../data";

const commonFilterData = [
  { key: "currentStatus", value: "converted", common: false },
  { key: "paymentStatus", value: "single", common: false },
  { key: "assignedTo", value: "1", common: false },
  { key: "documentStatus", value: "pending", common: false },
  { key: "interactionStatus", value: "pending", common: false },
];

const otherFilterData = [
  { key: "storeName", value: "" },
  { key: "status", value: "" },
  { key: "", value: "" },
  { key: "", value: "" },
];

const LeadsTable = () => {
  // manage all states here

  const [filterStatus, setFilterStatus] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState([]);
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
    other: true,
  });
  const [currentStatusValue, setCurrentStatusValue] = useState({
    key: "status",
    value: "",
    other: true,
  });
  const [areaValue, setAreaValue] = useState({ key: "storeName", value: "" });

  const [referralStatusValue, setReferralStatusValue] = useState({
    key: "referal",
    value: "",
    other: true,
  });
  const [zipCodeValue, setZipCodeValue] = useState({
    key: "zipcode",
    value: "",
    other: true,
  });
  const [newAddedLeadValue, setNewAddedLeadValue] = useState({
    key: "newlead",
    value: "",
    other: true,
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
      setSelectedFilter((prev) => [...prev, item]);
      setCommonFilter(
        commonFilter.map((filter) =>
          filter.key == item.key ? { ...filter, common: true } : filter
        )
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
          filter.key == item.key ? { ...filter, common: false } : filter
        )
      );
    }
  };

  const filterStatusHandler = () => {
    setFilterStatus(!filterStatus);
  };

  // currentStatusValue
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
    <div className="w-11/12 p-4 my-5 absolute left-20 h-screen flex gap-2">
      {/* filter code */}
      {filterStatus && (
        <div className="w-1/4 shadow-md h-screen">
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
                  {item.other ? (
                    <div
                      className={
                        item?.value
                          ? "text-white bg-blue-400 rounded-md text-xs flex justify-between space-x-1 py-1.5 px-2 hover:cursor-pointer  flex-wrap"
                          : "hidden"
                      }
                      onClick={() => removeHandler(item)}
                    >
                      <p className="break-words overflow-hidden">
                        {item?.value}
                      </p>
                      <p>x</p>
                    </div>
                  ) : (
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
                <div className="flex justify-between items-center p-2 cursor-pointer border border-gray-100">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={storeStatus}
                      onChange={(e) =>
                        setStoreStatus(e.target.checked ? true : false)
                      }
                    />
                    <span className="font-medium text-gray-600">
                      Store Name
                    </span>
                  </div>
                  <div onClick={() => setStoreStatus(!storeStatus)}>
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
              <div className="flex justify-between items-center p-2 cursor-pointer border border-gray-100">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={currentStatus}
                    onChange={(e) =>
                      setCurrentStatus(e.target.checked ? true : false)
                    }
                  />
                  <span className="font-medium text-gray-600">
                    Current Status
                  </span>
                </div>
                <div onClick={() => setCurrentStatus(!currentStatus)}>
                  <img src={logo} className="h-4" alt="" />
                </div>
              </div>

              {currentStatus && (
                <div className=" bg-gray-200 p-4 space-y-2">
                  <p className="text-xs text-gray-500">select Current Status</p>
                  <select
                    onChange={(e) =>
                      setCurrentStatusValue({
                        ...currentStatusValue,
                        value: e.target.value,
                      })
                    }
                    className="text-gray-600 text-sm w-full shadow-md outline-none"
                  >
                    <option value="">Select......</option>
                    <option value="one">one</option>
                    <option value="two">two</option>
                    <option value="three">three</option>
                    <option value="four">four</option>
                  </select>
                </div>
              )}
            </div>

            {/* Area */}
            <div>
              <div className="flex justify-between items-center p-2 cursor-pointer border border-gray-100">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={areaStatus}
                    onChange={(e) =>
                      setAreaStatus(e.target.checked ? true : false)
                    }
                  />
                  <span className="font-medium text-gray-600">Area</span>
                </div>
                <div onClick={() => setAreaStatus(!areaStatus)}>
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
                <div className="flex justify-between items-center p-2 cursor-pointer border border-gray-100">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={referralStatus}
                      onChange={(e) =>
                        setReferralStatus(e.target.checked ? true : false)
                      }
                    />
                    <span className="font-medium text-gray-600">
                      Referral Status
                    </span>
                  </div>
                  <div onClick={() => setReferralStatus(!referralStatus)}>
                    <img src={logo} className="h-4" alt="" />
                  </div>
                </div>

                {referralStatus && (
                  <div className="w-full bg-gray-200  space-y-2 p-3">
                    <p className="text-xs text-gray-500">
                      Enter Referral Status
                    </p>
                    <input
                      type="text"
                      className="focus:outline-none w-full shadow-md p-1"
                      value={referralStatusValue.value}
                      onChange={(e) =>
                        setReferralStatusValue({
                          ...referralStatusValue,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Zip Code */}
            <div>
              <div>
                <div className="flex justify-between items-center p-2 cursor-pointer border border-gray-100">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={zipCodeStatus}
                      onChange={(e) =>
                        setZipCodeStatus(e.target.checked ? true : false)
                      }
                    />
                    <span className="font-medium text-gray-600">Zip Code</span>
                  </div>
                  <div onClick={() => setZipCodeStatus(!zipCodeStatus)}>
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
                <div className="flex justify-between items-center p-2 cursor-pointer border border-gray-100">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={newAddedLeadStatus}
                      onChange={(e) =>
                        setNewAddedLeadStatus(e.target.checked ? true : false)
                      }
                    />
                    <span className="font-medium text-gray-600">
                      New Added Lead
                    </span>
                  </div>
                  <div
                    onClick={() => setNewAddedLeadStatus(!newAddedLeadStatus)}
                  >
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