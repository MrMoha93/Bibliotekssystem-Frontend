import React from "react";
import type { CreateItemButtonProps } from "../components/Types";

const CreateItemButton: React.FC<CreateItemButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default CreateItemButton;
