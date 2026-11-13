import estilos from "./Passo.module.css";

type Props = {
  numero: number;
  titulo: string;
  descricao: string;
};

/**
 * Passo numerado (`li` de uma `ol`). O numeral fica fora do cartão e a linha de ligação
 * (vertical no mobile, horizontal no desktop) é só decoração.
 */
export function Passo({ numero, titulo, descricao }: Props) {
  return (
    <li className={estilos.passo}>
      <div className={estilos.cabeca}>
        <span className={estilos.numero}>{numero}</span>
        <span className={estilos.linha} aria-hidden="true" />
      </div>
      <div className={estilos.cartao}>
        <h3 className={estilos.titulo}>{titulo}</h3>
        <p className={estilos.descricao}>{descricao}</p>
      </div>
    </li>
  );
}
