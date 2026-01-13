Exemplo sobre o swr:

const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erro: ${res.status} ${res.statusText}`);
    }

    return res.json();
}
//Estados

const [type,sretType] = useState('')
const [filterJokes,setFilter] = useState<Joke[]>([])

//obter fetch
const url = ...
const {data, error, isLoading} = useSWR<JOKE[]>(url,fether)
//efeitos
useEffect(()=> {
    if(!Jokes) return
    setFilter(jokes.filter(joke=> joke.type === type))
},[type])


if(error) return <p>error.message</p>
if(isLoading) return <p>A carregar</p>
if(!filterJokes) return <p>Nao existem anedotas</p>

<button onClick={()=> setType('general')}>
general jokes
</button>

{filterJokes.map(joke => (
<div>
<p>{joke.setup}</p>
<p>{joke.punchline}</p>
</div>
))}


interface SaudacaoProps { nome: string; idade: number; } 
export default function Saudacao(props: SaudacaoProps) {
   return <p>{props.nome} tem {props.idade} anos.</p>;
}

Seletor com useState
Estado reativo, atualiza automaticamente o interface

'use client'
import { useState } from 'react'
export default function SeletorTecno() {
  const [opcao, setOpcao] = useState("")
  return (
    <section>      
    <h2>Tecnologias</h2>
    <select
    value={opcao}
    onChange={(e) => setTexto(e.target.value)}
/>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
    <select>
       <p>Tecnologia escolhida: {texto}</p> 
    </section>
)}
