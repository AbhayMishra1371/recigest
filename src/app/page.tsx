"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { ArrowRight, Clock, Users, Flame, ChefHat, Search } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const recipeCategories = [
    { name: "Quick & Easy", icon: "⚡", time: "Under 30 min" },
    { name: "Healthy", icon: "🥗", time: "Nutritious" },
    { name: "Desserts", icon: "🍰", time: "Indulgent" },
    { name: "Vegetarian", icon: "🌱", time: "Plant-based" },
  ];

  const featuredRecipes = [
    {
      title: "Grilled Salmon",
      description: "Mediterranean style with herbs",
      time: "25 min",
      servings: "4",
      difficulty: "Easy",
    },
    {
      title: "Margherita Pizza",
      description: "Classic Italian perfection",
      time: "40 min",
      servings: "2",
      difficulty: "Medium",
    },
    {
      title: "Thai Curry",
      description: "Spicy coconut-based delicacy",
      time: "35 min",
      servings: "4",
      difficulty: "Medium",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-amber-900/20 bg-slate-950/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-amber-500" />
            <span className="text-2xl font-bold text-amber-500">
              RecipeWise
            </span>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
            Discover Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">
              Culinary Adventure
            </span>
          </h1>

          <p className="text-xl text-slate-300 text-balance max-w-2xl mx-auto">
            Search through thousands of delicious recipes, find ingredients you
            have, and cook something amazing today.
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 max-w-2xl mx-auto mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search recipes, ingredients, cuisines..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="pl-10 bg-slate-800/50 border-amber-900/30 text-white placeholder:text-slate-500 focus:border-amber-500"
              />
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 px-8">
              Search
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-slate-400">
            Try: "pasta", "healthy breakfast", or "quick dinner"
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recipeCategories.map((category) => (
            <Card
              key={category.name}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-amber-900/30 hover:border-amber-500/50 cursor-pointer transition-all hover:shadow-lg hover:shadow-amber-900/20 p-6 text-center group"
            >
              <div className="text-5xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-slate-400">{category.time}</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-amber-400 text-sm font-medium">Explore →</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <Card
              key={recipe.title}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-amber-900/30 overflow-hidden hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-900/20 cursor-pointer group"
            >
              <div className="h-40 bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-b border-amber-900/20 flex items-center justify-center">
                <Flame className="w-16 h-16 text-amber-500/30 group-hover:text-amber-500/50 transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {recipe.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {recipe.description}
                </p>

                <div className="space-y-3 py-4 border-y border-amber-900/20">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="px-3 py-1 bg-amber-900/30 text-amber-400 text-xs font-medium rounded-full">
                    {recipe.difficulty}
                  </span>
                  <ArrowRight className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
            <p className="text-slate-400">
              Find recipes by ingredient, cuisine, or dietary preference
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Instructions</h3>
            <p className="text-slate-400">
              Step-by-step guides with helpful tips and techniques
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Flame className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
            <p className="text-slate-400">
              Build your personal recipe collection and meal plans
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-900/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Cooking Amazing Recipes
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of home chefs discovering new favorite recipes every
            day. Sign up now to save recipes, create meal plans, and share your
            culinary creations.
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700 px-8 py-6 text-lg">
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-900/20 bg-slate-950/40 backdrop-blur mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Follow</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-900/20 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 RecipeWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
