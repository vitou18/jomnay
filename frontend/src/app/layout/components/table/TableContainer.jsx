import React from "react";
import { RiDeleteBin7Line, RiEditLine, RiEyeLine } from "react-icons/ri";
import moment from "moment/moment";
import Button from "../../../utils/Button";

const TableContainer = ({ data, onDelete, onEdit, onView }) => {
  const formattedDate = (date) => moment(date).format("Do MMM YYYY");

  return (
    <div className="hidden md:block overflow-x-auto">
      {data && data.length > 0 ? (
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
            {data?.map((item, index) => (
              <tr key={item._id || index}>
                <td className="pe-7 text-sm py-2.5 text-slate-900/70">
                  {index + 1}
                </td>
                <td className="px-7 capitalize text-sm py-2.5 text-slate-900/70">
                  {item.category}
                </td>
                <td className="px-7 text-sm py-2.5 text-slate-900/70">
                  {formattedDate(item.date)}
                </td>
                <td className="px-7 text-center text-sm py-2.5 text-slate-900/70">
                  ${item.amount.toFixed(2)}
                </td>
                <td className="px-7 pe-0 py-2.5 flex items-center justify-end">
                  <Button
                    icon={RiEyeLine}
                    type="edit"
                    onClick={() => onView(item)}
                  />
                  <Button
                    icon={RiEditLine}
                    type="edit"
                    onClick={() => onEdit(item)}
                  />
                  <Button
                    onClick={() => onDelete(item?._id)}
                    icon={RiDeleteBin7Line}
                    type="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="h-32 text-gray-500 w-full flex items-center text-center justify-center">
          No data available
        </div>
      )}
    </div>
  );
};

export default TableContainer;
