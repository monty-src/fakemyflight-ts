import React from "react";
import DatePicker from "react-datepicker";

const DatePickerInput = ({ label }: { label: string }) => {
  return (
    <DatePicker
      placeholderText={label}
      className=""
      selected={new Date()}
      onChange={(date) => {}}
    />
  );
};

export default DatePickerInput;
