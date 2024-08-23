import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface LoanItemModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (borrower: string, expireDate: string) => void;
}

function LoanItemModal({ show, onClose, onSave }: LoanItemModalProps) {
  const [borrower, setBorrower] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const handleSave = () => {
    onSave(borrower, expireDate);
    setBorrower("");
    setExpireDate("");
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Loan Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Borrower Name</label>
          <input
            type="text"
            className="form-control"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
            placeholder="Enter borrower's name"
          />
        </div>
        <div className="form-group mt-3">
          <label>Expiration Date</label>
          <input
            type="date"
            className="form-control"
            value={expireDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoanItemModal;
