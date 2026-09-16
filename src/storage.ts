import AsyncStorage from "@react-native-async-storage/async-storage";

export type Settings = {
  enabled: boolean;
  intervalHours: number;
};

export const INTERVAL_OPTIONS = [1, 2, 3, 4, 6, 8, 12, 24];

export const DEFAULT_SETTINGS: Settings = {
  enabled: false,
  intervalHours: 4,
};

const KEY = "sopro.settings";

export async function loadSettings(): Promise<Settings> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(settings));
}
