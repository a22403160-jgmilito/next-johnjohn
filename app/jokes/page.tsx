
'use client'
import {Joke} from '@/models/interfaces'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
//funcao auxiliar
const fetcher = async(url:string) => {
    const res = await fetch(url)

    if(!res.ok){
        throw new Error(`Erro: ${res.status} ${res.statusText}`)
    }
    return res.json()
}

export default function JokesPage(){

    //estados
    const [type,setType] = useState('')
    const [filterJokes, setFilterJokes] = useState<Joke[]>([])

    // Obter (fetch) dados
    const url  = 'https://official-joke-api.appspot.com/jokes/random/100'
    const{data: jokes,error,isLoading} = useSWR<Joke[]>(url, fetcher)

    //efeitos
    useEffect(() => {
        if(!jokes) return
        setFilterJokes(jokes?.filter(joke => joke.type === type))
    }, [type])

    //redenrizacao
    if(error) return <p>{error.message}</p>
    if(isLoading) return <p>isLoading.message</p>
    if(!filterJokes) return <p>Nao existe anedotas</p>

    return (
    <>
        <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='text-2xl p-2 m-2 font-bold bg-blue-400 rounded-2xl'
        >
            <option value= "programming">Programming jokes</option>
            <option value= "general">General jokes </option>

        </select>
        <button
            className='p-2 m-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-600 rounded-2xl'
            onClick={() => setType('programming')}
        >
            Progaming Jokes
        </button>
         <button
            className='p-2 m-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-600 rounded-2xl'
            onClick={() => setType('general')}
        >
            General Jokes
        </button>
        {filterJokes.map(joke => (
            <Link
                href={`jokes/${joke.id}`}
            >
                <div className="py-2 px-4 m-2 bg-amber-300 rounded-2xl"> 
                <p className="font-bold">{joke.setup}</p>
            </div>
            
            </Link>
            ))}
    </>
    )
}