import { NextResponse } from "next/server"
import { TaskModel } from "@/models/task"

export async function GET() {
  try {
    console.log("inside the api hahaha")
    const tasks = await TaskModel.findAll()
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await TaskModel.create(body)
    return NextResponse.json({ success: true, taskId: result.insertedId })
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}

