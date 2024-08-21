import type { CreateItemButton } from "./Types";

function CreateItemButton({ onClick }: CreateItemButton) {
  return (
    <button className="btn btn-primary mb-3" onClick={onClick}>
      Create Item
    </button>
  );
}

export default CreateItemButton;
