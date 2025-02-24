"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TaskCardProps {
  title: string
  description: string
  deadline: string
  priority: "Low" | "High"
  status: "To Do" | "On Progress" | "Done"
}

export function TaskCard({ title, description, deadline, priority, status }: TaskCardProps) {
  const priorityColor = {
    Low: "bg-[#FFF1E6] text-[#FF9F5A]",
    High: "bg-red-100 text-red-600",
  }

  const statusColor = {
    Done: "bg-green-100 text-green-600",
  }

  return (
    <Card className="w-full p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <span
          className={`px-3 py-1 text-sm rounded-md ${status === "Done" ? statusColor.Done : priorityColor[priority]}`}
        >
          {status === "Done" ? "Completed" : priority}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <span>Deadline: {deadline}</span>
      </div>
    </Card>
  )
}

