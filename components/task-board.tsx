"use client"

import { useState } from "react"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { Plus } from "lucide-react"

const initialTasks = [
  {
    id: "1",
    title: "Brainstorming",
    description: "Brainstorming brings team members' diverse experience into play.",
    deadline: "12/5/24",
    priority: "Low",
    status: "To Do",
  },
  {
    id: "2",
    title: "Research",
    description: "User research helps you to create an optimal product for users.",
    deadline: "12/5/24",
    priority: "High",
    status: "To Do",
  },
  {
    id: "3",
    title: "Wireframes",
    description: "Low fidelity wireframes include the most basic content and visuals.",
    deadline: "12/5/24",
    priority: "High",
    status: "To Do",
  },
  {
    id: "4",
    title: "Onboarding Illustrations",
    description: "",
    deadline: "12/5/24",
    priority: "Low",
    status: "On Progress",
  },
  {
    id: "5",
    title: "Moodboard",
    description: "",
    deadline: "12/5/24",
    priority: "Low",
    status: "On Progress",
  },
  {
    id: "6",
    title: "Mobile App Design",
    description: "",
    deadline: "12/5/24",
    priority: "Low",
    status: "Done",
  },
  {
    id: "7",
    title: "Design System",
    description: "It just needs to adapt the UI from what you did before",
    deadline: "12/5/24",
    priority: "Low",
    status: "Done",
  },
] as const

export function TaskBoard() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [tasks, setTasks] = useState(initialTasks)

  const columns = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "On Progress": tasks.filter((task) => task.status === "On Progress"),
    Done: tasks.filter((task) => task.status === "Done"),
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status === "To Do" ? "bg-blue-600" : status === "On Progress" ? "bg-orange-400" : "bg-green-500"
                }`}
              />
              <h2 className="font-medium">
                {status} <span className="text-gray-400 ml-1">{tasks.length}</span>
              </h2>
            </div>
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#1D1B20] text-white hover:bg-[#1D1B20]/90"
        onClick={() => setIsAddTaskOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Task
      </Button>
      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </div>
  )
}

