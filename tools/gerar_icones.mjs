// Gera todos os PNGs do app a partir da logo em SVG.
// Uso: node tools/gerar_icones.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OURO = "#C9A96E";
const FUNDO = "#14120F";

const FOLHA = "M0 -18 C13 -10 13 10 0 18 C-13 10 -13 -10 0 -18 Z";
const NERVURA_CENTRAL = '<path d="M0 -13 V13"/>';
const NERVURAS_LATERAIS =
  '<path d="M0 -3 L6 -8"/><path d="M0 -3 L-6 -8"/><path d="M0 6 L6 1"/><path d="M0 6 L-6 1"/>';

// `detalhe`: "cheio" (todas as nervuras), "central" (so a do meio na folha grande), "nenhum".
function folha({ x, y, rot, escala, cor, corNervura, detalhe, largura }) {
  let veias = "";
  if (detalhe !== "nenhum") {
    const partes = detalhe === "cheio" ? NERVURA_CENTRAL + NERVURAS_LATERAIS : NERVURA_CENTRAL;
    veias = `<g fill="none" stroke="${corNervura}" stroke-width="${largura}" stroke-linecap="round">${partes}</g>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${escala})"><path d="${FOLHA}" fill="${cor}"/>${veias}</g>`;
}

// Logo num quadro 100x100.
// nivel: "grande" (nervuras em todas), "medio" (cheio so na do meio), "pequeno" (so central na do meio).
function logo(cor, corNervura, nivel) {
  const d = {
    grande: ["cheio", "cheio", "cheio", 1.6],
    medio: ["central", "cheio", "central", 2.2],
    pequeno: ["nenhum", "central", "nenhum", 3],
  }[nivel];
  return `
    <path d="M8 82 C34 84 46 68 40 52 C34 36 50 26 70 22 C82 20 88 16 94 10" fill="none" stroke="${cor}" stroke-width="${nivel === "pequeno" ? 7 : 4}" stroke-linecap="round"/>
    ${folha({ x: 22, y: 70, rot: 20, escala: 0.75, cor, corNervura, detalhe: d[0], largura: d[3] })}
    ${folha({ x: 55, y: 46, rot: 90, escala: 1.05, cor, corNervura, detalhe: d[1], largura: d[3] })}
    ${folha({ x: 80, y: 18, rot: -60, escala: 0.55, cor, corNervura, detalhe: d[2], largura: d[3] })}`;
}

function svg({ size, frac, cor, corNervura, nivel, fundo, radius = 0 }) {
  const s = size * frac;
  const off = (size - s) / 2;
  const bg = fundo ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${fundo}"/>` : "";
  const corpo = frac > 0 ? `<g transform="translate(${off} ${off}) scale(${s / 100})">${logo(cor, corNervura, nivel)}</g>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${bg}${corpo}</svg>`;
}

async function out(file, markup) {
  await sharp(Buffer.from(markup)).png().toFile(file);
  console.log("ok", file);
}

mkdirSync("assets", { recursive: true });

// Renderiza a logo branca em transparente e "fura" a nervura central da folha
// do meio com dest-out. Android usa so o alfa nesses icones, entao a nervura
// precisa ser recorte de verdade, nao cor.
async function furado(file, size, frac, larguraNervura) {
  const base = await sharp(Buffer.from(svg({ size, frac, cor: "#FFFFFF", corNervura: "#FFFFFF", nivel: "pequeno", fundo: null }))).png().toBuffer();
  const s = size * frac, off = (size - s) / 2;
  const furo = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><g transform="translate(${off} ${off}) scale(${s / 100})"><g transform="translate(55 46) rotate(90) scale(1.05)"><path d="M0 -13 V13" fill="none" stroke="#fff" stroke-width="${larguraNervura / (s / 100)}" stroke-linecap="round"/></g></g></svg>`;
  await sharp(base).composite([{ input: Buffer.from(furo), blend: "dest-out" }]).png().toFile(file);
  console.log("ok", file);
}

// Icone da notificacao: silhueta branca, 96px (xxxhdpi).
await furado("assets/notification-icon.png", 96, 0.9, 2.5);


// Icone principal (iOS / fallback).
await out("assets/icon.png", svg({ size: 1024, frac: 0.72, cor: OURO, corNervura: FUNDO, nivel: "grande", fundo: FUNDO }));

// Adaptive icon Android: logo na zona segura (~66% central), fundo separado.
await out("assets/android-icon-foreground.png", svg({ size: 1024, frac: 0.5, cor: OURO, corNervura: FUNDO, nivel: "grande", fundo: null }));
await out("assets/android-icon-background.png", svg({ size: 1024, frac: 0, cor: OURO, corNervura: FUNDO, nivel: "grande", fundo: FUNDO }));
// Monocromatico (temas Android 13+): branco em transparente; nervuras viram recorte.
// Monocromatico tambem so usa o alfa: nervura central da folha do meio como recorte.
await furado("assets/android-icon-monochrome.png", 1024, 0.5, 14);

// Splash e favicon.
await out("assets/splash-icon.png", svg({ size: 512, frac: 0.6, cor: OURO, corNervura: FUNDO, nivel: "grande", fundo: null }));
await out("assets/favicon.png", svg({ size: 64, frac: 0.8, cor: OURO, corNervura: FUNDO, nivel: "pequeno", fundo: FUNDO, radius: 12 }));
