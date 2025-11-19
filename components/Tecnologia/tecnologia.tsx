import Link from "next/link"
import tecnologias from "@/data/tecnologias.json"
interface TecnologiaProps{
    title : string
    description : string
}
export default function Tecnologia({title,description}: TecnologiaProps){
    return(
        <>
         <h2>{title}</h2>
            <p>{description}</p>
        </>
    )
}