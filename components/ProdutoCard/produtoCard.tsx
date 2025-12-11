'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Produto } from '@/models/interfaces';

const IMAGE_BASE_URL = 'https://deisishop.pythonanywhere.com';

interface ProdutoCardProps {
  produto: Produto;
  onAddToCart?: (produto: Produto) => void;
  onRemoveFromCart?: (produto: Produto) => void;
  isInCart?: boolean;
}

export default function ProdutoCard({ produto, onAddToCart, onRemoveFromCart, isInCart }: ProdutoCardProps) {
  const imageUrl = produto.image.startsWith('http')
    ? produto.image
    : IMAGE_BASE_URL + produto.image;

  const rating = produto.rating?.rate ?? 0;
  const estrelasInteiras = Math.floor(rating);
  const meiaEstrela = rating % 1 >= 0.5;
  const maxEstrelas = 5;

  const estrelas = '⭐'.repeat(estrelasInteiras)
    + (meiaEstrela ? '✰' : '')
    + '☆'.repeat(maxEstrelas - estrelasInteiras - (meiaEstrela ? 1 : 0));

  return (
    <div className="m-4 p-3 border rounded-xl shadow-sm">
      <Image
        src={imageUrl}
        width={160}
        height={160}
        alt={produto.title}
        className="rounded-xl mb-2 mx-auto"
      />

      <h2 className="font-semibold text-lg mb-1 text-center">
        {produto.title}
      </h2>

      <p className="text-center text-sm text-gray-600 mb-1">
        Categoria: {produto.category}
      </p>

      <p className="text-center font-bold text-black-600 mb-2">
        Preço: {produto.price} €
      </p>

      <div className="text-center text-yellow-500 text-lg mb-2">
        {estrelas}
        <span className="text-gray-600 text-sm ml-2">
          ({produto.rating.rate}) · {produto.rating.count} avaliações
        </span>
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {/* botão + info (detalhes) */}
        <Link
          href={`/produtos/${produto.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
        >
          + info
        </Link>

        {/* botão de carrinho: adiciona ou remove conforme o contexto */}
        {onAddToCart && !isInCart && (
          <button
            onClick={() => onAddToCart(produto)}
            className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Adicionar
          </button>
        )}

        {onRemoveFromCart && isInCart && (
          <button
            onClick={() => onRemoveFromCart(produto)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  );
}
