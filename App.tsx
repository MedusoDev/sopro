import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AppState,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Quote, randomQuote } from "./src/quotes";
import {
  DEFAULT_SETTINGS,
  INTERVAL_OPTIONS,
  Settings,
  loadSettings,
  saveSettings,
} from "./src/storage";
import {
  cancelAll,
  nextScheduledDate,
  requestPermission,
  scheduleQueue,
  sendTestNotification,
  setupChannel,
} from "./src/notifications";

const COLORS = {
  bg: "#14120F",
  card: "#1E1B16",
  border: "#2C2820",
  text: "#EDE6D8",
  muted: "#8F8674",
  accent: "#C9A96E",
  accentText: "#14120F",
};

export default function App() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [quote, setQuote] = useState<Quote>(() => randomQuote());
  const [next, setNext] = useState<Date | null>(null);
  const [ready, setReady] = useState(false);

  const refreshNext = useCallback(async () => {
    setNext(await nextScheduledDate());
  }, []);

  // Ao abrir: carrega config, cria canal e refaz a fila se estiver ligado.
  useEffect(() => {
    (async () => {
      await setupChannel();
      const s = await loadSettings();
      setSettings(s);
      if (s.enabled) await scheduleQueue(s.intervalHours);
      await refreshNext();
      setReady(true);
    })();

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") refreshNext();
    });
    return () => sub.remove();
  }, [refreshNext]);

  const apply = useCallback(
    async (nextSettings: Settings) => {
      setSettings(nextSettings);
      await saveSettings(nextSettings);
      if (nextSettings.enabled) {
        await scheduleQueue(nextSettings.intervalHours);
      } else {
        await cancelAll();
      }
      await refreshNext();
    },
    [refreshNext]
  );

  const toggleEnabled = async (value: boolean) => {
    if (value) {
      const ok = await requestPermission();
      if (!ok) {
        Alert.alert(
          "Sem permissão",
          "O sopro precisa de permissão de notificação para funcionar. Libere nas configurações do sistema."
        );
        return;
      }
    }
    await apply({ ...settings, enabled: value });
  };

  const pickInterval = async (hours: number) => {
    await apply({ ...settings, intervalHours: hours });
  };

  const test = async () => {
    const ok = await requestPermission();
    if (!ok) {
      Alert.alert("Sem permissão", "Libere as notificações para receber o teste.");
      return;
    }
    await sendTestNotification();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>sopro</Text>
        <Text style={styles.tagline}>um verso de vez em quando, para lembrar de respirar</Text>

        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => setQuote(randomQuote(quote))}
        >
          <Text style={styles.quoteMark}>“</Text>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>— {quote.author}</Text>
          <Text style={styles.hint}>toque para outro</Text>
        </Pressable>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Sopros ligados</Text>
              <Text style={styles.sub}>
                {ready && settings.enabled && next
                  ? `próximo ${formatNext(next)}`
                  : "nenhum sopro agendado"}
              </Text>
            </View>
            <Switch
              value={settings.enabled}
              onValueChange={toggleEnabled}
              disabled={!ready}
              trackColor={{ false: COLORS.border, true: COLORS.accent }}
              thumbColor={COLORS.text}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>A cada</Text>
          <View style={styles.chips}>
            {INTERVAL_OPTIONS.map((h) => {
              const active = h === settings.intervalHours;
              return (
                <Pressable
                  key={h}
                  onPress={() => pickInterval(h)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {h}h
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={test}
          style={({ pressed }) => [styles.testButton, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.testButtonText}>Mandar um sopro agora</Text>
        </Pressable>

        <Text style={styles.footer}>
          Sem conta, sem internet, sem rastreio. Só um lembrete de que a vida é
          maior que o trabalho.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatNext(d: Date): string {
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  if (sameDay) return `às ${time}`;
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (d.toDateString() === tomorrow.toDateString()) return `amanhã às ${time}`;
  return `${d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} às ${time}`;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 24, paddingTop: 48, gap: 20 },
  brand: {
    color: COLORS.accent,
    fontSize: 34,
    letterSpacing: 6,
    fontFamily: "serif",
  },
  tagline: { color: COLORS.muted, fontSize: 14, marginTop: -12 },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    minHeight: 200,
    justifyContent: "center",
  },
  cardPressed: { opacity: 0.85 },
  quoteMark: {
    color: COLORS.accent,
    fontSize: 48,
    lineHeight: 40,
    fontFamily: "serif",
    marginBottom: -8,
  },
  quoteText: {
    color: COLORS.text,
    fontSize: 22,
    lineHeight: 32,
    fontFamily: "serif",
  },
  quoteAuthor: { color: COLORS.accent, fontSize: 14, marginTop: 16 },
  hint: { color: COLORS.muted, fontSize: 11, marginTop: 12, textAlign: "right" },
  section: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    gap: 12,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  label: { color: COLORS.text, fontSize: 16, fontWeight: "600" },
  sub: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { color: COLORS.text, fontSize: 14 },
  chipTextActive: { color: COLORS.accentText, fontWeight: "700" },
  testButton: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  testButtonText: { color: COLORS.accent, fontSize: 15, fontWeight: "600" },
  footer: { color: COLORS.muted, fontSize: 12, textAlign: "center", lineHeight: 18 },
});
