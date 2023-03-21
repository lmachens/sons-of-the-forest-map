import leaflet from "leaflet";
import Peer, { DataConnection } from "peerjs";
import Friend from "./Friend";

export default function Multiplayer({
  map,
  getLastPosition,
}: {
  map: leaflet.Map;
  getLastPosition: () => {
    location: {
      x: number;
      y: number;
      z: number;
    };
    rotation: number;
  };
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

  function addConnectedStatus(id: string, conn: DataConnection) {
    const status = document.createElement("p");
    connectionsElement.append(status);
    status.id = `connection_${id}`;
    status.className = "status ok";

    const friend = Friend({ map });
    connections[id] = { conn, friend };

    return {
      remove: () => status.remove(),
      setConnectedId: (id: string) =>
        (status.innerHTML = `<span class="indicator"></span><span>Connected to ${id}</span>`),
    };
  }

  function closeExistingConnection(label: string) {
    const existingConn = connections[label];
    if (existingConn) {
      existingConn.conn.close();
      document
        .querySelector(`#connection_${existingConn.conn.connectionId}`)
        ?.remove();
      existingConn.friend.remove();
      delete connections[label];
    }
  }

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
      Object.values(connections).forEach((value, index) => {
        value.friend.remove();
        delete connections[index];
      });
    });
    peer.on("error", (error) => {
      peerErrorElement.innerText = error.message;
      console.log("peer error", error, error.name, error.message);
      if (error.message === "Lost connection to server.") {
        status.classList.add("issue");
        status.classList.remove("ok");
        peerIdElement.value = "";
        Object.values(connections).forEach((value, index) => {
          value.friend.remove();
          delete connections[index];
        });
      }
    });
    peer.on("open", (id) => {
      console.log("peer open", id);

      status.classList.add("ok");
      status.classList.remove("issue");
      peerIdElement.value = id;
    });
    peer.on("connection", (conn) => {
      console.log("peer connection", conn);

      closeExistingConnection(conn.label);
      const status = addConnectedStatus(conn.connectionId, conn);
      status.setConnectedId(conn.label);
      conn.on("data", (data) => {
        if (
          data &&
          typeof data === "object" &&
          "location" in data &&
          "rotation" in data
        ) {
          const payload = data as {
            location: {
              x: number;
              y: number;
              z: number;
            };
            rotation: number;
          };
          connections[conn.label]?.friend.updatePosition(payload);
        }
      });

      conn.on("close", () => {
        console.log("conn close", conn.connectionId);
        status.remove();
      });
      conn.send(getLastPosition());
    });
    peer.on("disconnected", (connectionId) => {
      console.log("peer disconnected", connectionId);
      document.querySelector(`#connection_${connectionId}`)?.remove();
      delete connections[connectionId];
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
    closeExistingConnection(id);

    const conn = peer.connect(id, { label: peer.id });
    const status = addConnectedStatus(id, conn);
    conn.on("open", () => {
      console.log("conn open", conn.connectionId);
      status.setConnectedId(id);
      conn.send(getLastPosition());
    });
    conn.on("close", () => {
      console.log("conn close", conn.connectionId);
      status.remove();
    });
  };

  const copyPeerId =
    document.querySelector<HTMLButtonElement>("#copy_peer_id")!;
  copyPeerId.onclick = () => {
    if (peer?.id) {
      overwolf.utils.placeOnClipboard(peer.id);
      copyPeerId.innerText = "Copied!";
      setTimeout(() => {
        copyPeerId.innerText = "Copy";
      }, 3000);
    }
  };
  function updatePosition(position: {
    location: {
      x: number;
      y: number;
      z: number;
    };
    rotation: number;
  }) {
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
