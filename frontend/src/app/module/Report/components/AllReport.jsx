import React from "react";
import { RiDownloadLine } from "react-icons/ri";
import Button from "../../../utils/Button";
import moment from "moment/moment";

const AllReport = ({ data, onDownloadReport }) => {
  //   console.log(data);

  return (
    <section className="bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.05)] rounded-xl p-5 flex flex-col gap-y-7">
      <header className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-medium">
          Recent Report
        </h3>

        {data && data.length > 0 && (
          <Button
            text="Download"
            onClick={onDownloadReport}
            icon={RiDownloadLine}
          />
        )}
      </header>

      <div className="overflow-x-auto">
        {data && data.length > 0 ? (
          <table className="min-w-full table-auto whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-slate-900/5">
                <th className="text-left pe-7 py-2.5 font-medium text-slate-900">
                  No.
                </th>
                <th className="text-left px-7 py-2.5 font-medium text-slate-900">
                  Type
                </th>
                <th className="text-left px-7 py-2.5 font-medium text-slate-900">
                  Category
                </th>
                <th className="text-left px-7 py-2.5 font-medium text-slate-900">
                  Date
                </th>
                <th className="text-left px-7 py-2.5 font-medium text-slate-900">
                  Amount
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
                    {item.type}
                  </td>
                  <td className="px-7 text-sm py-2.5 text-slate-900/70">
                    {item.category}
                  </td>
                  <td className="px-7 text-sm py-2.5 text-slate-900/70">
                    {item.date ? moment(item.date).format("YYYY-MM-DD") : ""}
                  </td>
                  <td className="px-7 text-sm py-2.5 text-slate-900/70">
                    ${item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-80 text-gray-500 w-full flex items-center text-center justify-center">
            No data available
          </div>
        )}
      </div>
    </section>
  );
};

export default AllReport;
