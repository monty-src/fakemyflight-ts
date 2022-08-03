import DatePickerModel from './datepicker.models';
import FlightTypeModel from './flighttype.models';

class FindFlightModel {
  constructor(
    private datePickerModel: DatePickerModel,
    private flightTypeModel: FlightTypeModel,

    private selectedFromAirport: string,
    private selectedToAirport: string,
  ) {

  }
}

export default FindFlightModel;