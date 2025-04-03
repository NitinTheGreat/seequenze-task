"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/models/task"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, AlertCircle } from "lucide-react"

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks")
        if (!response.ok) {
          throw new Error("Failed to fetch tasks")
        }
        const data = await response.json()
        setTasks(data)
      } catch (err) {
        setError("Error loading tasks. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const formatDate = (date?: Date | string) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const tasksByStatus = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Done: tasks.filter((task) => task.status === "Done"),
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading tasks...</div>
  }

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <div className="flex items-center text-red-500">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="To Do" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="To Do">To Do ({tasksByStatus["To Do"].length})</TabsTrigger>
        <TabsTrigger value="In Progress">In Progress ({tasksByStatus["In Progress"].length})</TabsTrigger>
        <TabsTrigger value="Done">Done ({tasksByStatus["Done"].length})</TabsTrigger>
      </TabsList>

      {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
        <TabsContent key={status} value={status} className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {statusTasks.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">No tasks in {status}</div>
            ) : (
              statusTasks.map((task) => (
                <Card key={task._id?.toString()} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      {task.priority && <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>}
                    </div>
                    {task.description && <CardDescription className="line-clamp-2">{task.description}</CardDescription>}
                  </CardHeader>
                  <CardContent>
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between text-xs text-muted-foreground pt-0">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDate(task.createdAt)}
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        Due: {formatDate(task.dueDate)}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

