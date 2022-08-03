import React from "react";
import moment from "moment";
import bind from "bind-decorator";
import { ONE_WAY, FlightType } from "../models/flighttype.models";

export type DatePickerProps = {
  selectedReturnDate: Date | null;
};

class DatePickerModel {
  constructor(
    public selectedLeaveDate: Date,
    public setSelectedLeaveDate: React.Dispatch<React.SetStateAction<Date>>,

    public selectedReturnDate: Date | null,
    public setSelectedReturnDate: React.Dispatch<
      React.SetStateAction<Date | null>
    >
  ) {}

  static AddTwoWeeks(date: Date): Date {
    return moment(date).add({ weeks: 2 }).toDate();
  }

  public addOneDay(date: Date | null): Date {
    return moment(date).add({ days: 1 }).toDate();
  }

  public isBefore(date1: Date | null, date2: Date | null) {
    return moment(date1).isBefore(date2);
  }

  @bind
  public setLeaveDate(date: Date): void {
    if (this.isBefore(this.selectedReturnDate, date)) {
      const extraDay = this.addOneDay(date);
      this.setSelectedLeaveDate(date);
      this.setSelectedReturnDate(extraDay);
      return;
    }
    this.setSelectedLeaveDate(date);
  }

  @bind
  public setReturnDate(date: Date): void {
    if (this.isBefore(date, this.selectedLeaveDate)) {
      const extraDay = this.addOneDay(this.selectedLeaveDate);
      this.setSelectedReturnDate(extraDay);
      return;
    }
    this.setSelectedReturnDate(date);
  }
}

export default DatePickerModel;
