import tecnologias from '@/data/tecnologias.json'
import Tecnologia from '@/components/Tecnologia/tecnologia'
import Link from 'next/link'
export default function TecnologiasPage(){
    return(
        <>
            <h2>Pagina Tecnologias</h2>

            <p>Nesta aplicacao usamos varias tecnologias</p>
            {tecnologias.map((tecnologias,index) =>(
                <Link key={index} href={`/tecnologias/${index}`}>
                    <Tecnologia
                    title = {tecnologias.title}
                    image = {tecnologias.image}
                    rating = {tecnologias.rating}
                    description= {tecnologias.description}
                    />
                </Link>
            )
            )}
        </>
    )
}