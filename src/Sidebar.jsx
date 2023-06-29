import React, { useState } from "react";
import logo from "./assets/react.svg";
const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const items = [
    {
      id: 1,
      image: logo,
      text: "Home",
      sub: false,
    },
    {
      id: 2,
      image: logo,
      text: "Leads",
      sub: false,
    },
    {
      id: 3,
      image: logo,
      text: "Users",
      sub: false,
    },
    {
      id: 4,
      image: logo,
      text: "Plan",
      sub: false,
    },
    {
      id: 5,
      image: logo,
      text: "Reports",
      sub: false,
    },
    {
      id: 6,
      image: logo,
      text: "Reminders",
      sub: false,
    },
    {
      id: 7,
      image: logo,
      text: "Interactions",
      sub: false,
    },
    {
      id: 8,
      image: logo,
      text: "Lead Changes",
      sub: false,
    },
    {
      id: 9,
      image: logo,
      text: "Payments",
      sub: false,
    },
    {
      id: 10,
      image: logo,
      text: "Payments",
      sub: false,
    },
  ];

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <div className="border border-gray-200 w-fit h-screen shadow-md ">
      {expanded ? (
        <div className="py-4 ">
          <div className="flex justify-center px-4">
            <h1 className="text-2xl font-bold text-gray-600">OCM LEAD APP</h1>
          </div>
          <div className="flex justify-end  ">
            <div
              className=" bg-white shadow-lg w-fit border border-gray-200 p-1 my-2 cursor-pointer"
              onClick={() => setExpanded(false)}
            >
              <img src={logo} className="h-5" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4">
          <div className="flex justify-center ">
            <img src={logo} />
          </div>
          <div className="flex justify-end  ">
            <div
              className=" bg-white shadow-lg w-fit border border-gray-200 p-1 my-2 cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              <img src={logo} className="h-5" />
            </div>
          </div>
        </div>
      )}

      <div className="p-2  border-t-2 border-gray-100">
        {items.map((item) => (
          <div className="flex justify-between items-center hover:bg-blue-50 rounded-lg text-gray-600">
            <div
              key={item.id}
              className="flex items-center p-2 gap-2  hover:text-blue-500 text-xs  font-medium hover:font-bold   cursor-pointer"
              onMouseEnter={() => handleMouseEnter()}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={item.image}
                alt={item.text}
                className="w-8 object-cover cursor-pointer"
              />
              {expanded && <p>{item.text}</p>}
            </div>
            {item.sub && expanded ? (
              <div>
                <img src={logo} alt="" className="h-5 " />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
