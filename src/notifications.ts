import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { randomQuote, shuffledQuotes } from "./quotes";

// Quantas notificacoes futuras deixamos agendadas de uma vez.
// Cada uma leva uma frase diferente; toda vez que o app abre a fila e refeita,
// entao na pratica a pessoa nunca fica sem sopro.
const QUEUE_SIZE = 30;
const CHANNEL_ID = "sopro";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function setupChannel(): Promise<void> {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: "Sopros",
    description: "Um verso de vez em quando, para lembrar de respirar.",
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 150],
    lightColor: "#C9A96E",
  });
}

export async function requestPermission(): Promise<boolean> {
  if (!Device.isDevice) return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const asked = await Notifications.requestPermissionsAsync();
  return asked.granted;
}

export async function cancelAll(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Limpa a fila e agenda QUEUE_SIZE notificacoes, uma a cada `intervalHours`.
export async function scheduleQueue(intervalHours: number): Promise<void> {
  await cancelAll();
  const quotes = shuffledQuotes(QUEUE_SIZE);
  const step = intervalHours * 60 * 60;

  await Promise.all(
    quotes.map((q, i) =>
      Notifications.scheduleNotificationAsync({
        content: {
          title: q.author,
          body: q.text,
          sound: false,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: step * (i + 1),
          repeats: false,
          channelId: CHANNEL_ID,
        },
      })
    )
  );
}

// Dispara um sopro em poucos segundos, so para a pessoa ver como fica.
export async function sendTestNotification(): Promise<void> {
  const q = randomQuote();
  await Notifications.scheduleNotificationAsync({
    content: { title: q.author, body: q.text, sound: false },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 3,
      repeats: false,
      channelId: CHANNEL_ID,
    },
  });
}

export async function nextScheduledDate(): Promise<Date | null> {
  const all = await Notifications.getAllScheduledNotificationsAsync();
  let earliest: number | null = null;
  for (const n of all) {
    const t = n.trigger as any;
    // Android devolve `value` (timestamp absoluto); iOS devolve `seconds` relativo.
    const when: number | undefined =
      t?.value ?? (t?.seconds ? Date.now() + t.seconds * 1000 : undefined);
    if (when && (earliest === null || when < earliest)) earliest = when;
  }
  return earliest ? new Date(earliest) : null;
}
