import React, { useState } from 'react'
import { Button } from '../ui/button';
const categories = [
    "All",
    "Videos",
    "Shorts",
    "Live",
];

const WatchLaterCategoryTab = () => {
    const [activeCategory, setActiveCategory] = useState("All");
  return (
    <div className="flex gap-2 mt-2 overflow-x-auto">
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

export default WatchLaterCategoryTab