import { TaskBoard } from "@/components/task-board"
import { Sidebar } from "@/components/sidebar"
import { SearchBar } from "@/components/search-bar"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <SearchBar />
        <TaskBoard />
      </main>
    </div>
  )
}

