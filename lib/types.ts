import { z } from "zod"

export const TaskSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  priority: z.enum(["Low", "Mid", "High"]),
  status: z.enum(["To Do", "On Progress", "Done"]),
  deadline: z.string().datetime(),
  assignedTo: z.string(),
  createdAt: z.string().datetime(),
})

export const CreateTaskSchema = TaskSchema.omit({ _id: true, createdAt: true })

export type Task = z.infer<typeof TaskSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>

