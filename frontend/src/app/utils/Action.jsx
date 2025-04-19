import React from "react";
import Button from "./Button";

const Action = ({
  submitText = "Yes",
  cancelText = "Cancel",
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="flex mt-5 gap-x-2.5 justify-end items-center">
      <Button text={cancelText} style="gray" onClick={onCancel} />
      <Button text={submitText} style="first" onClick={onSubmit} />
    </div>
  );
};

export default Action;
