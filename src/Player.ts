import leaflet from "leaflet";

export default function Player({ map }: { map: leaflet.Map }) {
  const icon = leaflet.icon({
    iconUrl: "/arrow.webp",
    className: "",
    iconSize: [32, 32],
  });
  const marker = new PlayerMarker([0, 0], {
    icon,
    interactive: false,
  });
  marker.rotation = 270;

  marker.addTo(map);
  map.panTo(marker.getLatLng());

  function updatePosition({
    location,
    rotation,
  }: {
    location: {
      x: number;
      y: number;
      z: number;
    };
    rotation: number;
  }) {
    marker.rotation = rotation;
    marker.setLatLng([location.y, location.x]);
  }

  function panTo() {
    map.panTo(marker.getLatLng());
  }
  return {
    updatePosition,
    panTo,
  };
}

class PlayerMarker extends leaflet.Marker {
  declare rotation: number;
  private _icon: HTMLElement | undefined = undefined;

  _setPos(pos: leaflet.Point): void {
    if (!this._icon) {
      return;
    }
    if (this._icon.style.transform) {
      this._icon.style.transition = "transform 0.5s linear";
    }

    this._icon.style.transformOrigin = "center";
    this._icon.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) rotate(${
      90 - this.rotation
    }deg)`;
    return;
  }
}
