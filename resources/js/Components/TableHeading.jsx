import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const TableHeading = ({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  children,
  sortChanged = () => {},
}) => {
  return (
    <th onClick={(e) => sortChanged(name)} className="p-3">
      <div
        className={`flex justify-between items-center gap-3 ${
          sortable ? "cursor-pointer" : ""
        }`}
      >
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={`w-4 ${
                sort_direction === "asc" && sort_field === name
                  ? "text-white"
                  : ""
              }`}
            />
            <ChevronDownIcon
              className={`w-4 ${
                sort_direction === "desc" && sort_field === name
                  ? "text-white"
                  : ""
              }`}
            />
          </div>
        )}
      </div>
    </th>
  );
};

export default TableHeading;
