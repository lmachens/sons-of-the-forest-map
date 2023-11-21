import { create } from "zustand";
import { persist } from "zustand/middleware";

type Settings = {
  showImages: boolean;
  showDescriptions: boolean;
  showRequirements: boolean;
  showTeleporting: boolean;
  showTogglego: boolean;
  showItemId: boolean;
  showCompass: boolean;
  showTraceLine: boolean;
  showDirectionLine: boolean;
  showIconBackground: boolean;
  showZones: boolean;
  iconSize: number;
};
export const useSettingsStore = create(
  persist<
    Settings & {
      setValue: (key: keyof Settings, value: any) => void;
    }
  >(
    (set) => ({
      showImages: true,
      showDescriptions: true,
      showRequirements: true,
      showTeleporting: true,
      showTogglego: true,
      showItemId: true,
      showCompass: typeof overwolf !== "undefined",
      showTraceLine: true,
      showDirectionLine: true,
      showIconBackground: true,
      showZones: false,
      iconSize: 18,
      setValue: (key, value) => set({ [key]: value }),
    }),
    {
      name: "settings-storage",
    }
  )
);
