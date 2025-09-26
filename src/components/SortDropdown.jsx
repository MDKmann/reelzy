import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/Button.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu.jsx";

export default function SortDropdown({ filterOptions = [], onSelect }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="shadow-none rounded-xl"
          aria-label="Open edit menu"
        >
          <FilterIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-slate-700/50 bg-slate-800/90 backdrop-blur-sm">
        {filterOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onSelect && onSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
