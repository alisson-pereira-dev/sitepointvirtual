"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import estilos from "./VideoLedTopo.module.css";

type Props = {
  /** WebM VP9 com fundo transparente. */
  src: string;
  /** Quadro estático com fundo transparente (capa sem JS, em reduced-motion e onde o vídeo não tem transparência). */
  capa: string;
  alt: string;
};

/** O primeiro quadro tem o canto vazio? Se o navegador ignorar a transparência do WebM (Safari), o canto vem opaco. */
function temTransparencia(video: HTMLVideoElement): boolean {
  try {
    const tela = document.createElement("canvas");
    tela.width = video.videoWidth;
    tela.height = video.videoHeight;
    const contexto = tela.getContext("2d");
    if (!contexto) return true;
    contexto.drawImage(video, 0, 0);
    return contexto.getImageData(0, 0, 1, 1).data[3] === 0;
  } catch {
    return true;
  }
}

/**
 * Animação decorativa do painel de LED, com fundo transparente, em loop e sem som. Toca só enquanto está na tela e
 * nunca com `prefers-reduced-motion` (aí fica a capa). Sem JS: capa parada.
 * Onde o WebM não tem transparência (um retângulo preto apareceria), fica só a capa.
 */
export function VideoLedTopo({ src, capa, alt }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const verificado = useRef(false);
  const [semTransparencia, setSemTransparencia] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observador.observe(video);
    return () => observador.disconnect();
  }, []);

  function aoCarregar() {
    const video = videoRef.current;
    if (!video || verificado.current) return;
    verificado.current = true;
    if (!temTransparencia(video)) {
      video.pause();
      setSemTransparencia(true);
    }
  }

  if (semTransparencia) {
    return (
      <div className={estilos.moldura}>
        <Image className={estilos.video} src={capa} alt={alt} width={512} height={300} unoptimized />
      </div>
    );
  }

  return (
    <div className={estilos.moldura}>
      <div role="img" aria-label={alt}>
        <video
          ref={videoRef}
          className={estilos.video}
          width={512}
          height={300}
          muted
          loop
          playsInline
          preload="none"
          poster={capa}
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={aoCarregar}
        >
          <source src={src} type="video/webm" />
        </video>
      </div>
    </div>
  );
}
