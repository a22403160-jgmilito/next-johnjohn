'use client'

import tecnologias from '@/data/tecnologias.json'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function TecnologiaPage(){

    const params = useParams()
    const index = Number(params.tecnologia)

    return (
        <div className='flex flex-col justify-center items-center'>
            <img
                src={`/tecnologias/${tecnologias[index].image}`}
                alt={tecnologias[index].title}
                className="w-20 h-20"
            />
            <h2 className="text-xl font-semibold">Tecnologia {tecnologias[index].title}</h2>
            <p>Descricao:</p>
            <p>{tecnologias[index].description}</p> 
            <p>O rating é {'⭐'.repeat(tecnologias[index].rating)}{' '}
            <span className="rating-num">{tecnologias[index].rating}/5</span></p>

            <Link href= "/tecnologias" className='mt-5 inline-block transition-all duration-200 hover:translate-x-1 hover:underline'>Voltar</Link>
        </div>
    )
}