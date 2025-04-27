import React from "react";
import CardInfo from "./CardInfo";

const CardContainer = ({ data, onDelete, onEdit, type, onView }) => {
  return (
    <>
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
    </>
  );
};

export default CardContainer;
