import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(12.302113140000001, 76.64786634),
      L.latLng(12.332678352941176, 76.61092067647058)
    ],
    lineOptions: {
      styles: [{ color: "red", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: true,
    createMarker: function () {
      return null;
    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
