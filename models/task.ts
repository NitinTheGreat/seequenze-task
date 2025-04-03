import { ObjectId } from "mongodb"
import clientPromise from "@/lib/db"

export interface Task {
  _id?: ObjectId | string
  title: string
  description?: string
  status: "To Do" | "In Progress" | "Done"
  priority?: "Low" | "Medium" | "High"
  dueDate?: Date
  assignedTo?: string
  tags?: string[]
  createdAt: Date
  updatedAt?: Date
}

export class TaskModel {
  private static async getCollection() {
    const client = await clientPromise
    const db = client.db("taskmanager")
    return db.collection<Task>("tasks")
  }

  static async findAll(): Promise<Task[]> {
    const collection = await this.getCollection()
    return collection.find({}).sort({ createdAt: -1 }).toArray()
  }

  static async findById(id: string): Promise<Task | null> {
    const collection = await this.getCollection()
    return collection.findOne({ _id: new ObjectId(id) })
  }

  static async create(task: Omit<Task, "_id" | "createdAt">): Promise<{ insertedId: ObjectId }> {
    const collection = await this.getCollection()
    const newTask = {
      ...task,
      createdAt: new Date(),
      status: task.status || "To Do",
    }
    const result = await collection.insertOne(newTask as Task)
    return { insertedId: result.insertedId }
  }

  static async update(id: string, task: Partial<Task>): Promise<boolean> {
    const collection = await this.getCollection()
    const updateData = {
      ...task,
      updatedAt: new Date(),
    }
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })
    return result.matchedCount > 0
  }

  static async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }
}

