import React from "react";
import Sidebar from "./components/Sidebar";
import LeadsTable from "./components/LeadsTable";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />

      <LeadsTable />
    </div>
  );
};

export default App;
