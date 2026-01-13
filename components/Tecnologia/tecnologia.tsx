import Link from "next/link"
import tecnologias from "@/data/tecnologias.json"
interface TecnologiaProps {
    title: string
    description: string
    image: string
    rating: number
}
export default function Tecnologia({ title, description, image, rating }: TecnologiaProps) {
    return (
        <div className="bg-green-500 rounded-xl p-4 hover:bg-green-600 active:bg-green-700 flex gap-4 items-start my-4">
            <img
                src={`/tecnologias/${image}`}
                alt={title}
                className="w-10 h-10"
            />
            <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm">{description}</p>
                <p>{'⭐'.repeat(rating)}{' '}
            <span className="rating-num">{rating}/5</span></p>
            </div>
        </div>
    )
}