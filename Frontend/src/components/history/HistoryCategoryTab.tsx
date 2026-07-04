"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button';
const categories = [
    "All",
    "Videos",
    "Music",
    "Shorts",

]

const HistoryCategoryTab = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="w-full flex gap-2 mt-2 overflow-hidden">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "secondary"}
          className="whitespace-nowrap"
          onClick={() => setActiveCategory(category)}>
          {category}
        </Button>
      ))}
    </div>
  );
}

export default HistoryCategoryTab