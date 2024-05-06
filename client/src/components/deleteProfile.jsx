import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteProfile } from "../redux/userSlice";

const DeleteProfileModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDeleteProfile = () => {
    dispatch(DeleteProfile());
    handleCloseModal();
  };

  return (
    <>
      <button onClick={handleOpenModal} className="delete-profile-button">Delete Profile</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-message">Are you sure you want to delete your profile? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={handleDeleteProfile} className="delete-button">Delete Profile</button>
              <button onClick={handleCloseModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProfileModal;