import { notFound } from "next/navigation";
import { getContent, partirMarcadores } from "@/lib/content";
import estilos from "./teste.module.css";

export const metadata = { robots: { index: false, follow: false } };

const ESCALA = ["display", "h1", "h2", "h3", "body-lg", "body", "small"] as const;

const CORES = [
  "bg",
  "bg-alt",
  "surface",
  "text",
  "text-muted",
  "primary",
  "primary-hover",
  "primary-subtle",
  "accent",
  "border",
  "border-strong",
  "success",
  "danger",
  "info",
] as const;

const ESPACOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const SOMBRAS = [1, 2, 3, 4] as const;

/** Página de teste dos tokens (T1.1). Só existe em desenvolvimento. */
export default function PaginaDeTeste() {
  if (process.env.NODE_ENV === "production") notFound();

  const { hero } = getContent().secoes;
  const frase = partirMarcadores(hero.headline)
    .filter((p): p is string => typeof p === "string")
    .join("")
    .replace(/\s+/g, " ")
    .trim();
  const paragrafo = hero.subheadline;

  const pagina = (
    <>
      <section className={estilos.bloco}>
        {ESCALA.map((nome) => (
          <div key={nome} className={estilos.linhaTipo}>
            <code>--text-{nome}</code>
            <p className={estilos[`t-${nome}`]}>{nome === "body" || nome === "small" || nome === "body-lg" ? paragrafo : frase}</p>
          </div>
        ))}
      </section>

      <section className={estilos.bloco}>
        <div className={estilos.grade}>
          {CORES.map((nome) => (
            <div key={nome} className={estilos.amostra}>
              <span className={estilos.cor} style={{ background: `var(--color-${nome})` }} />
              <code>--color-{nome}</code>
            </div>
          ))}
        </div>
      </section>

      <section className={estilos.bloco}>
        <div className={estilos.grade}>
          {ESPACOS.map((n) => (
            <div key={n} className={estilos.amostra}>
              <span className={estilos.espaco} style={{ width: `var(--space-${n})` }} />
              <code>--space-{n}</code>
            </div>
          ))}
          {SOMBRAS.map((n) => (
            <div key={n} className={estilos.amostra}>
              <span className={estilos.sombra} style={{ boxShadow: `var(--shadow-${n})` }} />
              <code>--shadow-{n}</code>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  return (
    <main className="container">
      <div className={estilos.superficie}>{pagina}</div>
      <div className={estilos.superficie} data-surface="dark">
        {pagina}
      </div>
    </main>
  );
}
