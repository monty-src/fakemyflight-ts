import React from "react";
import DatePicker from "react-datepicker";

const DatePickerInput = ({
  label,
  selectedDate,
}: {
  label: string;
  selectedDate: Date | null;
}) => {
  return (
    <DatePicker
      placeholderText={label}
      className=""
      selected={selectedDate}
      onChange={(date) => {}}
    />
  );
};

export default DatePickerInput;
