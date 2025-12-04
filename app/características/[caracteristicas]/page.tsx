import Link from "next/link";

const caracteristicas = [
  "JSX, sintaxe que mistura HTML e JS.",
  "Componentes, funções que retornam JSX.",
  "Componentes Reutilizáveis e Modulares.",
  "Roteamento Automático e APIs.",
  "Hooks: useState, useEffect e useSWR.",
  "Renderização Rápida e SEO Friendly.",
  "TypeScript Seguro e Escalável.",
  "Comunidade Ativa e Popularidade.",
];

type PageProps = {
  params: {
    caracteristicas: string; // vem da URL, como string
  };
};

export default function CaracteristicaPage({ params }: PageProps) {
  const index = Number(params.caracteristicas);
  const texto = caracteristicas[index];

  if (!texto) {
    return (
      <div>
        <h2>Característica não encontrada</h2>
        <Link href="/características">Voltar</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Característica {index + 1}</h2>
      <p>{texto}</p>

      <p>
        <Link href="/características">Voltar à lista</Link>
      </p>
    </div>
  );
}
