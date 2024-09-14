import type { ReturnItemButton } from "../Types";

function ReturnItemButton({ onClick }: ReturnItemButton) {
  return (
    <button className="btn btn-sm btn-secondary me-2" onClick={onClick}>
      Return Item
    </button>
  );
}

export default ReturnItemButton;
