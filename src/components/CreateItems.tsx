import { useState, useEffect } from "react";
import axios from "axios";
import { Category, Item } from "./Types";
import CreateItemButton from "./common/CreateItemButton";
import DeleteItemButton from "./common/DeleteItemButton";
import LoanItemButton from "./common/LoanItemButton";
import ReturnItemButton from "./common/ReturnItemButton";
import LoanItemModal from "./common/LoanItemModal";
import { BASE_URL } from "./constants";

const ITEMS_API_URL = `${BASE_URL}/api/items`;

const ITEM_TYPES = {
  BOOK: "BOOK",
  REFERENCE_BOOK: "REFERENCE_BOOK",
  DVD: "DVD",
  AUDIO_BOOK: "AUDIO_BOOK",
};

function CreateItems({
  categories,
  items,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
}: {
  categories: Category[];
  items: Item[];
  onAddItem: (item: Item) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: Item) => void;
}) {
  const [newItem, setNewItem] = useState<Item>({
    id: "",
    title: "",
    type: "",
    author: "",
    nbrPages: 0,
    runTimeMinutes: 0,
    isBorrowable: false,
    borrower: "",
    borrowDate: "",
    categoryId: categories.length > 0 ? categories[0].id : "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sortBy, setSortBy] = useState<string>(
    sessionStorage.getItem("sortBy") || "category"
  );

  useEffect(() => {
    if (categories.length > 0) {
      setNewItem((prevItem: Item) => ({
        ...prevItem,
        categoryId: categories[0]?.id || "",
      }));
    }
  }, [categories]);

  const handleLoanClick = (item: Item) => {
    setSelectedItem(item);
    setShowLoanModal(true);
  };

  const handleSaveLoan = async (borrower: string, expireDate: string) => {
    if (selectedItem) {
      const updatedItem = {
        ...selectedItem,
        isBorrowable: true,
        borrower,
        borrowDate: new Date(expireDate).toISOString(),
      };

      await onUpdateItem(updatedItem);
      setSelectedItem(null);
    }
  };

  const handleEditItem = (item: Item) => {
    setIsEditing(true);
    setNewItem({
      id: item.id,
      title: item.title,
      type: item.type,
      author: item.author,
      nbrPages: item.nbrPages,
      runTimeMinutes: item.runTimeMinutes,
      isBorrowable: item.isBorrowable,
      borrower: item.borrower || "",
      borrowDate: item.borrowDate ? item.borrowDate.split("T")[0] : "",
      categoryId: item.categoryId,
    });
  };

  const handleCreateOrUpdateItem = async () => {
    if (!newItem.title || !newItem.author) {
      setErrorMessage("Title and author are required.");
      return;
    }

    if (
      (newItem.type === ITEM_TYPES.BOOK ||
        newItem.type === ITEM_TYPES.REFERENCE_BOOK) &&
      (!newItem.nbrPages || newItem.nbrPages <= 0)
    ) {
      setErrorMessage(
        "Number of pages is required for books and reference books."
      );
      return;
    }

    if (
      (newItem.type === ITEM_TYPES.DVD ||
        newItem.type === ITEM_TYPES.AUDIO_BOOK) &&
      (!newItem.runTimeMinutes || newItem.runTimeMinutes <= 0)
    ) {
      setErrorMessage(
        "Run time in minutes is required for DVDs and audio books."
      );
      return;
    }

    if (newItem.type === ITEM_TYPES.REFERENCE_BOOK && newItem.isBorrowable) {
      setErrorMessage("Reference books cannot be borrowable.");
      return;
    }

    if (newItem.type === ITEM_TYPES.DVD && !newItem.author) {
      setErrorMessage("DVDs must have an author.");
      return;
    }

    if (newItem.type === ITEM_TYPES.AUDIO_BOOK && !newItem.author) {
      setErrorMessage("Audio Books must be borrowable.");
      return;
    }

    if (newItem.type === ITEM_TYPES.REFERENCE_BOOK && !newItem.author) {
      setErrorMessage(
        "Reference Books must have an author and cannot be borrowable."
      );
      return;
    }

    if (newItem.isBorrowable && (!newItem.borrowDate || !newItem.borrower)) {
      setErrorMessage("Borrowable items must have a borrower and an end date.");
      return;
    }

    if (newItem.title && newItem.type && newItem.categoryId) {
      try {
        if (isEditing) {
          await onUpdateItem(newItem);
          setIsEditing(false);
        } else {
          const itemToSend = {
            ...newItem,
            borrowDate: newItem.borrowDate
              ? new Date(newItem.borrowDate).toISOString()
              : null,
          };

          const response = await axios.post(ITEMS_API_URL, itemToSend);
          const createdItem: Item = response.data;

          onAddItem(createdItem);
        }

        setNewItem({
          id: "",
          title: "",
          type: "",
          author: "",
          nbrPages: 0,
          runTimeMinutes: 0,
          isBorrowable: false,
          borrower: "",
          borrowDate: "",
          categoryId: categories.length > 0 ? categories[0].id : "",
        });

        setErrorMessage(null);
      } catch (error) {
        console.error("Error creating or updating item:", error);
        setErrorMessage("Failed to create or update item. Please try again.");
      }
    }
  };

  const handleNbrPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNewItem({
      ...newItem,
      nbrPages: isNaN(value) ? 0 : value,
    });
  };

  const handleRunTimeMinutesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    setNewItem({
      ...newItem,
      runTimeMinutes: isNaN(value) ? 0 : value,
    });
  };

  const getInitials = (title: string) => {
    return title
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);
    localStorage.setItem("sortBy", selectedSortBy);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return `${formattedDate}T23:59`;
  };

  const sortedItems = items.sort((a, b) => {
    if (sortBy === "category") {
      return getCategoryName(a.categoryId).localeCompare(
        getCategoryName(b.categoryId)
      );
    } else {
      return (a.type || "").localeCompare(b.type || "");
    }
  });

  return (
    <div className="container mt-5">
      <h2>{isEditing ? "Edit Item" : "Create Items"}</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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
          <option value={ITEM_TYPES.BOOK}>Book</option>
          <option value={ITEM_TYPES.REFERENCE_BOOK}>Reference Book</option>
          <option value={ITEM_TYPES.DVD}>DVD</option>
          <option value={ITEM_TYPES.AUDIO_BOOK}>Audio Book</option>
        </select>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter author name (required)"
          value={newItem.author || ""}
          onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
        />
        {newItem.type === ITEM_TYPES.BOOK ||
        newItem.type === ITEM_TYPES.REFERENCE_BOOK ? (
          <input
            type="number"
            className="form-control mt-2"
            placeholder="Enter number of pages (required for books)"
            value={newItem.nbrPages || ""}
            onChange={handleNbrPagesChange}
          />
        ) : (
          <input
            type="number"
            className="form-control mt-2"
            placeholder="Enter run time in minutes (required for DVDs and audio books)"
            value={newItem.runTimeMinutes || ""}
            onChange={handleRunTimeMinutesChange}
          />
        )}
        <select
          className="form-select mt-2"
          value={newItem.categoryId}
          onChange={(e) =>
            setNewItem({ ...newItem, categoryId: e.target.value })
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label
          className={`form-check-label mt-2 ${
            newItem.type === ITEM_TYPES.REFERENCE_BOOK ? "text-muted" : ""
          }`}
        >
          <input
            type="checkbox"
            className="form-check-input"
            checked={newItem.isBorrowable}
            disabled={newItem.type === ITEM_TYPES.REFERENCE_BOOK}
            onChange={(e) =>
              setNewItem({ ...newItem, isBorrowable: e.target.checked })
            }
          />
          Is Borrowable
        </label>
        {newItem.isBorrowable && (
          <>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter borrower's name"
              value={newItem.borrower || ""}
              onChange={(e) =>
                setNewItem({ ...newItem, borrower: e.target.value })
              }
            />
            <input
              type="date"
              className="form-control mt-2"
              value={newItem.borrowDate || ""}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setNewItem({ ...newItem, borrowDate: e.target.value })
              }
            />
          </>
        )}
      </div>

      <CreateItemButton onClick={handleCreateOrUpdateItem}>
        {isEditing ? "Save Changes" : "Create Item"}
      </CreateItemButton>

      <div className="mb-3">
        <label htmlFor="sortSelect" className="form-label">
          Sort by:
        </label>
        <select
          id="sortSelect"
          className="form-select"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="category">Category</option>
          <option value="type">Type</option>
        </select>
      </div>

      <ul className="list-group">
        {sortedItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.title} ({getInitials(item.title)}) -{" "}
            {getCategoryName(item.categoryId)} -{" "}
            {item.isBorrowable ? item.borrower : ""} -{" "}
            {item.isBorrowable ? formatDate(item.borrowDate ?? null) : ""}
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEditItem(item)}
              >
                Edit
              </button>
              {item.isBorrowable ? (
                <ReturnItemButton
                  onClick={() =>
                    onUpdateItem({
                      ...item,
                      isBorrowable: false,
                      borrower: null,
                      borrowDate: null,
                    })
                  }
                />
              ) : (
                <LoanItemButton
                  onClick={() => handleLoanClick(item)}
                  disabled={item.type === ITEM_TYPES.REFERENCE_BOOK}
                />
              )}
              <DeleteItemButton onDelete={() => onDeleteItem(item.id)} />
            </div>
          </li>
        ))}
      </ul>

      <LoanItemModal
        show={showLoanModal}
        onClose={() => setShowLoanModal(false)}
        onSave={handleSaveLoan}
      />
    </div>
  );
}

export default CreateItems;
