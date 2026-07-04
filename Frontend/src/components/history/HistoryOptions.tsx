import React from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { HomeIcon, Pause, Settings, Trash2 } from "lucide-react";

const HistoryOptions = ({isopen}:any) => {

  return (
    <div className="hidden fixed w-1/2 right-0 h-2/4 md:flex flex-col items-center justify-center gap-4">
      <div className="w-1/2 flex flex-col gap-4">
        <Input placeholder="Search" />
        <Button variant="ghost" className="w-full justify-start">
          <Trash2 className="h-5 w-5 mr-1" />
          <h3 className="text-base">Clear all watch history</h3>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Pause className="h-5 w-5 mr-1" />
          <h3 className="text-base">Pause watch history</h3>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-5 w-5 mr-1" />
          <h3 className="text-base">Manage history</h3>
        </Button>
      </div>
    </div>
  );
};

export default HistoryOptions;
