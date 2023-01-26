import * as vehiclesTypeAPI from "./fakeVehiclesTypeService";

const vehicles = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    plate: "PPG 1234",
    type: { _id: "5b21ca3eeb7f6fbccd471818", name: "Truck" },
    year: 2016,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    plate: "XDS 2343",
    type: { _id: "5b21ca3eeb7f6fbccd471818", name: "Truck" },
    year: 2015,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    plate: "QWE 1234",
    type: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bus" },
    year: 2018,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    plate: "XSD 2332",
    type: { _id: "5b21ca3eeb7f6fbccd471814", name: "Car" },
    year: 2017,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    plate: "AZX 9S92",
    type: { _id: "5b21ca3eeb7f6fbccd471814", name: "Car" },
    year: 2017,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    plate: "PPP 3236",
    type: { _id: "5b21ca3eeb7f6fbccd471814", name: "Car" },
    year: 2014,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    plate: "OIU 8473",
    type: { _id: "5b21ca3eeb7f6fbccd471820", name: "Bus" },
    year: 2022,
  },
];

export function getVehicles() {
  return vehicles;
}

export function getVehicle(id) {
  return vehicles.find((v) => v._id === id);
}

export function saveVehicle(vehicle) {
  let vehiclesInDb = vehicles.find((m) => m._id === vehicle._id) || {};
  vehiclesInDb.plate = vehicle.plate;
  vehiclesInDb.type = vehiclesTypeAPI.vehiclesTypes.find(
    (vT) => vT._id === vehicle.typeId
  );
  vehiclesInDb.year = vehicle.year;

  if (!vehiclesInDb._id) {
    vehiclesInDb._id = Date.now().toString();
    vehicles.push(vehiclesInDb);
  }

  return vehiclesInDb;
}

export function deleteVehicle(id) {
  let vehiclesInDb = vehicles.find((v) => v._id === id);
  vehicles.splice(vehicles.indexOf(vehiclesInDb), 1);
  return vehiclesInDb;
}
