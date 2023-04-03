import leaflet from "leaflet";
import Peer, { DataConnection } from "peerjs";
import QRCode from "qrcode";
import { createElement } from "../lib/elements";
import { PlayerPosition } from "../lib/player-marker";
import { copyToClipboard } from "../lib/utils";
import Friend from "./Friend";

export default function Multiplayer({
  map,
  getLastPosition,
}: {
  map: leaflet.Map;
  getLastPosition?: () => PlayerPosition;
}) {
  const status =
    document.querySelector<HTMLParagraphElement>("#my_peer_status")!;

  const peerIdElement = document.querySelector<HTMLInputElement>("#peer_id")!;
  const peerErrorElement =
    document.querySelector<HTMLParagraphElement>("#peer_error")!;

  const peerConnect =
    document.querySelector<HTMLButtonElement>("#peer_connect")!;
  const connectionsElement =
    document.querySelector<HTMLElement>("#connections")!;
  let connections: {
    [id: string]: {
      conn: DataConnection;
      friend: ReturnType<typeof Friend>;
    };
  } = {};

  function addConnectedStatus(peer: string, conn: DataConnection) {
    const status = createElement("p", {
      id: `connection_${peer}`,
      className: "status ok",
      innerHTML: `<span class="indicator"></span><span>${peer}</span>`,
    });
    connectionsElement.append(status);

    const friend = Friend({ map });
    connections[peer] = { conn, friend };

    return {
      remove: () => {
        status.remove();
        friend.remove();
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
      if (getLastPosition) {
        conn.send(getLastPosition());
      }
    });
    conn.on("data", (data) => {
      if (
        data &&
        typeof data === "object" &&
        "location" in data &&
        "rotation" in data
      ) {
        const payload = data as PlayerPosition;
        if (connections[conn.peer]) {
          connections[conn.peer].friend.updatePosition(payload);
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

  const qrLink = document.querySelector<HTMLAnchorElement>(".qr_link");
  const canvas = document.querySelector<HTMLCanvasElement>(".qr");
  function setLink(href: string) {
    if (qrLink) {
      qrLink.href = href;
    }
    if (canvas) {
      QRCode.toCanvas(canvas, href, {
        color: { dark: "#fff", light: "#27272a" },
      });
    }
  }
  setLink("https://lmachens.github.io/sons-of-the-forest-map/");

  let peer: Peer | null = null;
  peerConnect.onclick = () => {
    if (peer) {
      peer.destroy();
    }
    peer = new Peer();
    peer.on("close", () => {
      console.log("peer close");

      status.classList.add("issue");
      status.classList.remove("ok");
      peerIdElement.value = "";
      setLink("https://lmachens.github.io/sons-of-the-forest-map/");
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
      setLink(`https://lmachens.github.io/sons-of-the-forest-map?app_id=${id}`);
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
  };

  const connectionForm =
    document.querySelector<HTMLFormElement>("#connection_form")!;
  connectionForm.onsubmit = (event) => {
    event.preventDefault();
    const data = new FormData(connectionForm);
    const id = (data.get("other_peer_id") as string).trim();
    if (!id) {
      peerErrorElement.innerText = "Please enter an ID";
      return;
    }
    if (!peer || peer.disconnected) {
      peerErrorElement.innerText = "Connect to peer server first";
      return;
    }
    if (id === peer.id) {
      peerErrorElement.innerText = "You can not connect to yourself";
      return;
    }
    peerErrorElement.innerText = "";
    const conn = peer.connect(id);
    initializeConnection(conn);
  };

  const copyPeerId =
    document.querySelector<HTMLButtonElement>("#copy_peer_id")!;
  copyPeerId.onclick = () => {
    if (peer?.id) {
      copyToClipboard(peer.id);
      copyPeerId.innerText = "Copied!";
      setTimeout(() => {
        copyPeerId.innerText = "Copy";
      }, 3000);
    }
  };
  function updatePosition(position: PlayerPosition) {
    if (!peer) {
      return;
    }
    Object.values(connections).forEach(({ conn }) => {
      conn.send(position);
    });
  }

  return {
    updatePosition,
  };
}
