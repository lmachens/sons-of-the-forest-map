import leaflet from "leaflet";

leaflet.Canvas.include({
  updateCanvasImg(layer: CanvasMarker) {
    const ctx: CanvasRenderingContext2D = this._ctx;
    if (!ctx) {
      return;
    }

    const { path, color, radius, isDiscovered, isUnderground, isHighlighted } =
      layer.options;

    const p = layer._point.round();
    const imageSize = radius * 2;

    const dx = p.x - radius;
    const dy = p.y - radius;

    if (isHighlighted) {
      ctx.beginPath();
      ctx.arc(dx + radius, dy + radius, radius, 0, Math.PI * 2, true);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(dx, dy);

    const scale = imageSize / 512;

    ctx.scale(scale, scale);
    const path2D = new Path2D(path);

    const globalAlpha = isDiscovered ? 0.1 : 1;
    ctx.globalAlpha = globalAlpha;

    ctx.strokeStyle = "#000";
    ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
    ctx.shadowBlur = 3;

    ctx.lineWidth = 15;
    ctx.stroke(path2D);
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
    ctx.restore();
  },
});
const renderer = leaflet.canvas() as leaflet.Canvas & {
  updateCanvasImg: (layer: CanvasMarker) => void;
};

export type CanvasMarkerOptions = {
  id: number;
  path: string;
  color: string;
  radius: number;
  isUnderground?: boolean;
  isDiscovered?: boolean;
  isHighlighted?: boolean;
  tooltipContent: string | HTMLElement;
};

class CanvasMarker extends leaflet.CircleMarker {
  declare options: leaflet.CircleMarkerOptions & CanvasMarkerOptions;
  private _renderer: typeof renderer;
  declare imageElement: HTMLImageElement;
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
