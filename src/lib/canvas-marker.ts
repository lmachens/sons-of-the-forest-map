import leaflet from "leaflet";
import { PIN_PATH } from "./icons";

const cachedImages: Record<string, HTMLImageElement> = {};
leaflet.Canvas.include({
  updateCanvasImg(layer: CanvasMarker) {
    const {
      type,
      path,
      src,
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
    const layerContext = this._ctx as CanvasRenderingContext2D;

    layerContext.save();

    const globalAlpha = isDiscovered ? 0.1 : 1;

    if (src && showIconBackground) {
      layerContext.globalAlpha = globalAlpha;
      layerContext.strokeStyle = "#000";
      layerContext.shadowColor = "rgba(0, 0, 0, 0.75)";
      layerContext.shadowBlur = 3;
      layerContext.lineWidth = 15;
      const scale = imageSize / 512;

      layerContext.translate(dx, dy);
      layerContext.scale(scale, scale);
      const pinPath2D = new Path2D(PIN_PATH);

      layerContext.fillStyle = color;

      layerContext.shadowColor = "#000";
      layerContext.shadowOffsetX = 0;
      layerContext.shadowOffsetY = 0;
      layerContext.shadowBlur = 3;

      layerContext.stroke(pinPath2D);
      layerContext.fill(pinPath2D);
      layerContext.restore();

      layerContext.globalAlpha = globalAlpha;
      layerContext.shadowColor = "#000";
      layerContext.shadowOffsetX = 0;
      layerContext.shadowOffsetY = 0;
      layerContext.shadowBlur = 3;
      layerContext.drawImage(
        layer.imageElement,
        dx + 7,
        dy + 5,
        imageSize * 0.6,
        imageSize * 0.6
      );

      layerContext.restore();

      return;
    }
    const key = `${type}-${isDiscovered}-${isHighlighted}-${isUnderground}-${showIconBackground}`;
    if (cachedImages[key]) {
      if (cachedImages[key].complete) {
        layerContext.drawImage(cachedImages[key], dx, dy);
      } else {
        cachedImages[key].addEventListener("load", () => {
          layerContext.drawImage(cachedImages[key], dx, dy);
        });
      }
      layerContext.restore();

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
      layerContext.drawImage(img, dx, dy);
    });
    layerContext.restore();
  },
});
const renderer = leaflet.canvas() as leaflet.Canvas & {
  updateCanvasImg: (layer: CanvasMarker) => void;
};

export type CanvasMarkerOptions = {
  id: number;
  path?: string;
  src?: string;
  type: string;
  color: string;
  radius: number;
  isUnderground?: boolean;
  isDiscovered?: boolean;
  isHighlighted?: boolean;
  tooltipContent: string | HTMLElement;
  showIconBackground?: boolean;
};

const imageElements: {
  [src: string]: HTMLImageElement;
} = {};
class CanvasMarker extends leaflet.CircleMarker {
  declare options: leaflet.CircleMarkerOptions & CanvasMarkerOptions;
  private _renderer: typeof renderer;
  declare _point: any;
  declare imageElement: HTMLImageElement;
  private _onImageLoad: (() => void) | undefined = undefined;

  constructor(
    latLng: leaflet.LatLngExpression,
    options: leaflet.CircleMarkerOptions & CanvasMarkerOptions
  ) {
    options.renderer = renderer;
    super(latLng, options);
    this._renderer = renderer;
    if (options.src) {
      if (!imageElements[options.src]) {
        imageElements[options.src] = document.createElement("img");
        imageElements[options.src].src = options.src;
      }
      this.imageElement = imageElements[options.src];
    }
  }

  _redraw() {
    return;
  }

  _update() {
    return;
  }

  _updatePath() {
    if (!this.imageElement || this.imageElement.complete) {
      this._renderer.updateCanvasImg(this);
    } else if (!this._onImageLoad) {
      this._onImageLoad = () => {
        this.imageElement.removeEventListener("load", this._onImageLoad!);
        this._renderer.updateCanvasImg(this);
      };
      this.imageElement.addEventListener("load", this._onImageLoad);
    }
  }
}

export default CanvasMarker;
