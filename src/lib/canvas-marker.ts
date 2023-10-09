import leaflet from "leaflet";
import { PIN_PATH } from "./icons";

const cachedImages: Record<string, HTMLImageElement> = {};
leaflet.Canvas.include({
  updateCanvasImg(layer: CanvasMarker) {
    const {
      type,
      path,
      color,
      radius,
      isDiscovered,
      isUnderground,
      isHighlighted,
      showIconBackground,
    } = layer.options;
    const imageSize = radius * 2;
    const p = layer._point.round();
    const dx = p.x - radius;
    const dy = p.y - radius;

    const key = `${type}-${isDiscovered}-${isHighlighted}-${isUnderground}-${showIconBackground}`;
    if (cachedImages[key]) {
      if (cachedImages[key].complete) {
        this._ctx.drawImage(cachedImages[key], dx, dy);
      } else {
        cachedImages[key].addEventListener("load", () => {
          this._ctx.drawImage(cachedImages[key], dx, dy);
        });
      }
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = imageSize;
    canvas.height = imageSize;
    const ctx = canvas.getContext("2d")!;

    if (isHighlighted) {
      ctx.beginPath();
      ctx.arc(dx + radius, dy + radius, radius, 0, Math.PI * 2, true);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    const scale = imageSize / 512;

    ctx.scale(scale, scale);
    const path2D = new Path2D(path);
    const globalAlpha = isDiscovered ? 0.1 : 1;
    ctx.globalAlpha = globalAlpha;
    ctx.strokeStyle = "#000";
    ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
    ctx.shadowBlur = 3;
    ctx.lineWidth = 15;
    if (showIconBackground) {
      const pinPath2D = new Path2D(PIN_PATH);

      ctx.fillStyle = color;
      ctx.stroke(pinPath2D);
      ctx.fill(pinPath2D);

      // ctx.stroke(path2D);
      // ctx.globalAlpha = 0.15;
      ctx.shadowColor = color;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 3;
      ctx.scale(0.6, 0.6);
      ctx.translate(170, 78);

      ctx.fillStyle = "#ffffff";

      ctx.stroke(path2D);
      ctx.fill(path2D);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fill(path2D);

      ctx.fillStyle = color;
      ctx.globalAlpha = 0.15;
      ctx.shadowColor = color;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 3;
      ctx.stroke(path2D);
      ctx.stroke(path2D);
      ctx.fill(path2D);
    }
    ctx.globalAlpha = globalAlpha;

    if (isUnderground) {
      ctx.lineWidth = 1;
      ctx.fillStyle = "#fff";

      ctx.translate(250, -50);
      ctx.scale(15, 15);

      const path2D = new Path2D("M17 13v-6l-5 4l-5 -4v6l5 4z");
      ctx.stroke(path2D);
      ctx.fill(path2D);
    }

    const img = new Image(imageSize, imageSize);
    img.src = ctx.canvas.toDataURL("image/webp");
    cachedImages[key] = img;
    img.addEventListener("load", () => {
      this._ctx.drawImage(img, dx, dy);
    });
  },
});
const renderer = leaflet.canvas() as leaflet.Canvas & {
  updateCanvasImg: (layer: CanvasMarker) => void;
};

export type CanvasMarkerOptions = {
  id: number;
  path: string;
  type: string;
  color: string;
  radius: number;
  isUnderground?: boolean;
  isDiscovered?: boolean;
  isHighlighted?: boolean;
  tooltipContent: string | HTMLElement;
  showIconBackground?: boolean;
};

class CanvasMarker extends leaflet.CircleMarker {
  declare options: leaflet.CircleMarkerOptions & CanvasMarkerOptions;
  private _renderer: typeof renderer;
  declare _point: any;

  constructor(
    latLng: leaflet.LatLngExpression,
    options: leaflet.CircleMarkerOptions & CanvasMarkerOptions
  ) {
    options.renderer = renderer;
    super(latLng, options);
    this._renderer = renderer;
  }

  _redraw() {
    return;
  }

  _update() {
    return;
  }

  _updatePath() {
    this._renderer.updateCanvasImg(this);
  }
}

export default CanvasMarker;
