// Frases e versos curtos de poetas e pensadores da antiguidade e do Oriente,
// todos em dominio publico (autor falecido ha mais de 70 anos).
// Misturado de proposito: gregos, romanos, chineses, persas, japoneses, indianos.

export type Quote = {
  text: string;
  author: string;
};

export const QUOTES: Quote[] = [
  // Grecia
  { text: "Alguém, digo-te, se lembrará de nós no futuro.", author: "Safo" },
  { text: "O que é belo é bom, e quem é bom logo será belo.", author: "Safo" },
  { text: "Torna-te quem tu és.", author: "Píndaro" },
  { text: "Criatura de um dia. O que é alguém? O que não é? Sonho de uma sombra é o homem.", author: "Píndaro" },
  { text: "Ninguém se banha duas vezes no mesmo rio.", author: "Heráclito" },
  { text: "O caráter de um homem é o seu destino.", author: "Heráclito" },
  { text: "Uma vida sem reflexão não merece ser vivida.", author: "Sócrates" },
  { text: "Só sei que nada sei.", author: "Sócrates" },
  { text: "Não estragues o que tens desejando o que não tens; lembra que o que tens agora já foi, um dia, o que desejavas.", author: "Epicuro" },
  { text: "Não é o jovem que deve ser considerado afortunado, mas o velho que viveu bem.", author: "Epicuro" },
  { text: "Não são as coisas que perturbam os homens, mas as opiniões que têm sobre elas.", author: "Epicteto" },
  { text: "Não busques que os acontecimentos aconteçam como queres; quere que aconteçam como acontecem, e serás sereno.", author: "Epicteto" },
  { text: "Suporta e renuncia.", author: "Epicteto" },
  { text: "Conta-me, Musa, do homem astuto que tanto vagou.", author: "Homero" },
  { text: "Não há nada mais admirável do que quando dois seres que se entendem vivem sob o mesmo teto.", author: "Homero" },
  { text: "Trabalha, para que a fome te odeie.", author: "Hesíodo" },
  { text: "Quem aprende deve sofrer. E mesmo no sono, a dor que não esquece cai gota a gota sobre o coração.", author: "Ésquilo" },
  { text: "Um dia pode rebaixar ou elevar tudo o que é humano.", author: "Sófocles" },
  { text: "Muitas são as maravilhas, mas nenhuma é mais maravilhosa que o homem.", author: "Sófocles" },
  { text: "Quem é feliz? Aquele que tem o corpo são, a alma rica e a natureza bem-educada.", author: "Tales de Mileto" },
  { text: "A felicidade não está na posse de muitas coisas, mas na alma serena.", author: "Demócrito" },
  { text: "A esperança é o sonho de um homem acordado.", author: "Aristóteles" },
  { text: "Somos o que fazemos repetidamente.", author: "Aristóteles" },
  { text: "Sê gentil, pois cada pessoa que encontras está travando uma dura batalha.", author: "Fílon de Alexandria" },

  // Roma
  { text: "Não é que tenhamos pouco tempo: é que perdemos muito.", author: "Sêneca" },
  { text: "Enquanto adiamos, a vida passa.", author: "Sêneca" },
  { text: "Sofremos mais na imaginação do que na realidade.", author: "Sêneca" },
  { text: "Não há vento favorável para quem não sabe aonde vai.", author: "Sêneca" },
  { text: "Tens poder sobre tua mente, não sobre os acontecimentos. Compreende isso e encontrarás força.", author: "Marco Aurélio" },
  { text: "Muito pouco é necessário para uma vida feliz; está tudo dentro de ti.", author: "Marco Aurélio" },
  { text: "Aquilo que impede o caminho torna-se o caminho.", author: "Marco Aurélio" },
  { text: "Ao amanhecer, quando te custar levantar, pensa: acordo para fazer o trabalho de um ser humano.", author: "Marco Aurélio" },
  { text: "Pensa na vastidão do tempo atrás de ti e no infinito à tua frente. Nesse abismo, que diferença há entre três dias e três gerações?", author: "Marco Aurélio" },
  { text: "Colhe o dia, confiando o mínimo possível no amanhã.", author: "Horácio" },
  { text: "Quem tem o suficiente não deve desejar mais nada.", author: "Horácio" },
  { text: "A mente é o seu próprio lugar.", author: "Horácio" },
  { text: "O amor tudo vence; rendamo-nos ao amor.", author: "Virgílio" },
  { text: "Foge, enquanto isso, o tempo irrecuperável.", author: "Virgílio" },
  { text: "A gota fura a pedra não pela força, mas pela constância.", author: "Ovídio" },
  { text: "Sê paciente e forte; um dia essa dor te será útil.", author: "Ovídio" },
  { text: "Vivamos, minha Lésbia, e amemos, e os murmúrios dos velhos severos valham para nós um centavo.", author: "Catulo" },
  { text: "Um jardim e uma biblioteca: se tens isso, tens tudo.", author: "Cícero" },
  { text: "Enquanto há vida, há esperança.", author: "Cícero" },
  { text: "Nada é mais doce do que habitar os templos serenos erguidos pela sabedoria.", author: "Lucrécio" },
  { text: "Aprende a viver e o medo da morte diminui.", author: "Plutarco" },

  // China
  { text: "Uma jornada de mil milhas começa com um único passo.", author: "Lao Tsé" },
  { text: "A natureza não tem pressa, e no entanto tudo se realiza.", author: "Lao Tsé" },
  { text: "Quem conhece os outros é sábio; quem conhece a si mesmo é iluminado.", author: "Lao Tsé" },
  { text: "Quem sabe que tem o suficiente é rico.", author: "Lao Tsé" },
  { text: "A água é a coisa mais mole e mais fraca do mundo, mas nada a supera quando ataca o que é duro.", author: "Lao Tsé" },
  { text: "Não importa quão devagar vás, desde que não pares.", author: "Confúcio" },
  { text: "Aonde quer que vás, vai com todo o coração.", author: "Confúcio" },
  { text: "Tudo tem beleza, mas nem todos a veem.", author: "Confúcio" },
  { text: "O peixe está preso na armadilha por causa do peixe; quando pegas o peixe, podes esquecer a armadilha. As palavras existem por causa do sentido; quando pegas o sentido, podes esquecer as palavras.", author: "Zhuangzi" },
  { text: "A grande felicidade é não ter felicidade.", author: "Zhuangzi" },
  { text: "Perguntas por que vivo nas montanhas verdes; sorrio e não respondo, o coração em paz.", author: "Li Bai" },
  { text: "Sentados juntos, a montanha e eu, até que só reste a montanha.", author: "Li Bai" },
  { text: "Caminho até onde a água acaba, e sento para ver as nuvens subirem.", author: "Wang Wei" },
  { text: "O país foi destruído, mas montanhas e rios permanecem.", author: "Du Fu" },

  // Japao
  { text: "O velho lago — uma rã salta. O som da água.", author: "Matsuo Bashô" },
  { text: "Não sigas os passos dos antigos; busca o que eles buscaram.", author: "Matsuo Bashô" },
  { text: "Cada dia é uma viagem, e a própria viagem é a casa.", author: "Matsuo Bashô" },
  { text: "Silêncio: o canto da cigarra penetra as rochas.", author: "Matsuo Bashô" },
  { text: "Neste mundo, caminhamos sobre o telhado do inferno, contemplando flores.", author: "Kobayashi Issa" },
  { text: "Mundo de orvalho — é um mundo de orvalho, e no entanto, e no entanto.", author: "Kobayashi Issa" },
  { text: "Caracol, sobe o monte Fuji, mas devagar, devagar.", author: "Kobayashi Issa" },
  { text: "A brisa da noite; a água bate nas pernas da garça.", author: "Yosa Buson" },

  // Persia e mundo islamico
  { text: "A ferida é o lugar por onde a luz entra em ti.", author: "Rumi" },
  { text: "O que procuras está te procurando.", author: "Rumi" },
  { text: "Ontem eu era esperto e queria mudar o mundo. Hoje sou sábio e estou mudando a mim mesmo.", author: "Rumi" },
  { text: "Não te contentes com histórias de como as coisas foram para os outros. Desdobra o teu próprio mito.", author: "Rumi" },
  { text: "Vende a tua esperteza e compra assombro.", author: "Rumi" },
  { text: "Sê feliz neste instante. Este instante é a tua vida.", author: "Omar Khayyam" },
  { text: "Um pouco de pão, um pouco de vinho, um livro de versos e tu ao meu lado no deserto: o deserto é o paraíso.", author: "Omar Khayyam" },
  { text: "Os filhos de Adão são membros de um só corpo, criados de uma mesma essência.", author: "Saadi" },
  { text: "Tem paciência: tudo é difícil antes de ser fácil.", author: "Saadi" },
  { text: "Nem mesmo depois de todo esse tempo o sol diz à terra: tu me deves.", author: "Hafiz" },

  // India
  { text: "Tens direito às tuas ações, mas nunca aos frutos delas.", author: "Bhagavad Gita" },
  { text: "Somos o que pensamos. Tudo o que somos surge com os nossos pensamentos.", author: "Dhammapada" },
  { text: "Melhor do que mil palavras vazias é uma só palavra que traz paz.", author: "Dhammapada" },
  { text: "Não fiques olhando para o passado nem sonhando com o futuro; concentra a mente no momento presente.", author: "Dhammapada" },
  { text: "Se choras porque o sol desapareceu da tua vida, as lágrimas te impedirão de ver as estrelas.", author: "Rabindranath Tagore" },
  { text: "Dormi e sonhei que a vida era alegria. Acordei e vi que a vida era serviço. Agi, e eis que o serviço era alegria.", author: "Rabindranath Tagore" },
  { text: "A borboleta não conta meses, mas momentos, e tem tempo de sobra.", author: "Rabindranath Tagore" },
  { text: "O rio que corre em ti corre também em mim.", author: "Kabir" },
  { text: "Onde quer que estejas, ali é a porta de entrada.", author: "Kabir" },

  // Libano
  { text: "O trabalho é o amor tornado visível.", author: "Khalil Gibran" },
  { text: "Quanto mais fundo a dor escava o teu ser, mais alegria podes conter.", author: "Khalil Gibran" },
  { text: "Esqueces que a terra se deleita em sentir teus pés descalços, e que os ventos anseiam por brincar com teus cabelos.", author: "Khalil Gibran" },
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
