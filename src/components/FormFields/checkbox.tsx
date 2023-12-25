import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <>
      <div className="flex items-center justify-center border-2 border-slate-400 rounded">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-custom-red bg-gray-100 rounded focus:bg-custom-red"
          onChange={handleChange}
          checked={checked}
        />
        <label className="ms-2 text-sm font-medium text-custom-red">
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
