"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { trackEvent } from "@/lib/analytics";
import estilos from "./Abas.module.css";
import type { PropsAbas } from "./Abas";

/**
 * Versão interativa das abas (Radix Tabs: setas, Home/End, aria). Carregada sob demanda por `Abas.tsx`,
 * que mostra antes uma casca estática com o mesmo HTML e as mesmas classes. Se mudar a estrutura aqui,
 * mude lá também.
 */
export function AbasRadix({ grupos, rotuloId }: PropsAbas) {
  return (
    <Tabs.Root
      defaultValue={grupos[0]?.id}
      onValueChange={(grupo) => trackEvent("servico_aba_change", { grupo })}
    >
      <Tabs.List className={estilos.lista} aria-labelledby={rotuloId}>
        {grupos.map((grupo) => (
          <Tabs.Trigger key={grupo.id} value={grupo.id} className={estilos.aba} data-chave={grupo.id}>
            {grupo.rotulo}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className={estilos.paineis}>
        {grupos.map((grupo) => (
          <Tabs.Content key={grupo.id} value={grupo.id} forceMount className={estilos.painel}>
            <h3 className={estilos.rotuloGrupo}>{grupo.rotulo}</h3>
            {grupo.painel}
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
