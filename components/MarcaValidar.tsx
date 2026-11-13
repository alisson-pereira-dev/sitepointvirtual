import { getContent } from "@/lib/content";
import estilos from "./MarcaValidar.module.css";

/** Marca visível de item `validar: true` (só existe quando a flag de revisão está ligada). */
export function MarcaValidar() {
  return <span className={estilos.marca}>{getContent().microcopy.validar.rotulo}</span>;
}
