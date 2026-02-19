import { useId } from "react";

const FormInput = ({ label, type, name, value, onChange }) => {
  const id = useId();

  return (
    <>
      <div className="form-input-wrapper">
        <label htmlFor={id} className="form-input-label">
          {label}
        </label>

        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="form-input-field"
          required
        />
      </div>

      {/* Internal CSS */}
      <style>
        {`
          .form-input-wrapper {
            margin-bottom: 1.5rem;
            text-align: left;
          }

          .form-input-label {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 6px;
            display: block;
            color: #333;
          }

          .form-input-field {
            width: 100%;
            padding: 12px 14px;
            font-size: 0.95rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
            transition: all 0.25s ease;
            background-color: #fff;
          }

          .form-input-field:focus {
            border-color: #000;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
          }

          .form-input-field::placeholder {
            color: #aaa;
          }
        `}
      </style>
    </>
  );
};

export default FormInput;
