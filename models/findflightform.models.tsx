import axios from "axios";
import bind from "bind-decorator";
import DatePickerModel from "./datepicker.models";
import FlightTypeModel from "./flighttype.models";

class FindFlightFormModel {
  constructor(
    private datePickerModel: DatePickerModel,
    private flightTypeModel: FlightTypeModel,

    private selectedFromAirport: string,
    private selectedToAirport: string
  ) {}

  requestFlights() {
    (async () => {
      const flights = await axios.post("api/flights", {
        trip: this.flightTypeModel.trip,
        selectedLeaveDate: this.datePickerModel.selectedLeaveDate,
        selectedReturnDate: this.datePickerModel.selectedReturnDate,
        selectedFromAirport: this.selectedFromAirport,
        selectedToAirport: this.selectedToAirport,
      });
      console.log("flights: ", flights);
    })();
  }

  @bind
  public submit(event: React.SyntheticEvent) {
    event.preventDefault();
    this.requestFlights();
  }
}

export default FindFlightFormModel;
