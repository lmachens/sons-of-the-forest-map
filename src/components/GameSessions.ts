import { createElement } from "../lib/elements";
import { GameSession, getGameSessions } from "../lib/game-sessions";

export default function GameSessions({
  showSession,
  hideSession,
}: {
  showSession: (session: GameSession) => void;
  hideSession: (session: GameSession) => void;
}) {
  const container = document.querySelector<HTMLDivElement>("#game_sessions")!;
  const gameSessions = getGameSessions();

  const options = gameSessions
    .map((gameSession, index) => {
      const input = createElement("input", {
        type: "checkbox",
        value: gameSession.timestamp.toString(),
        onchange: () => {
          if (input.checked) {
            showSession(gameSession);
          } else {
            hideSession(gameSession);
          }
        },
        checked: index === gameSessions.length - 1,
        disabled: index === gameSessions.length - 1,
      });
      return createElement(
        "label",
        {
          className: "group",
        },
        [
          input,
          createElement("span", {
            innerText: new Date(gameSession.timestamp).toLocaleString(),
          }),
        ]
      );
    })
    .reverse();
  container.append(...options);
}
