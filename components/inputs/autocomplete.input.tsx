import { request } from "http";
import React, { useState, useRef, useEffect } from "react";
import AutoCompleteModel from "../../models/autocomplete.models";

interface Props {
  label: string;
  setAirport: React.Dispatch<React.SetStateAction<string>>;
}

const AutoCompleteInput = ({ label, setAirport }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const $listRef = useRef<HTMLDivElement>(null);

  const [autoCompleteInputValue, setAutoCompleteInputValue] =
    useState<string>("");

  const [isAutoCompleteSuggessionMenuOpen, setAutoCompleteSuggessionMenuOpen] =
    useState<boolean>(false);

  const [indexOfSelectedMenuSuggestion, setSelectedMenuSuggestion] =
    useState<number>(-1);

  const [menuSuggessions, setMenuSuggessions] = useState<string[]>([]);

  const autoCompleteModel: AutoCompleteModel = new AutoCompleteModel(
    ref,
    $listRef,

    autoCompleteInputValue,
    setAutoCompleteInputValue,

    isAutoCompleteSuggessionMenuOpen,
    setAutoCompleteSuggessionMenuOpen,

    indexOfSelectedMenuSuggestion,
    setSelectedMenuSuggestion,

    menuSuggessions,
    setMenuSuggessions,

    setAirport
  );

  const {
    handleOnChangeInput,
    handleOnKeyDown,
    handleMenuItemSelected,
    handleOutsideOfBounds,
    requestAirports,
  } = autoCompleteModel;

  useEffect(requestAirports, [autoCompleteInputValue]);
  useEffect(handleOutsideOfBounds, [isAutoCompleteSuggessionMenuOpen]);

  return (
    <div ref={ref}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="text"
        autoComplete="off"
        placeholder={label}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChangeInput}
        value={autoCompleteInputValue}
      />
      {isAutoCompleteSuggessionMenuOpen && (
        <div ref={$listRef}>
          {menuSuggessions.map((suggession, idx) => (
            <div key={idx} onClick={handleMenuItemSelected}>
              {suggession}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
