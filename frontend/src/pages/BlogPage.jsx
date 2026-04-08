import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LawNavbar from "./LawNavbar";
import LawFooter from "./LawFooter";

export const blogPosts = [
  {
    id: 1,
    category: "Legal Tech",
    title: "How AI is Transforming the Indian Legal Landscape",
    excerpt: "Artificial intelligence is reshaping how legal professionals work, from contract analysis to predictive case outcomes. Discover the key trends driving this transformation.",
    author: "Adv. Priya Sharma",
    date: "Mar 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "Consumer Rights",
    title: "Your Rights Under the Consumer Protection Act, 2019",
    excerpt: "A comprehensive guide to understanding your rights as a consumer and the remedies available under the new Consumer Protection Act.",
    author: "Adv. Rahul Mehra",
    date: "Mar 22, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
   
    category: "Cyber Law",
    title: "Protecting Yourself from Online Fraud: A Legal Perspective",
    excerpt: "With the rise of digital transactions, cyber fraud is at an all-time high. Learn about the legal framework and steps to protect yourself.",
    author: "Adv. Sneha Kapoor",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", // Cyber Security focused
  
  },
  {
    id: 4,
    category: "Family Law",
    title: "Understanding Custody Laws in India: A Complete Guide",
    excerpt: "Custody disputes are emotionally complex. This guide walks you through the legal framework of child custody in Indian courts.",
    author: "Adv. Priya Sharma",
    date: "Mar 12, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80", // Family focused
  },
  {
    id: 5,
    category: "Property Law",
    title: "RERA Act: How it Protects Homebuyers in India",
    excerpt: "Understanding the Real Estate Regulatory Authority (RERA) and how it ensures transparency and accountability in the property sector.",
    author: "Adv. Vikram Desai",
    date: "Mar 10, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    category: "Labour Law",
    title: "Workplace Rights: Navigating the New Labour Codes",
    excerpt: "An analysis of the simplified labour codes in India and what they mean for employee benefits, working hours, and social security.",
    author: "Adv. Anita Roy",
    date: "Mar 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    category: "Legal Tech",
    title: "Blockchain in Judiciary: Ensuring Tamper-Proof Evidence",
    excerpt: "How distributed ledger technology is being explored to maintain the chain of custody for digital evidence in criminal trials.",
    author: "Adv. Sneha Kapoor",
    date: "Mar 2, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
  },
];

const categories = ["All", "Legal Tech", "Consumer Rights", "Cyber Law", "Family Law", "Property Law", "Labour Law"];

const BlogPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = blogPosts.find((p) => p.featured);

  // LOGIC: Show featured post in grid ONLY if a category is selected or searching
  // This prevents the featured post from disappearing when user clicks "Legal Tech"
  const filteredPosts = blogPosts
    .filter((p) => {
      if (activeCategory === "All") return !p.featured;
      return p.category === activeCategory;
    })
    .filter((p) =>
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-white min-h-screen">
      <LawNavbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#18181b] via-[#1f1f23] to-[#2a2a30] overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#E4574E]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-[#E4574E]/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E4574E]/10 border border-[#E4574E]/20 text-[#E4574E] text-[12px] tracking-widest uppercase font-bold mb-6">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
            Legal <span className="text-[#E4574E]">Insights</span> &amp; Expert Analysis
          </h1>
        </div>
      </section>

      {/* Featured Post - Only visible on "All" category without search */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <section className="max-w-7xl mx-auto px-8 lg:px-12 -mt-12 relative z-20 mb-16">
          <div 
            className="group bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden grid lg:grid-cols-2 cursor-pointer hover:shadow-2xl transition-all duration-500"
            onClick={() => navigate(`/blogs/${featuredPost.id}`)}
          >
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img src={featuredPost.image} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-[#E4574E] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Featured</div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-[#E4574E] text-[11px] font-bold uppercase mb-3">{featuredPost.category}</span>
              <h2 className="text-3xl font-bold text-[#18181b] mb-4 group-hover:text-[#E4574E] transition-colors">{featuredPost.title}</h2>
              <p className="text-gray-500 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
              <div className="text-sm font-medium text-gray-900">{featuredPost.author} • {featuredPost.date}</div>
            </div>
          </div>
        </section>
      )}

      {/* Filters & Search */}
      <section className="max-w-7xl mx-auto px-8 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                  activeCategory === cat ? "bg-[#E4574E] text-white shadow-lg shadow-[#E4574E]/30" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#E4574E] focus:outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-8 lg:px-12 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/blogs/${post.id}`)}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-[#E4574E] text-[10px] font-bold uppercase">{post.category}</span>
                <h3 className="text-lg font-bold mt-2 mb-3 text-[#18181b] group-hover:text-[#E4574E] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="text-[11px] text-gray-400 font-medium">{post.author.replace("Adv. ", "")} • {post.readTime}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <LawFooter />
    </div>
  );
};

export default BlogPage;