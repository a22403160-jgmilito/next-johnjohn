'use client';

import Image from 'next/image';
import type { Produto } from '@/models/interfaces';

const IMAGE_BASE_URL = 'https://deisishop.pythonanywhere.com';

interface ProdutoDetalheProps {
  produto: Produto;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  const imageUrl = produto.image.startsWith('http')
    ? produto.image
    : IMAGE_BASE_URL + produto.image;

  return (
    <div className="max-w-xl mx-auto border rounded-xl p-4 shadow-sm">
      <Image
        src={imageUrl}
        width={220}
        height={220}
        alt={produto.title}
        className="rounded-xl mb-4 mx-auto"
      />

      <h1 className="text-2xl font-bold mb-2 text-center">
        {produto.title}
      </h1>

      <p className="text-center text-sm text-gray-600 mb-2">
        Categoria: {produto.category}
      </p>

      <p className="text-lg font-bold text-blue-600 mb-4 text-center">
        {produto.price} €
      </p>

      <p className="mb-4">
        {produto.description}
      </p>

      <p className="mb-2">
        <strong>Rating:</strong> {produto.rating.rate} ⭐ ({produto.rating.count} avaliações)
      </p>
    </div>
  );
}
