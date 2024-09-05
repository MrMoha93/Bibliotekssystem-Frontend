export interface Category {
  id: string;
  name: string;
}

export interface CreateCategoryProps {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
  onEditCategory?: (id: string, newName: string) => void;
}

export interface Item {
  id: string;
  title: string;
  type: string;
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
  isBorrowable: boolean;
  borrower?: string | null;
  borrowDate?: string | null;
  categoryId: string;
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

export interface LoanItemButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
