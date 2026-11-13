import { Midia } from "./Midia";
import estilos from "./CartaoServico.module.css";

type Props = {
  nome: string;
  descricao: string;
  imagem: { src: string; alt: string };
  /** Colunas do grupo no desktop (4 por padrão; grupos de 2 itens usam cartões mais largos). */
  colunas?: number;
};

/** Um serviço: foto 4:3, nome e descrição sempre visível. Sem moldura, não clicável (sem foco). Vive dentro do CarrosselSnap (`li`). */
export function CartaoServico({ nome, descricao, imagem, colunas = 4 }: Props) {
  // Largura aproximada do cartão no desktop, para o navegador escolher um arquivo nítido (2 colunas ≈ 45vw, 4 ≈ 25vw).
  const larguraDesktop = colunas <= 2 ? "45vw" : "25vw";
  return (
    <li>
      <div className={estilos.cartao}>
        <Midia
          src={imagem.src}
          alt={imagem.alt}
          proporcao="4-3"
          raio="xl"
          largura={960}
          altura={720}
          sizes={`(min-width: 1024px) ${larguraDesktop}, (min-width: 768px) 45vw, 85vw`}
          className={estilos.foto}
        />
        <h3 className={estilos.nome}>{nome}</h3>
        <p className={estilos.descricao}>{descricao}</p>
      </div>
    </li>
  );
}
