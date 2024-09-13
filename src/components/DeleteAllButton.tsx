import type { DeleteAllButton } from "./Types";

function DeleteAllButton({ onDeleteAll }: DeleteAllButton) {
  return (
    <button className="btn btn-sm btn-danger ms-2" onClick={onDeleteAll}>
      Delete All
    </button>
  );
}

export default DeleteAllButton;
