import { DiscordRPCPlugin, loadDiscordRPCPlugin } from "../lib/discord-rpc";
import { getClosestLocation } from "../lib/locations";
import { PlayerPosition } from "../lib/player-marker";
import { promisifyOverwolf } from "../lib/wrapper";

export default function DiscordRPC() {
  let discordRPCPlugin: DiscordRPCPlugin | null = null;
  loadDiscordRPCPlugin("1187047215986909267").then((result) => {
    discordRPCPlugin = result;
    discordRPCPlugin.onLogLine.addListener((message) => {
      console.log(`DISCORD RPC - ${message.level} - ${message.message}`);

      if (message.message == "Failed to connect for some reason.") {
        console.log(
          "Shutting down Discord RPC because of too many connections errors"
        );
        discordRPCPlugin = null;
        promisifyOverwolf(result.dispose)();
      }

      if (
        message.message ==
        "We have been told to terminate by discord: (4000) Invalid Client ID"
      ) {
        console.log(
          "Shutting down Discord RPC because of too many connections errors"
        );
        discordRPCPlugin = null;
        promisifyOverwolf(result.dispose)();
      }
    });
  });

  let lastClosestLocation: ReturnType<typeof getClosestLocation> | null = null;
  function updatePosition(position: PlayerPosition) {
    const closestLocation = getClosestLocation(
      position.location.x,
      position.location.y
    );
    if (closestLocation === lastClosestLocation) {
      return;
    }
    if (discordRPCPlugin) {
      discordRPCPlugin.updatePresence(
        `Near by ${closestLocation?.title}`,
        "Surving in the forest",
        "sons-of-the-forest",
        "Sons Of The Forest",
        "thgl",
        "Sons Of The Forest Map・The Hidden Gaming Lair",
        true,
        0,
        "Get The App",
        "https://www.th.gl/apps/Sons%20Of%20The%20Forest%20Map?ref=discordrpc",
        "",
        "",
        () => null
      );
    }
  }

  return {
    updatePosition,
  };
}
