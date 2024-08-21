import { useState, useEffect } from "react";
import { Category, Item } from "./Types";
import CreateItemButton from "./CreateItemButton";
import DeleteItemButton from "./DeleteItemButton";

function CreateItems({
  categories,
  items,
  onAddItem,
  onDeleteItem,
}: {
  categories: Category[];
  items: Item[];
  onAddItem: (item: Item) => void;
  onDeleteItem: (id: string) => void;
}) {
  const [newItem, setNewItem] = useState<Item>({
    id: "",
    title: "",
    type: "",
    author: "",
    category: categories.length > 0 ? categories[0].name : "",
  });

  useEffect(() => {
    if (categories.length > 0) {
      setNewItem((prevItem: Item) => ({
        ...prevItem,
        category: categories[0]?.name || "",
      }));
    }
  }, [categories]);

  const handleCreateItem = () => {
    if (newItem.title && newItem.type && newItem.category) {
      const newItemWithId = {
        ...newItem,
        id: String(new Date().getTime()), // Generera ett unikt ID baserat på tid
      };

      onAddItem(newItemWithId);

      setNewItem({
        id: "",
        title: "",
        type: "",
        author: "",
        category: categories.length > 0 ? categories[0].name : "",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Items</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter item title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <select
          className="form-select mt-2"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
        >
          <option value="">Select type</option>
          <option value="Book">Book</option>
          <option value="Reference Book">Reference Book</option>
          <option value="DVD">DVD</option>
          <option value="Audio Book">Audio Book</option>
        </select>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter author name (optional)"
          value={newItem.author}
          onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
        />
        <select
          className="form-select mt-2"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <CreateItemButton onClick={handleCreateItem} />

      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.title} ({item.type}) - {item.category}
            <DeleteItemButton onDelete={() => onDeleteItem(item.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateItems;
