import React, { useState } from "react";

// Define the props expected by the SearchBar component.
type SearchBarProps = {
  onSearch: (query: string) => void; // Function to be called when a search is performed.
};

// Define the style types for the SearchBar component.
export type SearchStyle = {
  form: string; // Style for the form element.
  container: string; // Style for the container wrapping form elements.
  iconContainer: string; // Style for the icon container.
  icon: string; // Style for the icon itself.
  inputContainer: string; // Style for the container wrapping input.
  input: string; // Style for the input element.
  button: string; // Style for the button element.
};

// The SearchBar functional component.
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // State to hold the current query.

  // Handle changes to the input field.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value); // Update the query state with the new value.
  };

  // Handle the form submission.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior.
    onSearch(query); // Trigger the onSearch function with the current query.
  };

  // Handle button click
  const handleButtonClick = () => {
    onSearch(query); // Trigger the onSearch function with the current query.
  };

  const classNames: SearchStyle = {
    form: "relative rounded-sm bg-white px-[35px] py-[5px] shadow-md w-[30%]",
    container: "flex items-center", // Container style for alignment
    iconContainer: "pointer-events-none absolute inset-y-0 left-[16px] flex items-center pr-3",
    icon: "w-[12px] h-[12px]",
    inputContainer: "relative flex-1", // Container for input
    input:
      "w-full text-[12px] font-[500] leading-[20px] text-[#374151] outline-none placeholder:text-[#94A3B8] py-[5px] px-[30px]",
    button:
      "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2", // Added ml-2 for margin-left
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search clients"
        className={classNames.form}
      >
        <div className={classNames.container}>
          <div className={classNames.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
              fill="none"
              className={classNames.icon}
            >
              <path
                d="M10.5 10.5L8.34998 8.34998M9.5 5.5C9.5 7.70914 7.70914 9.5 5.5 9.5C3.29086 9.5 1.5 7.70914 1.5 5.5C1.5 3.29086 3.29086 1.5 5.5 1.5C7.70914 1.5 9.5 3.29086 9.5 5.5Z"
                stroke="#64748B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={classNames.inputContainer}>
            <label htmlFor="search" className="sr-only">
              Search Clients
            </label>
            <input
              type="text"
              id="search"
              value={query}
              onChange={handleChange}
              placeholder="Enter Stay ID..."
              className={classNames.input}
            />
          </div>
        </div>
      </form>

      <button
        type="button"
        className={classNames.button}
        onClick={handleButtonClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
