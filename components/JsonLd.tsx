/** Dados estruturados (`application/ld+json`). Escapa `<` para o JSON nunca fechar o `<script>`. */
export function JsonLd({ dados }: { dados: Record<string, unknown> | null }) {
  if (!dados) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}
