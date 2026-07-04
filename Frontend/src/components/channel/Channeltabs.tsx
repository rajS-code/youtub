import React, { useState } from "react";
import { Button } from "../ui/button";

const tabs = [
  { id: "home", label: "Home" },
  { id: "videos", label: "Videos" },
  { id: "playlists", label: "Playlists" },
  { id: "channels", label: "Channels" },
  { id: "about", label: "About" },
];

const Channeltabs = () => {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div>
      <div className="flex gap-4 border-b border-gray-300">
        {tabs.map((tab) => (
          <p
            key={tab.id}
            className={`cursor-pointer px-4 py-2 ${activeTab === tab.id ? "border-b-4 border-gray-500" : ""}`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Channeltabs;
