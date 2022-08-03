import React from "react";



class DatePickerModel {

  constructor(
    private toDate: Date,
    private setToDate: React.Dispatch<React.SetStateAction<Date>>,

    private fromDate: Date,
    private setFromDate: React.Dispatch<React.SetStateAction<Date>>,
  ) {

  }

}

export default DatePickerModel;