import type { DeleteItemButton } from "../Types";

function DeleteItemButton({ onDelete }: DeleteItemButton) {
  return (
    <button className="btn btn-sm btn-danger" onClick={onDelete}>
      Delete
    </button>
  );
}

export default DeleteItemButton;
