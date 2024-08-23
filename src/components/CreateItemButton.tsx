import React from "react";

interface CreateItemButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

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
