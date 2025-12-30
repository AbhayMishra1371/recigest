import { RecipeCard } from "@/components/RecipeCard"

const trendingRecipes = [
  {
    id: 1,
    title: "Golden Turmeric Noodle Bowl",
    image: "/assets/turmeric-noodles.webp",
    time: "20 Mins",
    difficulty: "Easy",
    protein: "High Protein",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Spicy Roasted Veggie Tacos",
    image: "/assets/veggie-tacos.webp",
    time: "20 Mins",
    difficulty: "Easy",
    protein: "High Protein",
    isFavorite: true,
  },
  {
    id: 3,
    title: "Creamy Spinach & Mushroom Pasta",
    image: "/assets/mushroom-pasta.webp",
    time: "30 Mins",
    difficulty: "Easy",
    protein: "High Protein",
    isFavorite: true,
  },
]

export function TrendingDishes() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 md:py-16 bg-[#F5F3EE]">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E3D] mb-8">Trending Dishes This Week</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}
