import leaflet from "leaflet";

export type PlayerPosition = {
  location: {
    x: number;
    y: number;
    z: number;
  };
  rotation: number;
};

export default class PlayerMarker extends leaflet.Marker {
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

  updatePosition({ location, rotation }: PlayerPosition) {
    let playerRotation = 90 - rotation;

    const oldRotation = this.rotation || playerRotation;

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

    this.rotation = playerRotation;

    this.rotation = playerRotation;
    this.setLatLng([location.y, location.x]);
  }
}
