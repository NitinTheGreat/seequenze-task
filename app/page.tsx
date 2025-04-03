import { TaskBoard } from "@/components/task-board"
import { Sidebar } from "@/components/sidebar"
import { SearchBar } from "@/components/search-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <SearchBar />
          <TaskBoard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

