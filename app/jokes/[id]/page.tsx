'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

import useSWR from 'swr'
import { Joke } from '@/models/interfaces'
//funcao auxiliar
const fetcher = async(url:string) => {
    const res = await fetch(url)

    if(!res.ok){
        throw new Error(`Erro: ${res.status} ${res.statusText}`)
    }
    return res.json()
}

export default function JokePage(){

    //variaveis
    const params = useParams()
    const id = params.id

    // Obter (fetch) dados
    const url  = `https://official-joke-api.appspot.com/jokes/${id}`
    const{data: joke,error,isLoading} = useSWR<Joke>(url, fetcher)

    //redenrizacao
    if(error) return <p>{error.message}</p>
    if(isLoading) return <p>isLoading.message</p>
    if(!joke) return <p>Nao existe anedotas</p>

    return (
        <>
            <p className='font-bold'>{joke.setup}</p>
            <p>{joke.punchline}</p>
        </>
            
        
    )
}