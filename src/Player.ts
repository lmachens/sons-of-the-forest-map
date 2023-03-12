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

  let firstTime = true;
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
    let playerRotation = 90 - rotation;

    const oldRotation = marker.rotation || playerRotation;

    let spins = 0;
    if (oldRotation >= 180) {
      spins += Math.floor(Math.abs(oldRotation + 180) / 360);
    } else if (oldRotation <= -180) {
      spins -= Math.floor(Math.abs(oldRotation - 180) / 360);
    }
    playerRotation += 360 * spins;
    if (oldRotation - playerRotation >= 180) {
      playerRotation += 360;
    } else if (playerRotation - oldRotation >= 180) {
      playerRotation -= 360;
    }

    marker.rotation = playerRotation;

    marker.rotation = playerRotation;
    marker.setLatLng([location.y, location.x]);
    if (firstTime) {
      map.flyTo(marker.getLatLng(), 2);
      firstTime = false;
    }
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
    this._icon.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) rotate(${this.rotation}deg)`;
    return;
  }
}
