import { useState, useEffect } from "react";
import axios from "axios";
import CreateCategory from "./CreateCategory";
import CreateItems from "./CreateItems";
import { Category, Item } from "./Types";
import { BASE_URL } from "./constants";

const CATEGORIES_API_URL = `${BASE_URL}/api/categories`;
const ITEMS_API_URL = `${BASE_URL}/api/items`;

function MainView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchCategoriesAndItems = async () => {
      try {
        const [categoriesResponse, itemsResponse] = await Promise.all([
          axios.get<Category[]>(CATEGORIES_API_URL),
          axios.get<Item[]>(ITEMS_API_URL),
        ]);

        setCategories(categoriesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoriesAndItems();
  }, []);

  const handleAddCategory = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`${CATEGORIES_API_URL}/${id}`);
      setItems(items.filter((item) => item.categoryId !== id));
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategory = (id: string, newName: string) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name: newName } : category
      )
    );
  };

  const handleAddItem = async (newItem: Item) => {
    setItems([...items, newItem]);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await axios.delete(`${ITEMS_API_URL}/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdateItem = async (updatedItem: Item) => {
    try {
      const response = await axios.put(
        `${ITEMS_API_URL}/${updatedItem.id}`,
        updatedItem
      );
      setItems(
        items.map((item) => (item.id === updatedItem.id ? response.data : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <CreateCategory
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onEditCategory={handleEditCategory}
          />
        </div>
        <div className="col-md-6">
          <CreateItems
            categories={categories}
            items={items}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onUpdateItem={handleUpdateItem}
          />
        </div>
      </div>
    </div>
  );
}

export default MainView;
