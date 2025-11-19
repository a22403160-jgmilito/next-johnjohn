"use client"; // IMPORTANTE no Next.js 13+ para usar useState

import { useState } from "react";
import Componente1 from "@/components/Componente1/Componente1"
import Componente2 from "@/components/Componente1/componente2"
import Magia from '@/components/MagiaDoJSX/MagiaDoJSX'
import CaracteristicasPage from "./características/page"

export default function page(){

  const frase = <p>JSX faz magia</p>
  const ano = 2025
  // estado para mostrar ou esconder características
  const [mostrar, setMostrar] = useState(false);

  return(
    <div style={{ textAlign: "center" }}>
    <h1>Ola </h1>
    <p>O meu primeiro componete React</p>
    {frase}
    <p>{ano}</p>
    <Componente1/>
    <Componente2/>
    <Magia/>
    <button onClick={() => setMostrar(!mostrar)}>
        Mostrar características
      </button>
      {mostrar && <CaracteristicasPage />}
    </div>
  )
}