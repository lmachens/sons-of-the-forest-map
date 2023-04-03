import { getItem, setItem } from "./storage";

export type GameSession = {
  timestamp: number;
  traceLine: {
    x: number;
    y: number;
    z: number;
  }[];
};

export function startNewGameSession() {
  const sessions = getGameSessions()
    .filter((session) => session.traceLine.length > 0)
    .slice(-5);

  const newSession = {
    timestamp: Date.now(),
    traceLine: [],
  };
  sessions.push(newSession);
  setItem("game_sessions", sessions);
  return newSession;
}

export function getGameSessions(): GameSession[] {
  return getItem<GameSession[]>("game_sessions", []);
}

export function getLatestGameSession(): GameSession {
  const sessions = getGameSessions();
  if (sessions.length === 0) {
    startNewGameSession();
    return getLatestGameSession();
  }
  return sessions[sessions.length - 1];
}

export function addTraceLineItem(item: { x: number; y: number; z: number }) {
  const sessions = getGameSessions();
  const latestSession = sessions[sessions.length - 1];
  latestSession.traceLine.push(item);
  setItem("game_sessions", sessions);
}
