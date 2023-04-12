type ROUTE =
  | {
      name: "HOME";
      params: {};
    }
  | {
      name: "MAP_LOCATION";
      params: { id: string };
    };
export function getRoute(): ROUTE {
  const route = window.location.pathname;
  if (route.startsWith("/locations/")) {
    const parts = route.match(/\/locations\/(.*)/);
    if (parts) {
      return { name: "MAP_LOCATION", params: { id: parts[1] } };
    }
  }
  return { name: "HOME", params: {} };
}

export function getMapLocationId(): number | null {
  const route = getRoute();
  return route.name === "MAP_LOCATION" ? +route.params.id : null;
}

export function setMapLocationId(id: number | null) {
  if (id) {
    window.history.pushState({}, "", `/locations/${id}`);
  } else {
    window.history.pushState({}, "", "/");
  }
}
