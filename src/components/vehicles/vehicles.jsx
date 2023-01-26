import React, { Component } from "react";
import _ from "loadsh";
import {
  getVehicles,
  deleteVehicle,
} from "./../../services/fakeVehiclesService";
import { getVehiclesTypes } from "./../../services/fakeVehiclesTypeService";
import VehiclesTable from "./vehiclesTable";
import Pagination from "./../common/pagination";
import { paginate } from "./../../utils/paginate";
import LisGroup from "./../common/listGroup";
import { Link } from "react-router-dom";
import SearchBox from "./../searchBox";

class Vehicles extends Component {
  state = {
    vehicles: [],
    types: [],
    pageSize: 4,
    currentPage: 1,
    selectedType: null,
    searchQuery: "",
    sortColumn: { path: "plate", order: "asc" },
  };
  search = React.createRef();

  componentDidMount() {
    this.setState({
      vehicles: getVehicles(),
      types: [{ name: "All Types" }, ...getVehiclesTypes()],
    });
  }

  handleDelete = (movie) => {
    deleteVehicle(movie._id);
    this.setState({ vehicles: getVehicles() });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
  };

  handleTypeSelected = (type) => {
    this.setState({ selectedType: type, currentPage: 1, searchQuery: "" });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData() {
    const {
      pageSize,
      currentPage,
      vehicles: allVehicles,
      selectedType,
      sortColumn,
      searchQuery,
    } = this.state;

    console.log(allVehicles);

    let filtered = allVehicles;
    if (searchQuery)
      filtered = allVehicles.filter((v) =>
        v.plate.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedType && selectedType._id)
      filtered = allVehicles.filter((v) => v.type._id === selectedType._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const vehicles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: vehicles };
  }

  render() {
    const { length: count } = this.state.vehicles;
    const {
      pageSize,
      currentPage,
      types,
      selectedType,
      sortColumn,
      searchQuery,
    } = this.state;

    if (count === 0) return "No vehicles in Database";

    const { totalCount, data: vehicles } = this.getPagedData();

    return (
      <div className="row m-2">
        <div className="col-3">
          <LisGroup
            items={types}
            selectedItem={selectedType}
            onItemSelected={this.handleTypeSelected}
          />
        </div>
        <div className="col">
          <Link to="/vehicles/new" className="btn btn-primary">
            New vehicle
          </Link>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <p> Showing {totalCount} vehicles in Database. </p>
          <VehiclesTable
            vehicles={vehicles}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Vehicles;
