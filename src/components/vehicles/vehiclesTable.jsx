import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class VehicleTable extends Component {
  columns = [
    {
      name: "Plate",
      path: "plate",
      content: (vehicle) => (
        <Link to={`/vehicles/${vehicle._id}`}>{vehicle.plate}</Link>
      ),
    },
    {
      name: "Type",
      path: "type.name",
    },
    {
      name: "Year",
      path: "year",
    },
    {
      key: "Delete",
      content: (vehicle) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(vehicle)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { vehicles, onSort, sortColumn } = this.props;
    return (
      <Table
        data={vehicles}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default VehicleTable;
