"use client"
import React, {useState} from 'react'
import {Button} from "@/components/ui/button";

const categories = [
    "All",
    "Music",
    "Gaming",
    "Movies",
    "News",
    "Sports",
    "Technology",
    "Comedy",
    "Education",
    "Science",
    "Travel",
    "Food",
    "Fashion",
]

const CategoryTab = () => {

    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <div className="flex gap-2 mt-2 overflow-x-auto">
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "secondary"}
                    className="whitespace-nowrap"
                    onClick={() => setActiveCategory(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
    )
}
export default CategoryTab
