# sopro

Um verso de vez em quando, para lembrar de respirar.

App de celular que faz uma unica coisa: a cada X horas, solta uma notificacao
com uma frase curta de um poeta ou pensador antigo. Sem conta, sem internet,
sem rastreio. So um lembrete de que a vida e maior que o trabalho.

## Como funciona

- Voce escolhe o intervalo (1h a 24h) e liga.
- O app agenda 30 notificacoes locais, uma por intervalo, cada uma com uma
  frase diferente. Toda vez que o app abre, a fila e refeita.
- As frases sao de autores em dominio publico (Pessoa, Camoes, Seneca,
  Marco Aurelio, Rumi, Basho, Whitman, Dickinson, Rilke, Tagore...).

## Rodar

```
npm install
npx expo start
```

Abra no Expo Go (Android) ou gere um build de desenvolvimento com
`npx expo run:android`.

## Estrutura

- `App.tsx` — tela unica: frase do momento, liga/desliga, intervalo, teste.
- `src/quotes.ts` — banco de frases.
- `src/notifications.ts` — canal, permissao e agendamento.
- `src/storage.ts` — configuracao persistida com AsyncStorage.
