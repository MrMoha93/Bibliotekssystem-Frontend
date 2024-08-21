import type { LoanItemButton } from "./Types";

function LoanItemButton({ onClick }: LoanItemButton) {
  return (
    <button className="btn btn-sm btn-primary me-2" onClick={onClick}>
      Loan Item
    </button>
  );
}

export default LoanItemButton;
