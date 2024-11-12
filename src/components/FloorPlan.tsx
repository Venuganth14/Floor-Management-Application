import React from "react";
import TableComponent from "./DragDrop";
import Statistics from "./Statistics";
import TableDetails from "./TableDetails";

const FloorPlan: React.FC = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap lg:space-x-8 p-6">
      <div className="w-full lg:w-1/4">
        <TableDetails />
      </div>
      <div className="w-full lg:w-3/4">
        <TableComponent />
        <br />
        <Statistics />
      </div>
    </div>
  );
};

export default FloorPlan;
