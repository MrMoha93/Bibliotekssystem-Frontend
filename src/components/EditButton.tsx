import type { EditButton } from "./Types";

function EditButton({ onEdit }: EditButton) {
  return (
    <button className="btn btn-sm btn-secondary" onClick={onEdit}>
      Edit
    </button>
  );
}

export default EditButton;
