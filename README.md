# sopro

Um verso de vez em quando, para lembrar de respirar.

App de celular que faz uma unica coisa: a cada X horas, solta uma notificacao
com uma frase curta de um poeta ou pensador antigo. Sem conta, sem internet,
sem rastreio. So um lembrete de que a vida e maior que o trabalho.

## Como funciona

- Esta sempre ligado. Voce so escolhe o intervalo (1h a 24h).
- O app agenda 30 notificacoes locais, uma por intervalo, cada uma com uma
  frase diferente. Toda vez que o app abre, a fila e refeita.
- As frases sao de poetas e pensadores da antiguidade e do Oriente, todos em
  dominio publico: gregos, romanos, chineses, persas, japoneses, indianos.

## Rodar

```
npm install
npx expo start
```

O `expo-notifications` nao roda no Expo Go (Android, SDK 53+), entao use um
build proprio: `eas build --platform android --profile preview` gera o APK
standalone; `--profile development` gera o dev client com hot reload.

Para regenerar os icones a partir da logo: `node tools/gerar_icones.mjs`.

## Estrutura

- `App.tsx` — tela unica: frase do momento, intervalo, teste.
- `src/quotes.ts` — banco de frases.
- `src/notifications.ts` — canal, permissao e agendamento.
- `src/storage.ts` — configuracao persistida com AsyncStorage.
- `tools/gerar_icones.mjs` — logo em SVG e geracao de todos os PNGs.
