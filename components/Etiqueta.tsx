import estilos from "./Etiqueta.module.css";

type Props = { texto: string };

export function Etiqueta({ texto }: Props) {
  return <p className={estilos.etiqueta}>{texto}</p>;
}
