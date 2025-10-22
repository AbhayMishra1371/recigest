"use client"

import { ShoppingCart, Menu, X, Apple, Play } from "lucide-react"
import { useState } from "react"

export default function RestaurantLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const dishes = [
    {
      id: 1,
      name: "Veg Biryani",
      price: "₹240",
      rating: 4.5,
      image: "/vegetable-biryani.png",
    },
    {
      id: 2,
      name: "Khichdi Biryani",
      price: "₹240",
      rating: 4.5,
      image: "/khichdi-biryani-rice.jpg",
    },
  ]

  const featuredDish = {
    name: "Peking Roast Duck",
    description:
      "These eight culinary cuisines are Anhui, Cantonese, Fujian, Hunan, Jiangsu, Shandong, Sichuan and Zhejiang.",
    image: "/peking-roast-duck-with-vegetables.jpg",
    price: "₹450",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=1200&width=1600&query=blurred colorful food background with fresh fruits vegetables and bokeh effect)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(40px)",
        }}
      ></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="font-bold text-black text-lg">Chef's</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-sm text-gray-700">
              <a href="#menu" className="hover:text-black transition">
                Menu
              </a>
              <a href="#about" className="hover:text-black transition">
                About
              </a>
              <a href="#contact" className="hover:text-black transition">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-white/20 rounded-lg transition">
                <ShoppingCart className="w-5 h-5 text-black" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-3">
              <a href="#menu" className="text-sm text-gray-700 hover:text-black">
                Menu
              </a>
              <a href="#about" className="text-sm text-gray-700 hover:text-black">
                About
              </a>
              <a href="#contact" className="text-sm text-gray-700 hover:text-black">
                Contact
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
                  Delicious
                  <br />
                  Food is Waiting
                  <br />
                  For you...
                </h1>
              </div>

              <button className="inline-flex items-center gap-3 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition font-semibold">
                View Menu
                <span>→</span>
              </button>

              {/* Category Icons */}
              <div className="flex gap-3 pt-4">
                {[
                  { icon: "🥗", label: "Salads" },
                  { icon: "🍔", label: "Burgers" },
                  { icon: "🍜", label: "Noodles" },
                  { icon: "🥘", label: "Curries" },
                ].map((cat, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 bg-green-100/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl hover:bg-green-200/80 transition cursor-pointer border border-green-200/50"
                  >
                    {cat.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Featured Dish Circle */}
            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="relative w-72 h-72 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white/80">
                <img
                  src="/colorful-food-bowl-with-vegetables-and-eggs.jpg"
                  alt="Featured Dish"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-12 right-0 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm text-center shadow-lg">
                ₹450
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section id="menu" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {/* Left - Dishes */}
            <div className="space-y-6">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition cursor-pointer group border border-white/50"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-black text-lg">{dish.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">{dish.rating}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-black">{dish.price}</span>
                        <button className="bg-black text-white p-2 rounded-lg hover:bg-gray-900 transition">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Question Section */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/50">
                <h2 className="text-3xl font-bold text-black mb-4">Would you like this..?</h2>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Let's taste it. This is one of the best food in India. We are providing the best food in India.
                </p>
                <button className="mt-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition font-semibold text-sm">
                  Order Now
                </button>
              </div>

              {/* Small Dish Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border border-white/50">
                  <img src="/asian-noodle-dish.jpg" alt="Dish" className="w-full h-full object-cover" />
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border border-white/50">
                  <img src="/rice-bowl-with-vegetables.jpg" alt="Dish" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dish Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">{featuredDish.name}.</h2>
              <p className="text-gray-800 text-base leading-relaxed">{featuredDish.description}</p>
              <div className="flex gap-4">
                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition font-semibold">
                  Add to Cart
                </button>
                <button className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-white/50 transition font-semibold">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative h-96 flex items-center justify-center">
              <div className="relative">
                <img
                  src={featuredDish.image || "/placeholder.svg"}
                  alt={featuredDish.name}
                  className="w-96 h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-red-500 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-center shadow-lg">
                  {featuredDish.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/80 backdrop-blur-md rounded-3xl p-12 text-white border border-white/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">Chef's App is Available</h2>
                <p className="text-gray-300 text-lg">Download our app to enjoy exclusive deals and faster ordering.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition font-semibold border border-white/30">
                    <Apple className="w-5 h-5" />
                    App Store
                  </button>
                  <button className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition font-semibold border border-white/30">
                    <Play className="w-5 h-5" />
                    Play Store
                  </button>
                </div>
              </div>

              {/* Right - App Preview */}
              <div className="relative h-96 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-32 h-40 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img src="/food-app-interface.jpg" alt="App" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-32 h-40 bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                    <img src="/restaurant-menu-app.png" alt="App" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 backdrop-blur-md text-white py-16 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="font-bold text-lg">Chef's</span>
              <p className="text-gray-400 text-sm mt-2">Serving delicious food since 2020.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Our Services</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Dine In
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Catering
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Our Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Our Address</h3>
              <p className="text-gray-400 text-sm">
                123 Food Street
                <br />
                New Delhi, India
                <br />
                +91-9876-543-210
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Chef's Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
