import React from "react";
import moment from "moment";
import bind from "bind-decorator";

class DatePickerModel {
  constructor(
    public toDate: Date | null,
    public setToDate: React.Dispatch<React.SetStateAction<Date | null>>,

    public fromDate: Date,
    public setFromDate: React.Dispatch<React.SetStateAction<Date>>
  ) {}

  @bind
  public addTwoWeeks(): void {
    const twoWeeksLater = moment(this.fromDate).add({ weeks: 2 }).toDate();
    this.setToDate(twoWeeksLater);
  }
}

export default DatePickerModel;
