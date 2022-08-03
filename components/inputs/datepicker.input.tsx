import React from "react";
import DatePicker from "react-datepicker";

const DatePickerInput = ({
  onChange,
  label,
  selectedDate,
}: {
  onChange: (date: Date) => void;
  label: string;
  selectedDate: Date | null;
}) => {
  return (
    <DatePicker
      placeholderText={label}
      className=""
      selected={selectedDate}
      onChange={onChange}
    />
  );
};

export default DatePickerInput;
