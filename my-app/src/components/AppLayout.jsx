import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSideBar } from "./AppSideBar"
import { Menu } from "lucide-react"

export function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSideBar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header with sidebar trigger */}
          <header className="h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-full items-center px-4 gap-4">
              {/* This is the collapsible toggle button */}
              <SidebarTrigger className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
              <h1 className="text-lg font-semibold">Your App Title</h1>
            </div>
          </header>
          
          {/* Main content area */}
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}