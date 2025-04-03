"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Task } from "@/lib/types"

interface TaskCardProps extends Task {
  onUpdate: () => void
  onDelete: () => void
}

export function TaskCard({ _id, title, description, deadline, priority, status, onUpdate, onDelete }: TaskCardProps) {
  const priorityColor = {
    Low: "bg-[#FFF1E6] text-[#FF9F5A]",
    Mid: "bg-yellow-100 text-yellow-600",
    High: "bg-red-100 text-red-600",
  }

  const statusColor = {
    Done: "bg-green-100 text-green-600",
  }

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/tasks/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        onUpdate()
      }
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tasks/${_id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        onDelete()
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
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
            {status !== "Done" && (
              <DropdownMenuItem onClick={() => handleStatusChange("Done")}>Mark as Complete</DropdownMenuItem>
            )}
            {status === "To Do" && (
              <DropdownMenuItem onClick={() => handleStatusChange("On Progress")}>Move to Progress</DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>
      </div>
    </Card>
  )
}

