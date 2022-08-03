import bind from "bind-decorator";
import DatePickerModel from "./datepicker.models";
import FlightTypeModel from "./flighttype.models";

class FindFlightModel {
  constructor(
    private datePickerModel: DatePickerModel,
    private flightTypeModel: FlightTypeModel,

    private selectedFromAirport: string,
    private selectedToAirport: string
  ) {}

  @bind
  public submit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(this.flightTypeModel.trip);
    console.log(this.datePickerModel.selectedLeaveDate);
    console.log(this.datePickerModel.selectedReturnDate);
    console.log(this.selectedFromAirport);
    console.log(this.selectedToAirport);
  }
}

export default FindFlightModel;
