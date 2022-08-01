import React, { useState, useRef } from "react";
import AutoCompleteModel from "../../models/autocomplete.models";

interface Props {
  label: string;
  setAirport: React.Dispatch<React.SetStateAction<string>>;
}

const AutoCompleteInput = ({ label, setAirport }: Props): JSX.Element => {
  // Div element references
  const ref = useRef<HTMLDivElement>(null);
  const $listRef = useRef<HTMLDivElement>(null);

  // Set values of menu
  const [value, setValue] = useState<string>("");

  // Is Autocomplete menu open
  const [isMenuOpen, setMenuToOpen] = useState<boolean>(false);

  // Highlighted Tab index
  const [select, setSelect] = useState<number>(-1);

  // Populate setMenu
  const [options, setOptions] = useState<string[]>([]);

  // model
  const autoCompleteInput: AutoCompleteModel = new AutoCompleteModel(
    ref,
    $listRef,

    value,
    setValue,

    isMenuOpen,
    setMenuToOpen,

    select,
    setSelect,

    options,
    setOptions
  );

  // deconstruct model
  const { handleOnChangeInput, handleOnKeyDown, handleMenuItemSelected } =
    autoCompleteInput;

  return (
    <div ref={ref}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="text"
        value={value}
        autoComplete="off"
        placeholder={label}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChangeInput}
      />
      {isMenuOpen && (
        <div ref={$listRef}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
