import React from "react";
import moment from "moment";
import bind from "bind-decorator";

class DatePickerModel {
  constructor(
    public selectedLeaveDate: Date,
    public setSelectedLeaveDate: React.Dispatch<React.SetStateAction<Date>>,

    public selectedReturnDate: Date,
    public setSelectedReturnDate: React.Dispatch<React.SetStateAction<Date>>
  ) {}

  @bind
  static AddTwoWeeks(date: Date): Date {
    return moment(date).add({ weeks: 2 }).toDate();
  }
}

export default DatePickerModel;
