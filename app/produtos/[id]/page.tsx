'use client';

import useSWR from 'swr';
import type { Produto } from '@/models/interfaces';
import ProdutoDetalhe from '@/components/ProdutoDetalhe/produtoDetalhe';
import Link from 'next/link';

const API_URL = 'https://deisishop.pythonanywhere.com/products/';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

type PageProps = {
  params: {
    id: string; // bate com o nome da pasta [id]
  };
};

export default function ProdutoPage({ params }: PageProps) {
  const { id } = params;

  const { data, error, isLoading } = useSWR<Produto>(
    `${API_URL}${id}`,
    fetcher
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">
          Erro ao carregar produto: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4">
      <ProdutoDetalhe produto={data} />

      <div className="mt-4 text-center">
        <Link
          href="/produtos"
          className="inline-block bg-gray-200 px-4 py-2 rounded-lg"
        >
          Voltar à lista de produtos
        </Link>
      </div>
    </div>
  );
}
