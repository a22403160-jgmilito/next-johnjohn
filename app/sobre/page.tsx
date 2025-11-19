import Image from 'next/image'
export default function Sobre(){
    return(
        <div>
            <h1>Sobre React e Next</h1>
            <Image
            src = "/tecnologias/react.svg"
            alt="Logotipo do React"
            width={200}
            height={200}
            />

        </div>
    )
}