import React, { useState } from "react";
import { RiDeleteBin7Line, RiEditLine, RiEyeLine } from "react-icons/ri";
import moment from "moment/moment";
import Button from "../../utils/Button";
import CountUp from "react-countup";

const TableContainer = ({ data, onDelete, onEdit, onView, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const formattedDate = (date) => moment(date).format("Do MMM YYYY");

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="hidden md:block overflow-x-auto">
      {data && data.length > 0 ? (
        <>
          <table className="min-w-full table-auto whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-slate-900/5">
                <th className="text-left pe-7 py-2.5 font-medium text-slate-900">
                  No.
                </th>
                <th className="text-left px-7 py-2.5 font-medium text-slate-900">
                  Category
                </th>
                <th className="text-left px-7 py-2.5 font-medium text-slate-900">
                  Date
                </th>
                <th className="text-center px-7 py-2.5 font-medium text-slate-900">
                  Amount
                </th>
                <th className="text-right px-7 pe-0 py-2.5 font-medium text-slate-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item._id || index}>
                  <td className="pe-7 text-sm py-2.5 text-slate-900/70">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-7 capitalize text-sm py-2.5 text-slate-900/70">
                    {item.category}
                  </td>
                  <td className="px-7 text-sm py-2.5 text-slate-900/70">
                    {formattedDate(item.date)}
                  </td>
                  <td
                    className={`px-7 text-center text-sm py-2.5 ${
                      type === "income" ? "text-green-600" : "text-rose-600"
                    }`}
                  >
                    {type === "income" ? "+" : "-"}
                    <CountUp
                      start={0}
                      end={parseFloat(item.amount)}
                      duration={1.5}
                      decimals={2}
                      separator=","
                    />
                    $
                  </td>
                  <td className="px-7 pe-0 py-2.5 flex items-center justify-end">
                    <Button
                      icon={RiEyeLine}
                      type="view"
                      onClick={() => onView(item)}
                    />
                    <Button
                      icon={RiEditLine}
                      type="edit"
                      onClick={() => onEdit(item)}
                    />
                    <Button
                      icon={RiDeleteBin7Line}
                      type="delete"
                      onClick={() => onDelete(item?._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 px-4 text-sm text-gray-600">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border cursor-pointer p-2 px-3 md:p-2.5 md:px-3.5 rounded-md${
                  currentPage === 1
                    ? "text-gray-400 text-purple-200"
                    : "text-black bg-purple-600/4 text-purple-600 hover:text-white transition-all duration-300 hover:bg-purple-600"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border cursor-pointer p-2 px-3 md:p-2.5 md:px-3.5 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 text-purple-200 "
                    : "text-black bg-purple-600/4 text-purple-600 hover:text-white transition-all duration-300 hover:bg-purple-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="h-80 text-gray-500 w-full flex items-center text-center justify-center">
          No data available
        </div>
      )}
    </div>
  );
};

export default TableContainer;
