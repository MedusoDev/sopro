// Frases e versos curtos de poetas e pensadores em dominio publico.
// Todos com autor falecido ha mais de 70 anos, para uso livre.

export type Quote = {
  text: string;
  author: string;
};

export const QUOTES: Quote[] = [
  // Fernando Pessoa e heteronimos
  { text: "Tudo vale a pena se a alma não é pequena.", author: "Fernando Pessoa" },
  { text: "Navegar é preciso; viver não é preciso.", author: "Fernando Pessoa" },
  { text: "Sê plural como o universo!", author: "Fernando Pessoa" },
  { text: "Sê todo em cada coisa. Põe quanto és no mínimo que fazes.", author: "Ricardo Reis (Fernando Pessoa)" },
  { text: "Para ser grande, sê inteiro: nada teu exagera ou exclui.", author: "Ricardo Reis (Fernando Pessoa)" },
  { text: "O meu olhar é nítido como um girassol.", author: "Alberto Caeiro (Fernando Pessoa)" },
  { text: "Há metafísica bastante em não pensar em nada.", author: "Alberto Caeiro (Fernando Pessoa)" },
  { text: "Não sou nada. Nunca serei nada. Não posso querer ser nada. À parte isso, tenho em mim todos os sonhos do mundo.", author: "Álvaro de Campos (Fernando Pessoa)" },

  // Poetas de lingua portuguesa
  { text: "Amor é fogo que arde sem se ver.", author: "Luís de Camões" },
  { text: "Mudam-se os tempos, mudam-se as vontades.", author: "Luís de Camões" },
  { text: "Todo o mundo é composto de mudança, tomando sempre novas qualidades.", author: "Luís de Camões" },
  { text: "Eu quero amar, amar perdidamente! Amar só por amar: aqui... além...", author: "Florbela Espanca" },
  { text: "Eu não sou eu nem sou o outro, sou qualquer coisa de intermédio.", author: "Mário de Sá-Carneiro" },
  { text: "Amai para entendê-las! Pois só quem ama pode ter ouvido capaz de ouvir e de entender estrelas.", author: "Olavo Bilac" },
  { text: "O tempo é um tecido invisível em que se pode bordar tudo.", author: "Machado de Assis" },
  { text: "Minha terra tem palmeiras, onde canta o sabiá.", author: "Gonçalves Dias" },
  { text: "Bendito o que semeia livros à mão cheia e manda o povo pensar!", author: "Castro Alves" },

  // Estoicos e filosofos antigos
  { text: "Não é que tenhamos pouco tempo: é que perdemos muito.", author: "Sêneca" },
  { text: "Enquanto adiamos, a vida passa.", author: "Sêneca" },
  { text: "A sorte é o que acontece quando a preparação encontra a oportunidade.", author: "Sêneca" },
  { text: "Tens poder sobre tua mente, não sobre os acontecimentos. Compreende isso e encontrarás força.", author: "Marco Aurélio" },
  { text: "Muito pouco é necessário para uma vida feliz; está tudo dentro de ti.", author: "Marco Aurélio" },
  { text: "Aquilo que impede o caminho torna-se o caminho.", author: "Marco Aurélio" },
  { text: "Não são as coisas que perturbam os homens, mas as opiniões que têm sobre elas.", author: "Epicteto" },
  { text: "Não estragues o que tens desejando o que não tens; lembra que o que tens agora já foi, um dia, o que desejavas.", author: "Epicuro" },
  { text: "Ninguém se banha duas vezes no mesmo rio.", author: "Heráclito" },
  { text: "Uma vida sem reflexão não merece ser vivida.", author: "Sócrates" },
  { text: "Torna-te quem tu és.", author: "Píndaro" },
  { text: "Colhe o dia, confiando o mínimo possível no amanhã.", author: "Horácio" },
  { text: "Alguém, digo-te, se lembrará de nós no futuro.", author: "Safo" },

  // Oriente
  { text: "Uma jornada de mil milhas começa com um único passo.", author: "Lao Tsé" },
  { text: "A natureza não tem pressa, e no entanto tudo se realiza.", author: "Lao Tsé" },
  { text: "Quem conhece os outros é sábio; quem conhece a si mesmo é iluminado.", author: "Lao Tsé" },
  { text: "Não importa quão devagar vás, desde que não pares.", author: "Confúcio" },
  { text: "Perguntas por que vivo nas montanhas verdes; sorrio e não respondo, o coração em paz.", author: "Li Bai" },
  { text: "O velho lago — uma rã salta. O som da água.", author: "Matsuo Bashô" },
  { text: "Não sigas os passos dos antigos; busca o que eles buscaram.", author: "Matsuo Bashô" },
  { text: "A ferida é o lugar por onde a luz entra em ti.", author: "Rumi" },
  { text: "O que procuras está te procurando.", author: "Rumi" },
  { text: "Ontem eu era esperto e queria mudar o mundo. Hoje sou sábio e estou mudando a mim mesmo.", author: "Rumi" },
  { text: "Sê feliz neste instante. Este instante é a tua vida.", author: "Omar Khayyam" },
  { text: "Se choras porque o sol desapareceu da tua vida, as lágrimas te impedirão de ver as estrelas.", author: "Rabindranath Tagore" },
  { text: "Dormi e sonhei que a vida era alegria. Acordei e vi que a vida era serviço. Agi, e eis que o serviço era alegria.", author: "Rabindranath Tagore" },
  { text: "O trabalho é o amor tornado visível.", author: "Khalil Gibran" },
  { text: "Quanto mais fundo a dor escava o teu ser, mais alegria podes conter.", author: "Khalil Gibran" },

  // Outros
  { text: "Sou vasto, contenho multidões.", author: "Walt Whitman" },
  { text: "Mantém o rosto voltado para o sol, e as sombras cairão atrás de ti.", author: "Walt Whitman" },
  { text: "A esperança é a coisa com penas que pousa na alma.", author: "Emily Dickinson" },
  { text: "Habito a possibilidade.", author: "Emily Dickinson" },
  { text: "Sê paciente com tudo o que está por resolver em teu coração e tenta amar as próprias perguntas.", author: "Rainer Maria Rilke" },
  { text: "Só há um caminho: entra em ti mesmo.", author: "Rainer Maria Rilke" },
];

export function randomQuote(exclude?: Quote): Quote {
  let q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  while (QUOTES.length > 1 && exclude && q.text === exclude.text) {
    q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }
  return q;
}

// Embaralha e devolve `count` frases; so repete se count for maior que o banco.
export function shuffledQuotes(count: number): Quote[] {
  const out: Quote[] = [];
  while (out.length < count) {
    const pool = [...QUOTES];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    out.push(...pool);
  }
  return out.slice(0, count);
}
