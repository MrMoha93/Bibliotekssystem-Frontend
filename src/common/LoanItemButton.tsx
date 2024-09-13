import type { LoanItemButtonProps } from "../components/Types";

function LoanItemButton({ onClick, disabled }: LoanItemButtonProps) {
  return (
    <button
      className="btn btn-sm btn-primary me-2"
      onClick={onClick}
      disabled={disabled}
    >
      Loan Item
    </button>
  );
}

export default LoanItemButton;
