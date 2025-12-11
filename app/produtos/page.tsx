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

    const [ordenacao, setOrdenacao] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('price-asc')

    // estado do carrinho – já lê do localStorage na inicialização
    const [cart, setCart] = useState<Produto[]>(() => {
        if (typeof window === 'undefined') {
            return [];
        }
        try {
            const stored = localStorage.getItem('cart');
            if (stored) {
                return JSON.parse(stored) as Produto[];
            }
        } catch (e) {
            console.error('Erro ao ler cart do localStorage na inicialização', e);
        }
        return [];
    });

    const [isStudent, setIsStudent] = useState(false)
    const [coupon, setCoupon] = useState("")
    const [buyResult, setBuyResult] = useState<any | null>(null)
    const [buyError, setBuyError] = useState<string | null>(null)


    // fetch de dados
    const { data, error, isLoading } = useSWR<Produto[]>(API_URL, fetcher);

    // sempre que o carrinho mudar, guardar no localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // testar se está a receber dados
    useEffect(() => {
        if (data) {
            console.log('Produtos recebidos:', data);
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
        ${prod.price}
      `.toLowerCase();
            return textoCompleto.includes(termo);
        });

        setFilteredData(resultados);
        setProdutosFiltradros(resultados);
    }

    // funções do carrinho:
    function addToCart(produto: Produto) {
        setCart((prev) => {
            // não deixa duplicar o mesmo produto
            if (prev.some((p) => p.id === produto.id)) {
                return prev;
            }
            return [...prev, produto];
        });
    }

    function removeFromCart(produto: Produto) {
        setCart((prev) => prev.filter((p) => p.id !== produto.id));
    }

    async function buy() {
        if (cart.length === 0) {
            alert('Carrinho vazio!');
            return;
        }

        try {
            setBuyError(null);
            setBuyResult(null);

            const response = await fetch('https://deisishop.pythonanywhere.com/buy/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: cart.map((product) => product.id),
                    name: "",                
                    student: isStudent,       
                    coupon: coupon.trim(),    
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Erro ${response.status}: ${text}`);
            }

            const dataResposta = await response.json();
            console.log('Resposta da compra:', dataResposta);
            setBuyResult(dataResposta);

            // limpa carrinho
            setCart([]);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cart');
            }
        } catch (err: any) {
            console.error('Erro ao comprar', err);
            setBuyError(err.message ?? 'Erro ao comprar');
        }
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

    const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
        switch (ordenacao) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.title.localeCompare(b.title);
            case 'name-desc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    // total do carrinho (number)
    const totalCarrinho = cart.reduce(
        (soma, p) => soma + Number(p.price),
        0
    );

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
                <select
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value as any)}
                    className="border p-2 rounded-xl"
                >
                    <option value="price-asc">Preço ↑</option>
                    <option value="price-desc">Preço ↓</option>
                    <option value="name-asc">Nome A–Z</option>
                    <option value="name-desc">Nome Z–A</option>
                </select>
            </div>

            {/* lista principal de produtos */}
            <div className="flex flex-col">
                {produtosOrdenados.map((p) => (
                    <ProdutoCard
                        key={p.id}
                        produto={p}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>

            {/* secção do carrinho */}
            <div className="mt-8 border-t pt-4">
                <h2 className="text-xl font-semibold mb-2">Carrinho</h2>

                {cart.length === 0 && (
                    <p className="text-gray-500">Nenhum produto no carrinho.</p>
                )}

                {cart.length > 0 && (
                    <>
                        <div className="flex flex-col">
                            {cart.map((p) => (
                                <ProdutoCard
                                    key={p.id}
                                    produto={p}
                                    isInCart
                                    onRemoveFromCart={removeFromCart}
                                />
                            ))}
                        </div>

                        {/* ⚙️ Opções de compra */}
                        <div className="mt-4 flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isStudent}
                                    onChange={(e) => setIsStudent(e.target.checked)}
                                />
                                Estudante DEISI
                            </label>

                            <input
                                type="text"
                                placeholder="Cupão de desconto"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="border p-2 rounded"
                            />

                            <button
                                onClick={buy}
                                disabled={cart.length === 0}
                                className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                Comprar
                            </button>
                        </div>

                        <p className="text-right text-lg font-bold mt-4">
                            Total: {totalCarrinho.toFixed(2)} €
                        </p>
                        {buyError && (
                            <p className="text-red-600 mt-2">
                                Erro ao comprar: {buyError}
                            </p>
                        )}
                        {buyResult && (
                            <div className="mt-4 p-4 bg-blue-100 rounded-xl shadow-sm text-sm">
                                <h3 className="font-semibold mb-2">Resumo da compra</h3>

                                <p className="mb-1">
                                    <strong>Total:</strong> {buyResult.totalCost} €
                                </p>

                                <p className="mb-1">
                                    <strong>Referência:</strong> {buyResult.reference}
                                </p>

                                <p className="mb-1">
                                    <strong>Mensagem:</strong> {buyResult.message}
                                </p>

                                {buyResult.error && buyResult.error !== "" && (
                                    <p className="mt-1 text-red-600">
                                        <strong>Erro:</strong> {buyResult.error}
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
