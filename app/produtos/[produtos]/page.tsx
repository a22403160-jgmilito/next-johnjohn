'use client';

import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import type { Produto } from '@/models/interfaces';
import ProdutoDetalhe from '@/components/ProdutoDetalhe/produtoDetalhe';
import Link from 'next/link';

const API_URL = 'https://deisishop.pythonanywhere.com/products/';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const textoErro = await res.text();
    console.error('Erro na API DEISI Shop:', res.status, res.statusText, textoErro);
    throw new Error(`Erro: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export default function ProdutoPage() {
  const pathname = usePathname();
  // "/produtos/6" → ["", "produtos", "6"] → "6"
  const partes = pathname.split('/').filter(Boolean);
  const lastSegment = partes[partes.length - 1];

  const idNumber = Number(lastSegment);

  if (!lastSegment || Number.isNaN(idNumber)) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">
          ID inválido na rota: {String(lastSegment)}
        </p>
      </div>
    );
  }

  const url = `${API_URL}${idNumber}`;
  console.log('URL do detalhe:', url);

  const { data, error, isLoading } = useSWR<Produto>(url, fetcher);

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

      <div className="mt-6 text-center">
        <Link
          href="/produtos"
          className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Voltar à lista de produtos
        </Link>
      </div>
    </div>
  );
}
