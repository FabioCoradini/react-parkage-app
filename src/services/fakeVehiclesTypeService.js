export const vehiclesTypes = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Car" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Truck" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Bus" },
];

export function getVehiclesTypes() {
  return vehiclesTypes.filter((g) => g);
}
