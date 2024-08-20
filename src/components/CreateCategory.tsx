import { useState } from "react";
import EditButton from "./EditButton";
import DeleteCategoryButton from "./DeleteCategoryButton";
import DeleteAllButton from "./DeleteAllButton";
import { Category } from "./Types";

function CreateCategory({
  categories,
  onAddCategory,
  onDeleteCategory,
  onDeleteAllCategories,
  onEditCategory,
}: {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
  onDeleteAllCategories: () => void;
  onEditCategory?: (id: string, newName: string) => void; // Gör denna valfri
}) {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const handleCreateCategory = () => {
    if (
      newCategory &&
      !categories.find(
        (category) => category.name.toLowerCase() === newCategory.toLowerCase()
      )
    ) {
      const newCat: Category = {
        id: String(new Date().getTime()), // Använd ett unikt ID baserat på tid
        name: newCategory,
      };
      onAddCategory(newCat);
      setNewCategory("");
    }
  };

  const startEditing = (id: string, name: string) => {
    setEditingCategoryId(id);
    setEditingCategoryName(name);
  };

  const handleSaveEdit = () => {
    if (editingCategoryId && editingCategoryName) {
      onEditCategory?.(editingCategoryId, editingCategoryName); // Använd valfri anrop
      setEditingCategoryId(null);
      setEditingCategoryName("");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Categories</h2>
      <div className="mb-3">
        <label htmlFor="newCategory" className="form-label">
          Create New Category
        </label>
        <input
          type="text"
          className="form-control"
          id="newCategory"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
        />
      </div>
      <div className="d-flex mb-3">
        <button className="btn btn-primary" onClick={handleCreateCategory}>
          Create Category
        </button>
        {categories.length > 0 && (
          <DeleteAllButton onDeleteAll={onDeleteAllCategories} />
        )}
      </div>

      <ul className="list-group">
        {categories.map((category) => (
          <li
            key={category.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editingCategoryId === category.id ? (
              <>
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-success ms-2"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {category.name}
                <div>
                  <EditButton
                    onEdit={() => startEditing(category.id, category.name)}
                  />
                  <DeleteCategoryButton
                    onDelete={() => onDeleteCategory(category.id)}
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateCategory;
