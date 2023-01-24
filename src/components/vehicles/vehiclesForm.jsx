import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getVehicle, saveVehicle } from "../services/fakeVehiclesService";
import { getVehiclesTypes } from "../services/fakeVehiclesTypeService";

class MovieForm extends Form {
  state = {
    data: {
      plate: "",
      typeId: "",
      year: "",
    },
    errors: {},
    types: [],
  };

  schema = {
    _id: Joi.string(),
    plate: Joi.string().required().label("Plate"),
    typeId: Joi.string().required().label("Type"),
    year: Joi.number().required().min(1900).label("Year"),
  };

  componentDidMount() {
    this.setState({
      types: [...getVehiclesTypes()],
    });

    const { id } = this.props.match.params;
    if (id === "new") return;

    const vehicle = getVehicle(id);
    if (!vehicle) this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(vehicle) });
  }

  mapToViewModel = (vehicle) => {
    return {
      _id: vehicle._id,
      plate: vehicle.plate,
      typeId: vehicle.type._id,
      year: vehicle.year,
    };
  };

  doSubmit = () => {
    saveVehicle(this.state.data);
    this.props.history.push("/vehicles");
  };

  render() {
    return (
      <div>
        <h2>Movie Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("plate", "Plate")}
          {this.renderSelect("typeId", "Type", this.state.types)}
          {this.renderInput("year", "Year", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
