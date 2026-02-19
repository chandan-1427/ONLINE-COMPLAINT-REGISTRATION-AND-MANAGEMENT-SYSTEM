import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const UserTypeDropdown = ({ title, onSelect }) => {
  const userTypes = ["Ordinary", "Admin", "Agent"];

  return (
    <>
      <div className="dropdown-wrapper">
        <label className="dropdown-label">
          Select User Type
        </label>

        <Dropdown>
          <Dropdown.Toggle className="custom-dropdown-toggle">
            {title}
          </Dropdown.Toggle>

          <Dropdown.Menu className="custom-dropdown-menu">
            {userTypes.map((type) => (
              <Dropdown.Item
                key={type}
                className="custom-dropdown-item"
                onClick={() => onSelect(type)}
              >
                {type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Internal CSS */}
      <style>
        {`
          .dropdown-wrapper {
            margin-bottom: 1.5rem;
            text-align: left;
          }

          .dropdown-label {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 6px;
            display: block;
            color: #333;
          }

          .custom-dropdown-toggle {
            width: 100%;
            padding: 12px 14px;
            font-size: 0.95rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #fff !important;
            color: #333 !important;
            text-align: left;
            box-shadow: none !important;
            transition: all 0.25s ease;
          }

          .custom-dropdown-toggle:hover {
            border-color: #000;
            background-color: #fff !important;
          }

          .custom-dropdown-toggle:focus,
          .custom-dropdown-toggle:active {
            border-color: #000 !important;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08) !important;
            background-color: #fff !important;
            color: #000 !important;
          }

          .custom-dropdown-menu {
            width: 100%;
            border-radius: 8px;
            border: 1px solid #eee;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          }

          .custom-dropdown-item {
            font-size: 0.9rem;
            padding: 10px 14px;
            transition: background-color 0.2s ease;
          }

          .custom-dropdown-item:hover {
            background-color: #f8f9fa;
          }
        `}
      </style>
    </>
  );
};

export default UserTypeDropdown;
