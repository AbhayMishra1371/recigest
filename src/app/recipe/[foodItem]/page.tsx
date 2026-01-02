"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Loader2, ChefHat, ArrowLeft, Clock, Flame, BarChart } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";


import { RecipeData } from "@/types";
import { generateImageUrl } from "@/lib/image";

export default function RecipePage() {
  const params = useParams();
  const query = params.foodItem ? decodeURIComponent(params.foodItem as string) : null;
  
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        setError(null);
        setImageLoading(true); // Reset image loading state
        const res = await api.post("/recipe/generate", { food: query });
        
        if (res.data.success) {
            // Redis cache might return an object, while fresh API returns string
            // Handle both cases to prevent crashes
            let jsonRecipe;
            try {
              if (typeof res.data.recipe === 'string') {
                  // Advanced cleaning: extract content between first { and last }
                  let rawContent = res.data.recipe.trim();
                  
                  // Remove markdown code blocks if present
                  rawContent = rawContent.replace(/^```json\n?/, '').replace(/\n?```$/, '');
                  
                  const firstBrace = rawContent.indexOf('{');
                  const lastBrace = rawContent.lastIndexOf('}');
                  
                  if (firstBrace !== -1 && lastBrace !== -1) {
                      rawContent = rawContent.substring(firstBrace, lastBrace + 1);
                  }
                  
                  jsonRecipe = JSON.parse(rawContent);
              } else {
                  jsonRecipe = res.data.recipe;
              }
            } catch (parseError) {
              console.error("JSON Parse Error:", parseError, res.data.recipe);
              setError("The chef's handwriting was a bit messy. Please try generating again.");
              setLoading(false);
              return;
            }
            setRecipe(jsonRecipe);
        } else {
            setError(res.data.error || "Failed to generate recipe.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while asking the chef.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [query]);

  if (!query) return null; 

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-20">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 md:pt-36">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-fade-in">
             <div className="relative">
                <div className="absolute inset-0 bg-[#AA4D4D]/20 blur-xl rounded-full"></div>
                <ChefHat className="w-16 h-16 text-[#AA4D4D] relative z-10 animate-bounce" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-bold text-[#3D4A3E]">The Chef is Cooking...</h2>
                <p className="text-gray-500">Conjuring a delicious recipe for &quot;{query}&quot;</p>
            </div>
            <Loader2 className="w-8 h-8 text-[#AA4D4D] animate-spin mt-4" />
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 max-w-md w-full">
                <h2 className="text-xl font-bold text-red-800 mb-2">Oops!</h2>
                <p className="text-red-600 mb-6">{error}</p>
                <Link href="/">
                    <Button className="bg-[#AA4D4D] hover:bg-[#823131] text-white rounded-full">
                        Try Again
                    </Button>
                </Link>
            </div>
          </div>
        ) : recipe ? (
          <div className="max-w-4xl mx-auto animate-slide-up">
            
            {/* Header Section */}
            <div className="mb-8">
                <Button variant="ghost" className="rounded-full gap-2 text-gray-500 hover:text-[#3D4A3E] mb-6 pl-0 hover:bg-transparent" asChild>
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Search
                  </Link>
                </Button>

                {/* Dynamic Hero Image */}
                <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-3xl overflow-hidden shadow-lg group bg-gray-100">
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-[#AA4D4D]/40 animate-spin" />
                    </div>
                  )}
                  <NextImage
                    src={generateImageUrl(query, recipe.visual_prompt)}
                    alt={recipe.name}
                    fill
                    priority
                    unoptimized
                    onLoad={() => setImageLoading(false)}
                    className={`object-cover transition-all duration-700 group-hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    sizes="(max-width: 768px) 100vw, 1280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full">
                     <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                        {recipe.name}
                    </h1>
                     <p className="text-sm md:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow-sm line-clamp-3 md:line-clamp-none">
                        {recipe.description}
                    </p>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="flex flex-wrap gap-2 md:gap-4 mt-6">
                    <div className="flex items-center gap-1.5 md:gap-2 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm border border-[#F5F3EE] text-[#5A7C5E]">
                        <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="font-medium text-xs md:text-sm">{recipe.time?.total || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm border border-[#F5F3EE] text-[#D97706]">
                        <Flame className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="font-medium text-xs md:text-sm">{recipe.calories}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm border border-[#F5F3EE] text-[#AA4D4D]">
                        <BarChart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="font-medium text-xs md:text-sm">{recipe.difficulty}</span>
                    </div>
                     <div className="flex items-center gap-1.5 md:gap-2 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm border border-[#F5F3EE] text-[#2C3E3D]">
                        <span className="font-bold text-xs md:text-sm">Cuisine:</span>
                        <span className="font-medium text-xs md:text-sm">{recipe.cuisine}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Ingredients */}
                <div className="md:col-span-1">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-[#F5F3EE] md:sticky md:top-32">
                        <h3 className="text-xl font-bold text-[#3D4A3E] mb-4">Ingredients</h3>
                        <ul className="space-y-3">
                            {recipe.ingredients.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 group">
                                    <input type="checkbox" className="mt-1.5 accent-[#5A7C5E] w-4 h-4 rounded cursor-pointer" />
                                    <span className="text-gray-700 leading-snug group-hover:text-[#3D4A3E] transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Instructions */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm border border-[#F5F3EE]">
                         <h3 className="text-xl font-bold text-[#3D4A3E] mb-6">Instructions</h3>
                         <div className="space-y-8">
                            {recipe.instructions.map((step, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#F5F3EE] rounded-full flex items-center justify-center text-[#5A7C5E] font-bold text-sm">
                                        {idx + 1}
                                    </div>
                                    <p className="text-[#2C3E3D] leading-relaxed pt-1">
                                        {step}
                                    </p>
                                </div>
                            ))}
                         </div>
                    </div>

                    {/* Macros & Tips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-[#E8F5E9]/50 rounded-3xl p-6 border border-[#E8F5E9]">
                             <h4 className="font-bold text-[#2E7D32] mb-3 flex items-center gap-2">
                                🌱 Nutrition
                             </h4>
                             <div className="space-y-2 text-sm text-[#1B5E20]">
                                <div className="flex justify-between">
                                    <span>Protein</span>
                                    <span className="font-bold">{recipe.macros?.protein || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Carbs</span>
                                    <span className="font-bold">{recipe.macros?.carbs || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Fats</span>
                                    <span className="font-bold">{recipe.macros?.fats || 'N/A'}</span>
                                </div>
                             </div>
                        </div>

                        <div className="bg-[#FFF3E0]/50 rounded-3xl p-6 border border-[#FFF3E0]">
                             <h4 className="font-bold text-[#E65100] mb-3 flex items-center gap-2">
                                💡 Chef&apos;s Tips
                             </h4>
                             <ul className="list-disc list-inside text-sm text-[#E65100] space-y-1">
                                {recipe.tips.map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                ))}
                             </ul>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        ) : null}
      </div>
    </main>
  );
}
