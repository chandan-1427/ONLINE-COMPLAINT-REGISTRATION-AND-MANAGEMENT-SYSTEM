import { useState, useId } from "react";

const PasswordInput = ({ label, name, value, onChange, required }) => {
  const [show, setShow] = useState(false);
  const id = useId();

  return (
    <>
      <div className="password-wrapper">
        <label htmlFor={id} className="password-label">
          {label}
        </label>

        <div className="password-input-container">
          <input
            id={id}
            type={show ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            className="password-input-field"
            required={required}
          />

          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <style>
        {`
          .password-wrapper {
            margin-bottom: 1.5rem;
            text-align: left;
          }

          .password-label {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 6px;
            display: block;
            color: #333;
          }

          .password-input-container {
            position: relative;
          }

          .password-input-field {
            width: 100%;
            padding: 12px 50px 12px 14px;
            font-size: 0.95rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
            transition: all 0.25s ease;
          }

          .password-input-field:focus {
            border-color: #000;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
          }

          .toggle-btn {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 0.8rem;
            color: #666;
            cursor: pointer;
          }

          .toggle-btn:hover {
            color: #000;
          }
        `}
      </style>
    </>
  );
};

export default PasswordInput;
