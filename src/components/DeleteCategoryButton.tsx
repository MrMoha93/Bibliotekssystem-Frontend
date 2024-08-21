import type { DeleteCategoryButton } from "./Types";

function DeleteCategoryButton({ onDelete }: DeleteCategoryButton) {
  return (
    <button className="btn btn-sm btn-danger" onClick={onDelete}>
      Delete
    </button>
  );
}

export default DeleteCategoryButton;
