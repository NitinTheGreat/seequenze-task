import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export function SearchBar() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Input type="search" placeholder="Search Project" className="pl-4 h-10 md:max-w-xs bg-white" />
      </div>
      <Button variant="outline" size="icon" className="h-10 w-10">
        <Filter className="h-4 w-4" />
        <span className="sr-only">Filter tasks</span>
      </Button>
    </div>
  )
}

