"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContadorPage() {
  // estados
  const [contagem, setConta] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  // Ler do localStorage quando o componente monta
  useEffect(() => {
    const countStored = localStorage.getItem("contagem");

    if (countStored !== null) {
      const valor = parseInt(countStored, 10);
      if (!Number.isNaN(valor)) {
        setConta(valor);
      }
    }
  }, []);

  // Guardar no localStorage sempre que a contagem muda
  useEffect(() => {
    localStorage.setItem("contagem", String(contagem));
  }, [contagem]);

  // Escolher cor dinamicamente
  const cor =
    contagem <= 3
      ? "text-red-700"
      : contagem <= 7
      ? "text-yellow-500"
      : "text-green-500";

  // Funções dos botões – aqui sim, mexemos na contagem e no histórico
  function somar() {
    const novoValor = contagem < 10 ? contagem + 1 : 10;
    setConta(novoValor);
    setHistorico((prev) => [...prev, novoValor]);
  }

  function diminuir() {
    const novoValor = contagem > 0 ? contagem - 1 : 0;
    setConta(novoValor);
    setHistorico((prev) => [...prev, novoValor]);
  }

  function reiniciar() {
    const novoValor = 0;
    setConta(novoValor);
    setHistorico((prev) => [...prev, novoValor]);
  }

  //renderização
  return (
    <>
      <h2>Vamos contar!!!</h2>
      <p>
        Hora de contar: <span className={cor}>{contagem}</span>
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 rounded-xl m-2"
        onClick={somar}
      >
        Somar
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 rounded-xl m-2"
        onClick={diminuir}
      >
        Diminuir
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 rounded-xl m-2"
        onClick={reiniciar}
      >
        Reiniciar
      </button>

      <h3>Histórico:</h3>
      <ul>
        {historico.map((num, idx) => (
          <li key={idx}>{num}</li>
        ))}
      </ul>
    </>
  );
}
