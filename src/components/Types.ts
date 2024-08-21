export interface Category {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  title: string;
  type: string;
  author?: string;
  isBorrowable: boolean;
  borrower?: string | null;
  borrowDate?: string | null;
  category: string;
}

export interface CreateItemButton {
  onClick: () => void;
}

export interface DeleteItemButton {
  onDelete: () => void;
}

export interface DeleteCategoryButton {
  onDelete: () => void;
}

export interface EditButton {
  onEdit: () => void;
}

export interface LoanItemButton {
  onClick: () => void;
}

export interface ReturnItemButton {
  onClick: () => void;
}
