import React, { useState } from 'react';

interface DropdownProps {
  className: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  options,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[0],
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`${className} relative inline-block text-left`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white bg-custom-red hover:bg-custom-red focus:ring-4 focus:outline-none focus:bg-custom-red font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-custom-red dark:hover:bg-red-950 dark:focus:ring-blue-800"
        type="button"
      >
        {selectedOption || 'Select an option'}{' '}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
