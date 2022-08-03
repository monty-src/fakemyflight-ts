import React from "react";
import DatePicker from "react-datepicker";

const DatePickerInput = ({
  onChange,
  label,
  selectedDate,
}: {
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  label: string;
  selectedDate: Date;
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
