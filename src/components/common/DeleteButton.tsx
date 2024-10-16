import type { DeleteButton } from "../Types";

function DeleteButton({ onDelete }: DeleteButton) {
  return (
    <button className="btn btn-sm btn-danger" onClick={onDelete}>
      Delete
    </button>
  );
}

export default DeleteButton;
