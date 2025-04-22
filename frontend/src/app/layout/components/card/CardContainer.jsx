import React from "react";
import CardInfo from "./CardInfo";

const CardContainer = ({ data, onDelete, onEdit, type, onView }) => {
  return (
    <>
      {data && data.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:hidden gap-y-5 gap-x-8">
          {data.map((item) => (
            <CardInfo
              type={type}
              key={item._id}
              data={item}
              onEdit={onEdit}
              onView={onView}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="h-32 text-gray-500 w-full md:hidden flex items-center text-center justify-center">
          No data available
        </div>
      )}
    </>
  );
};

export default CardContainer;
