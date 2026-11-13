import type { CSSProperties, ReactNode } from "react";
import { Midia } from "./Midia";
import estilos from "./CartaoTrabalho.module.css";

type Props = {
  imagem: { src: string; alt: string };
  nome: string;
  categoria: string;
  /** Posição na linha da grade (0, 1, 2): escalona a entrada no desktop. */
  coluna: number;
  /** Adereço opcional (marca "A validar" no modo revisão). */
  marca?: ReactNode;
};

type VariaveisCss = CSSProperties & Record<`--${string}`, string | number>;

/** Foto de trabalho com legenda abaixo, sem moldura e não clicável. Vive dentro de uma `ul` (`li`). */
export function CartaoTrabalho({ imagem, nome, categoria, coluna, marca }: Props) {
  const estilo: VariaveisCss = { "--i": coluna };
  return (
    <li data-reveal="" style={estilo}>
      <div className={estilos.cartao}>
        <Midia
          src={imagem.src}
          alt={imagem.alt}
          proporcao="1-1"
          raio="nenhum"
          largura={720}
          altura={720}
          sizes="(min-width: 768px) 30vw, 45vw"
          className={estilos.foto}
        />
        <p className={estilos.nome}>{nome}</p>
        <p className={estilos.categoria}>
          {categoria}
          {marca}
        </p>
      </div>
    </li>
  );
}
