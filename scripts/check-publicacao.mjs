#!/usr/bin/env node
/**
 * check:publicacao — falha (exit 1) enquanto houver bloqueio de publicação. Lista cada bloqueio.
 *
 * Bloqueios verificados:
 *  1. NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR ligada (valor "1") no ambiente de build (variável de ambiente ou arquivos .env)
 *  2. `rascunho: true` ou "[A PREENCHER" em content/content.json (ignora `meta.*` e `paginas_legais.rascunho_*`)
 *  3. imagem renderizada com src "pendente" (placeholder "foto em breve") no HTML da build de produção
 *  4. site.dominio ou o número do WhatsApp "pendente"
 *  5. logo provisório (site.logo.provisorio = true)
 *
 * A checagem 3 gera uma build de produção com a flag desligada (em `.next-check`, sem tocar na `.next`)
 * e procura os placeholders no HTML, ou seja, o que realmente seria publicado.
 * Opções: --sem-build (pula a checagem 3), --manter (não apaga `.next-check`).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FLAG = "NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR";
const DIST = ".next-check";
const args = new Set(process.argv.slice(2));
const bloqueios = []; // { grupo, titulo, linhas[] }

const vermelho = (s) => `\x1b[31m${s}\x1b[0m`;
const verde = (s) => `\x1b[32m${s}\x1b[0m`;
const cinza = (s) => `\x1b[90m${s}\x1b[0m`;

function bloquear(grupo, titulo, linhas = []) {
  bloqueios.push({ grupo, titulo, linhas });
}

const pendente = (v) => v == null || String(v).trim() === "" || String(v).trim().toLowerCase() === "pendente";

// ---------- 1. flag de revisão ----------
function lerEnv(arquivo) {
  const caminho = path.join(RAIZ, arquivo);
  if (!fs.existsSync(caminho)) return null;
  const valores = {};
  for (const linha of fs.readFileSync(caminho, "utf8").split(/\r?\n/)) {
    const m = linha.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m || linha.trim().startsWith("#")) continue;
    valores[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
  }
  return valores;
}

function resolverFlag() {
  // Mesma precedência do Next em build de produção: variável de ambiente > .env.production.local > .env.local > .env.production > .env
  if (process.env[FLAG] !== undefined) return { valor: process.env[FLAG], fonte: "variável de ambiente" };
  for (const arquivo of [".env.production.local", ".env.local", ".env.production", ".env"]) {
    const env = lerEnv(arquivo);
    if (env && env[FLAG] !== undefined) return { valor: env[FLAG], fonte: arquivo };
  }
  return { valor: undefined, fonte: null };
}

const flag = resolverFlag();
if (flag.valor === "1") {
  bloquear("flag", `${FLAG}=1 (fonte: ${flag.fonte}). Em produção a variável não pode existir nem valer "1"`);
}

// ---------- 2 e 4. content.json ----------
const conteudo = JSON.parse(fs.readFileSync(path.join(RAIZ, "content", "content.json"), "utf8"));
const rascunhos = [];
const preencher = [];
// Fora da varredura de "[A PREENCHER": `meta` (anotações internas, nunca renderizadas) e o texto do próprio aviso de
// rascunho (`paginas_legais.rascunho_*`), que só aparece com `rascunho: true` e cita o marcador de propósito.
const IGNORADOS_PREENCHER = [/^meta(\.|$)/, /^paginas_legais\.rascunho_/];
(function andar(no, caminho) {
  if (typeof no === "string") {
    if (no.includes("[A PREENCHER") && !IGNORADOS_PREENCHER.some((re) => re.test(caminho))) {
      const trecho = [...no.matchAll(/\[A PREENCHER[^\]]*\]/g)].map((m) => m[0]).join(" ");
      preencher.push(`${caminho}  ${cinza(trecho)}`);
    }
    return;
  }
  if (Array.isArray(no)) return no.forEach((x, i) => andar(x, `${caminho}[${i}]`));
  if (no && typeof no === "object") {
    for (const [k, v] of Object.entries(no)) {
      if (k === "rascunho" && v === true) rascunhos.push(`${caminho ? caminho + "." : ""}${k} = true`);
      andar(v, caminho ? `${caminho}.${k}` : k);
    }
  }
})(conteudo, "");

if (rascunhos.length) bloquear("rascunho", `${rascunhos.length} página(s) legal(is) com rascunho: true (revisão jurídica pendente)`, rascunhos);
if (preencher.length) bloquear("a-preencher", `${preencher.length} campo(s) "[A PREENCHER" em content/content.json`, preencher);

if (pendente(conteudo.site?.dominio)) bloquear("dominio", `site.dominio = ${JSON.stringify(conteudo.site?.dominio)} (domínio não definido)`);
if (pendente(conteudo.site?.contato?.whatsapp?.numero)) {
  bloquear("whatsapp", `site.contato.whatsapp.numero = ${JSON.stringify(conteudo.site?.contato?.whatsapp?.numero)} (o CTA usa o wa.link, que não preenche mensagem)`);
}
if (conteudo.site?.logo?.provisorio === true) {
  bloquear("logo-provisorio", "site.logo.provisorio = true (logo provisório, não é o vetor oficial; trocar o arquivo e passar para false, ou decidir manter o PNG/SVG atual e registrar a decisão)");
}

// ---------- 3. imagens "pendente" renderizadas ----------
let infoBuild = "";
if (args.has("--sem-build")) {
  infoBuild = "checagem de imagens pulada (--sem-build)";
} else {
  const distAbs = path.join(RAIZ, DIST);
  fs.rmSync(distAbs, { recursive: true, force: true });
  const nextBin = path.join(RAIZ, "node_modules", "next", "dist", "bin", "next");
  const build = spawnSync(process.execPath, [nextBin, "build"], {
    cwd: RAIZ,
    env: { ...process.env, [FLAG]: "0", NEXT_DIST_DIR: DIST },
    encoding: "utf8",
  });
  if (build.status !== 0) {
    bloquear("build", "a build de produção falhou; não foi possível verificar as imagens", (build.stdout + build.stderr).trim().split("\n").slice(-12));
  } else {
    const paginas = [];
    (function coletar(dir) {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) coletar(p);
        else if (e.name.endsWith(".html")) paginas.push(p);
      }
    })(path.join(distAbs, "server", "app"));

    const decodificar = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#x27;/g, "'");
    const placeholders = [];
    for (const arquivo of paginas) {
      const rel = path.relative(path.join(distAbs, "server", "app"), arquivo).replace(/\\/g, "/").replace(/\.html$/, "");
      const rota = rel === "index" ? "/" : rel === "_not-found" ? "404" : "/" + rel;
      const html = fs.readFileSync(arquivo, "utf8");
      for (const m of html.matchAll(/<span[^>]*class="[^"]*placeholder[^"]*"[^>]*aria-label="([^"]*)"/g)) {
        placeholders.push(`${rota}  ${cinza(decodificar(m[1]))}`);
      }
    }
    infoBuild = `build de produção simulada (${FLAG}=0), ${paginas.length} página(s) analisada(s)`;
    if (placeholders.length) {
      bloquear("imagem-pendente", `${placeholders.length} imagem(ns) renderizada(s) com src "pendente" (placeholder "foto em breve")`, placeholders);
    }
  }
  if (!args.has("--manter")) fs.rmSync(distAbs, { recursive: true, force: true });
}

// ---------- relatório ----------
console.log("check:publicacao — bloqueios de publicação");
console.log(cinza(`flag ${FLAG}: ${flag.valor === undefined ? "não definida" : `"${flag.valor}" (${flag.fonte})`} | ${infoBuild}`));
console.log("");
if (bloqueios.length === 0) {
  console.log(verde("✔ Nenhum bloqueio encontrado."));
  process.exit(0);
}
for (const b of bloqueios) {
  console.log(vermelho(`✖ [${b.grupo}] ${b.titulo}`));
  for (const l of b.linhas) console.log(`    - ${l}`);
}
const total = bloqueios.reduce((s, b) => s + Math.max(1, b.linhas.length), 0);
console.log("");
console.log(vermelho(`FALHOU: ${bloqueios.length} tipo(s) de bloqueio, ${total} item(ns) a resolver antes de publicar.`));
process.exit(1);
