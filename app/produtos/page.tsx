    'use client' 

    import { useEffect, useInsertionEffect, useState } from 'react'
    import type { Produto } from '@/models/interfaces';
    import useSWR from 'swr';
    import Image from 'next/image'

    const API_URL = 'https://deisishop.pythonanywhere.com/products';

    const fetcher = async(url: string) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Erro: ${res.status} ${res.statusText}`);
        }   
        
        return res.json();
    }

    export default function ProdutosPage(){

        const [produtosFiltrados, setProdutosFiltradros] = useState<Produto[]>([])
        const [filtro, setFiltro] = useState("")

        // fetch de dados
        const {data,error,isLoading} = useSWR<Produto[]>(API_URL, fetcher);

        //efeitos
        useEffect(()=> {
            if(!data) return
            setProdutosFiltradros( data.filter(p => p.category === filtro) )
        },[filtro])

        // renderizacao

        if(error) return <p>Erro: {error.message}</p>
        if(isLoading) return <p>A carregar…</p>;
        if(!data) return null;

        const produtosOrdenados = [...data].sort((a, b) => a.price - b.price);

        return (
            <>
            <button
                className='bg-blue-400 p-2 rounded-xl'
                onClick={() => setFiltro('T-shirts')}
            >Mostrar Tshirts</button>

            {produtosOrdenados.map((p) => (
                <div key={p.id} className="m-4 p-3 border rounded-xl">
                    <Image
                        src={p.image}
                        width={120}
                        height={120}
                        alt={p.title}
                        className="rounded-xl mb-2"
                    />

                    <h2>{p.title}</h2>
                    <p>{p.description}</p>
                    <p><strong>Preço:</strong> {p.price} €</p>
                    <p>
                        <strong>Rating:</strong> {p.rating.rate} ⭐ ({p.rating.count} avaliações)
                    </p>
                </div>
            ))}
            </>
        );
    }