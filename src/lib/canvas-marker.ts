import leaflet from "leaflet";

leaflet.Canvas.include({
  updateCanvasImg(layer: CanvasMarker) {
    const ctx: CanvasRenderingContext2D = this._ctx;
    if (!ctx) {
      return;
    }

    const { path, color, radius, discovered } = layer.options;

    const p = layer._point.round();
    const imageSize = radius * 2;
    const dx = p.x - radius;
    const dy = p.y - radius;

    ctx.save();
    ctx.translate(dx, dy);

    const scale = imageSize / 512;

    ctx.scale(scale, scale);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.fillStyle = color;

    ctx.shadowColor = "#000000";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3;

    if (discovered) {
      ctx.globalAlpha = 0.3;
    }
    const path2D = new Path2D(path);
    ctx.stroke(path2D);
    ctx.fill(path2D);
    ctx.restore();
  },
});
const renderer = leaflet.canvas() as leaflet.Canvas & {
  updateCanvasImg: (layer: CanvasMarker) => void;
};

export type CanvasMarkerOptions = {
  path: string;
  color: string;
  radius: number;
  discovered?: boolean;
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
