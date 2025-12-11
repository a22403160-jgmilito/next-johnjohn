'use client'

import { useEffect, useState } from 'react'
import type { Produto } from '@/models/interfaces';
import useSWR from 'swr';
import ProdutoCard from '@/components/ProdutoCard/produtoCard';

const API_URL = 'https://deisishop.pythonanywhere.com/products/';

const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erro: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export default function ProdutosPage() {

    const [produtosFiltrados, setProdutosFiltradros] = useState<Produto[]>([])
    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState<Produto[]>([])

    // fetch de dados
    const { data, error, isLoading } = useSWR<Produto[]>(API_URL, fetcher);

    // testar se está a receber dados
    useEffect(() => {
        if (data) {
            console.log('Produtos recebidos:', data);
            // caso querer ver no UI:
            // console.log(JSON.stringify(data, null, 2));
        }
    }, [data]);

    // quando os dados carregam, mostra todos
    useEffect(() => {
        if (!data) return;
        setProdutosFiltradros(data);
    }, [data]);

    function pesquisa() {
        if (!data) return;

        const termo = search.toLowerCase().trim();

        if (termo === "") {
            setFilteredData([]);
            setProdutosFiltradros(data);
            return;
        }

        const resultados = data.filter((prod) => {
            const textoCompleto = `
            ${prod.title}
            ${prod.category}
            ${prod.description}
            ${prod.price}
            `.toLowerCase();
            return textoCompleto.includes(termo);
        });

        setFilteredData(resultados);
        setProdutosFiltradros(resultados);
    }


    // tratamento de erro
    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">
                    Erro ao carregar produtos: {error.message}
                </p>
            </div>
        );
    }

    // spinner enquanto carrega
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) return null;

    const produtosOrdenados = [...produtosFiltrados].sort((a, b) => a.price - b.price);

    return (
        <div className="px-4">
            <h1 className="text-2xl font-bold mb-4">Produtos</h1>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Pesquisar produto pelo nome…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded-xl flex-1"
                />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                    onClick={pesquisa}
                >
                    Pesquisar
                </button>
            </div>
            <div className="flex flex-col">
                {produtosOrdenados.map((p) => (
                    <ProdutoCard key={p.id} produto={p} />
                ))}
            </div>
        </div>
    );
}
