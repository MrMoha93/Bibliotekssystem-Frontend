import { useState } from "react";
import axios from "axios";
import EditButton from "./EditButton";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { CreateCategoryProps } from "./Types";

const API_URL = "http://localhost:5588/api/categories";

function CreateCategory({
  categories,
  onAddCategory,
  onDeleteCategory,
  onEditCategory,
}: CreateCategoryProps) {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setNewCategory("");
    setError(null);
  };

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    const isDuplicate = categories.some(
      (category) => category.name.toLowerCase() === newCategory.toLowerCase()
    );
    if (isDuplicate) {
      setError("A category with this name already exists.");
      return;
    }

    try {
      const response = await axios.post(API_URL, { name: newCategory });
      onAddCategory(response.data);
      resetForm();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError("A category with this name already exists.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategoryId || !editingCategoryName.trim()) return;

    try {
      await axios.put(`${API_URL}/${editingCategoryId}`, {
        name: editingCategoryName,
      });
      onEditCategory?.(editingCategoryId, editingCategoryName);
      setEditingCategoryId(null);
      setEditingCategoryName("");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const startEditing = (id: string, name: string) => {
    setEditingCategoryId(id);
    setEditingCategoryName(name);
  };

  return (
    <div className="container mt-5">
      <h2>Categories</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="newCategory" className="form-label">
          Create New Category
        </label>
        <input
          type="text"
          className="form-control"
          id="newCategory"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
            setError(null);
          }}
          placeholder="Enter category name"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleCreateCategory}>
        Create Category
      </button>

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
                  onClick={handleEditCategory}
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
