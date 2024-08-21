export interface Category {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  title: string;
  type: string;
  author?: string;
  borrower?: string;
  borrowDate?: string;
  category: string;
}

export interface DeleteCategoryButton {
  onDelete: () => void;
}

export interface EditButton {
  onEdit: () => void;
}

export interface CreateItemButton {
  onClick: () => void;
}

export interface DeleteItemButton {
  onDelete: () => void;
}
