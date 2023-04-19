import leaflet from "leaflet";
import Peer, { DataConnection } from "peerjs";
import { createElement } from "../lib/elements";
import { startNewGameSession } from "../lib/game-sessions";
import { t } from "../lib/i18n";
import { PlayerPosition } from "../lib/player-marker";
import DirectionLine from "./DirectionLine";
import FollowLocation from "./FollowLocation";
import Friend from "./Friend";
import GameSessions from "./GameSessions";
import Player from "./Player";
import TraceLine from "./TraceLine";

export default function AppStatus({ map }: { map: leaflet.Map }) {
  const { isFollowing } = FollowLocation();
  const directionLine = DirectionLine({ map });
  const traceLine = TraceLine({
    map,
  });
  GameSessions(traceLine);

  const player = Player({ map });
  const showOnMap = document.querySelector<HTMLButtonElement>(".show-on-map")!;
  showOnMap.onclick = () => {
    player.panTo();
  };

  const status =
    document.querySelector<HTMLParagraphElement>("#my_peer_status")!;
  const peerIdElement = document.querySelector<HTMLInputElement>("#peer_id")!;

  const peerConnect =
    document.querySelector<HTMLButtonElement>("#peer_connect")!;
  const peerErrorElement =
    document.querySelector<HTMLParagraphElement>("#peer_error")!;
  const connectionsElement =
    document.querySelector<HTMLElement>("#connections")!;
  let peer: Peer | null = null;

  const searchParams = new URLSearchParams(location.search);

  let connections: {
    [id: string]: {
      conn: DataConnection;
      friend: ReturnType<typeof Friend> | ReturnType<typeof Player>;
      isPlayer?: boolean;
    };
  } = {};

  function connectToPeer(onOpen?: () => void) {
    if (peer) {
      peer.destroy();
    }
    peer = new Peer();
    peer.on("close", () => {
      console.log("peer close");

      status.classList.add("issue");
      status.classList.remove("ok");
      peerIdElement.value = "";
      Object.keys(connections).forEach((peer) => {
        closeExistingConnection(peer);
      });
    });
    peer.on("error", (error) => {
      peerErrorElement.innerText = error.message;
      console.log("peer error", error, error.name, error.message);
    });
    peer.on("open", (id) => {
      console.log("peer open", id);

      status.classList.add("ok");
      status.classList.remove("issue");
      peerIdElement.value = id;
      if (onOpen) {
        onOpen();
      }
    });
    peer.on("connection", (conn) => {
      console.log("peer connection", conn);
      initializeConnection(conn);
    });
    peer.on("disconnected", (connectionId) => {
      console.log("peer disconnected", connectionId);
      status.classList.add("issue");
      status.classList.remove("ok");
      peerIdElement.value = "";
    });
  }

  const appId = searchParams.get("app_id");
  if (appId) {
    connectToPeer(() => {
      if (peer) {
        handleId(appId);
      }
    });
  }
  peerConnect.onclick = () => connectToPeer();

  function addConnectedStatus(peer: string, conn: DataConnection) {
    const status = createElement("p", {
      id: `connection_${peer}`,
      className: "status ok",
      innerHTML: `<span class="indicator"></span><span>${peer}</span>`,
    });
    connectionsElement.append(status);

    if (Object.keys(connections).length === 0) {
      connections[peer] = { conn, friend: player, isPlayer: true };
      startNewGameSession();
    } else {
      const friend = Friend({ map });
      connections[peer] = { conn, friend };
    }

    return {
      remove: () => {
        status.remove();
        connections[peer].friend.remove();
      },
    };
  }

  function closeExistingConnection(peer: string) {
    const existingConn = connections[peer];
    if (existingConn) {
      existingConn.conn.close();
      document
        .querySelector(`#connection_${existingConn.conn.connectionId}`)
        ?.remove();
      existingConn.friend.remove();
      delete connections[peer];
    }
  }

  function initializeConnection(conn: DataConnection) {
    closeExistingConnection(conn.peer);
    const status = addConnectedStatus(conn.peer, conn);
    conn.on("open", () => {
      console.log("conn open", conn.connectionId);
    });
    conn.on("data", (data) => {
      if (
        data &&
        typeof data === "object" &&
        "location" in data &&
        "rotation" in data
      ) {
        const payload = data as PlayerPosition;
        const connection = connections[conn.peer];
        if (connection) {
          connection.friend.updatePosition(payload);
          if ("panTo" in connection.friend && connection.isPlayer) {
            if (isFollowing()) {
              connection.friend.panTo();
            }
            directionLine.updatePosition(payload);
            traceLine.updatePosition(payload);
          }
        }
      }
    });
    conn.on("close", () => {
      console.log("conn close", conn.connectionId);
      status.remove();
    });
    conn.on("error", (error) => {
      console.log("conn error", error);
    });
  }

  function handleId(id: string) {
    if (!id) {
      peerErrorElement.innerText = t("Please enter an ID");
      return;
    }
    if (!peer || peer.disconnected) {
      peerErrorElement.innerText = t("Connect to peer server first");
      return;
    }
    if (id === peer.id) {
      peerErrorElement.innerText = t("You can not connect to yourself");
      return;
    }
    peerErrorElement.innerText = "";
    const conn = peer.connect(id);
    initializeConnection(conn);
  }
  const connectionForm =
    document.querySelector<HTMLFormElement>("#connection_form")!;
  connectionForm.onsubmit = (event) => {
    event.preventDefault();
    const data = new FormData(connectionForm);
    const id = (data.get("other_peer_id") as string).trim();
    handleId(id);
  };

  const locationStatus =
    document.querySelector<HTMLParagraphElement>(".location-status")!;
  locationStatus.innerText = t("Location is not detected");

  function setLocation(location: { x: number; y: number; z: number } | null) {
    if (!location) {
      locationStatus.innerText = t("Location is not detected");
    } else {
      locationStatus.innerText = `X: ${location.x} Y: ${location.y} Z: ${location.z}`;
    }
  }
  return {
    setLocation,
  };
}
