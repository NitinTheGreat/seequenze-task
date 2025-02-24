import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri!)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await client.connect()
    const database = client.db("taskmanager")
    const tasks = database.collection("tasks")
    const task = await tasks.findOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    await client.connect()
    const database = client.db("taskmanager")
    const tasks = database.collection("tasks")
    const result = await tasks.updateOne({ _id: new ObjectId(params.id) }, { $set: body })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await client.connect()
    const database = client.db("taskmanager")
    const tasks = database.collection("tasks")
    const result = await tasks.deleteOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  } finally {
    await client.close()
  }
}

