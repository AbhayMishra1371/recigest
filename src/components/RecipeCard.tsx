import Image from "next/image"
import { Clock, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Recipe {
  id: number
  title: string
  image: string
  time: string
  difficulty: string
  protein: string
  isFavorite: boolean
}

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-[#2C3E3D] mb-3 leading-tight">{recipe.title}</h3>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge variant="secondary" className="bg-[#F5F5F5] text-[#2C3E3D] text-xs font-medium px-2.5 py-1">
            <Clock className="w-3 h-3 mr-1" />
            {recipe.time}
          </Badge>
          <Badge variant="secondary" className="bg-[#F5F5F5] text-[#2C3E3D] text-xs font-medium px-2.5 py-1">
            {recipe.difficulty}
          </Badge>
          <Badge variant="secondary" className="bg-[#F5F5F5] text-[#2C3E3D] text-xs font-medium px-2.5 py-1">
            {recipe.protein}
          </Badge>
        </div>

        {recipe.isFavorite && (
          <div className="flex items-center gap-1.5 text-[#5BA89D] text-sm font-medium">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>AI Matched Favorite</span>
          </div>
        )}
      </div>
    </div>
  )
}

