import React, { useState } from "react";

import logo from "../assets/logoOcmHindi.png";
import home from "../assets/home.png";
import leads from "../assets/leads.png";
import assingleads from "../assets/assignLeads.png";
import users from "../assets/users.png";
import plans from "../assets/plan.png";
import reports from "../assets/reports.png";
import reminders from "../assets/reminders.png";
import interactions from "../assets/interactions.png";
import leadsChanges from "../assets/leadChanges.png";
import payments from "../assets/payments.png";
import left from "../assets/left.png"
import right from "../assets/right.png"
import filter from "../assets/filter.jpg"

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const items = [
    {
      id: 1,
      image: home,
      text: "Home",
      sub: false,
    },
    {
      id: 2,
      image: leads,
      text: "Leads",
      sub: false,
    },
    {
      id: 3,
      image: assingleads,
      text: "Users",
      sub: false,
    },
    {
      id: 4,
      image: users,
      text: "Users",
      sub: false,
    },
    {
      id: 5,
      image: plans,
      text: "Plan",
      sub: false,
    },
    {
      id: 6,
      image: reports,
      text: "Reports",
      sub: false,
    },
    {
      id: 7,
      image: reminders,
      text: "Reminders",
      sub: false,
    },
    {
      id: 8,
      image: interactions,
      text: "Interactions",
      sub: false,
    },
    {
      id: 9,
      image: leadsChanges,
      text: "Lead Changes",
      sub: false,
    },
    {
      id: 10,
      image: payments,
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
    <div
      className={
        "border border-gray-200 shadow-md z-10 relative bg-white w-fit"
      }
    >
      {expanded ? (
        <div className="py-4 ">
          <div className="flex justify-center px-4">
            <h1 className="text-2xl font-bold text-gray-500">OCM LEAD APP</h1>
          </div>
          <div className="flex justify-end ">
            <div
              className="  shadow-lg w-fit my-2 cursor-pointer z-10 relative"
              onClick={() => setExpanded(false)}
            >
              <img src={right} className="h-5" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4">
          <div className="flex justify-center h-14 ">
            <img src={logo} />
          </div>
          <div className="flex justify-end  ">
            <div
              className=" shadow-lg w-fit  my-2 cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              <img src={left} className="h-5" />
            </div>
          </div>
        </div>
      )}

      <div
        className="p-2  border-t-2 border-gray-100 h-screen"
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item) => (
          <div className="flex justify-between  items-center my-2 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-blue-500  cursor-pointer">
            <div
              key={item.id}
              className="flex items-center p-2 space-x-4 text-sm  font-medium  cursor-pointer hover:font-semibold"
            >
              <img
                src={item.image}
                alt={item.text}
                className="w-5 object-cover cursor-pointer"
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
