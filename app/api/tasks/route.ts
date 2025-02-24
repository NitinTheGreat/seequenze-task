import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri!)

export async function GET() {
  try {
    await client.connect()
    const database = client.db("taskmanager")
    const tasks = database.collection("tasks")
    const result = await tasks.find({}).toArray()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await client.connect()
    const database = client.db("taskmanager")
    const tasks = database.collection("tasks")
    const result = await tasks.insertOne(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  } finally {
    await client.close()
  }
}

