import { useState } from "react";
import CreateCategory from "./components/CreateCategory";
import CreateItems from "./components/CreateItems";
import { Category, Item } from "./components/Types";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const handleAddCategory = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
    setItems(items.filter((item) => item.category !== id));
  };

  const handleDeleteAllCategories = () => {
    setCategories([]);
    setItems([]); // Töm alla items när kategorierna tas bort
  };

  const handleEditCategory = (id: string, newName: string) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name: newName } : category
      )
    );
  };

  const handleAddItem = (newItem: Item) => {
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <CreateCategory
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onDeleteAllCategories={handleDeleteAllCategories}
            onEditCategory={handleEditCategory}
          />
        </div>
        <div className="col-md-6">
          <CreateItems
            categories={categories}
            items={items}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
