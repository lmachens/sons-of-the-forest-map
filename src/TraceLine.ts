import leaflet from "leaflet";

export default function TraceLine({ map }: { map: leaflet.Map }) {
  const layerGroup = new leaflet.LayerGroup();

  const traceLine = document.querySelector<HTMLInputElement>("#trace_line")!;
  traceLine.checked = localStorage.getItem("hide_trace_line") !== "true";
  if (traceLine.checked) {
    layerGroup.addTo(map);
  }

  traceLine.onchange = () => {
    if (traceLine.checked) {
      localStorage.removeItem("hide_trace_line");
      layerGroup.addTo(map);
    } else {
      localStorage.setItem("hide_trace_line", "true");
      layerGroup.removeFrom(map);
    }
  };

  function updatePosition({
    location,
  }: {
    location: {
      x: number;
      y: number;
      z: number;
    };
  }) {
    const circle = leaflet.circle(
      [location.y, location.x] as [number, number],
      {
        radius: 0,
        interactive: false,
        color: "#F78166",
      }
    );
    circle.addTo(layerGroup);
  }

  return {
    updatePosition,
  };
}
