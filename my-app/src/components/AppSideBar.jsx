import {
  Calendar,
  Inbox,
  Search,
  Settings,
  LayoutDashboard,
  User2,
  ChevronUp,
  ChevronDown,
  BarChart3,
  Lock,
  Globe,
  Box,
  Sparkles,
  LogOut,
  UserCircle,
  CreditCard,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible"
import { useEffect } from "react"
import { useAuth } from "./Context/AuthContext"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router"

const decodeJwt = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = jwtDecode(token);

    // Optional: Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.warn("JWT expired");
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

export function AppSideBar() {
  const user = decodeJwt();
  const navigate = useNavigate();
  const { state } = useSidebar(); // Get sidebar state
  console.log(user);

  const { logout } = useAuth();

  const handleLogout = () => {
    try {
      logout();
      navigate("/home");
    } catch (error) {
      console.error("Unable to logout", error);
    }
  };

  return (
    <div className="relative">
      <Sidebar 
        variant="floating" 
        collapsible="icon" // Enable icon collapse mode
        className="flex flex-col h-full bg-gradient-to-b from-sidebar-background to-sidebar-background/90 backdrop-blur-xl border-r border-sidebar-border/50 shadow-2xl"
      >
        {/* Header with app branding
        <SidebarHeader className={`border-b border-sidebar-border/30 ${state === "collapsed" ? "p-3 flex justify-center" : "p-2"}`}>
          <div className={`flex items-center gap-2 ${state === "collapsed" ? "justify-center" : "px-2"}`}>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            {state === "expanded" && (
              <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Apparel.IO
              </span>
            )}
          </div>
        </SidebarHeader> */}

        <SidebarContent className={`flex flex-col flex-1 ${state === "collapsed" ? "px-1 py-2" : "p-2"}`}>
        {/* App menu */}
        <SidebarGroup className="mb-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {/* Collapsible Dashboard */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={state === "expanded"} className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip="Dashboard"
                      className={`group hover:bg-sidebar-accent/80 transition-all duration-300 hover:scale-[1.02] rounded-xl w-full ${state === "collapsed" ? "p-3 justify-center h-12" : "p-3 h-12"}`}
                    >
                      <LayoutDashboard className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      {state === "expanded" && <span className="font-medium">Dashboard</span>}
                      {state === "expanded" && <ChevronDown className="ml-auto h-4 w-4 transition-all duration-300 group-data-[state=open]/collapsible:rotate-180" />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out">
                    <SidebarMenuSub className="ml-6 mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a 
                            href="#dashboard" 
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/60 transition-all duration-300 hover:translate-x-1 group"
                          >
                            <BarChart3 className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                            <span className="text-sm">Dashboard</span>
                          </a>
                        </SidebarMenuSubButton>
                          <SidebarMenuSubButton asChild>
                          <a 
                            href="#analytics" 
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/60 transition-all duration-300 hover:translate-x-1 group"
                          >
                            <BarChart3 className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                            <span className="text-sm">Analytics</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Collapsible Inventory */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={state === "expanded"} className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip="Inventory"
                      className={`group hover:bg-sidebar-accent/80 transition-all duration-300 hover:scale-[1.02] rounded-xl w-full ${state === "collapsed" ? "p-3 justify-center h-12" : "p-3 h-12"}`}
                    >
                      <Inbox className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      {state === "expanded" && <span className="font-medium">Inventory</span>}
                      {state === "expanded" && <ChevronDown className="ml-auto h-4 w-4 transition-all duration-300 group-data-[state=open]/collapsible:rotate-180" />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out">
                    <SidebarMenuSub className="ml-6 mt-2 space-y-1">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a 
                            href="#private" 
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/60 transition-all duration-300 hover:translate-x-1 group"
                          >
                            <Lock className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                            <span className="text-sm">Private</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a 
                            href="#public" 
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/60 transition-all duration-300 hover:translate-x-1 group"
                          >
                            <Globe className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                            <span className="text-sm">Public</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a 
                            href="#my-inventory" 
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/60 transition-all duration-300 hover:translate-x-1 group"
                          >
                            <Box className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                            <span className="text-sm">My Inventory</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Calendar */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Calendar">
                  <a 
                    href="#" 
                    className={`group hover:bg-sidebar-accent/80 transition-all duration-300 hover:scale-[1.02] rounded-xl flex items-center gap-3 w-full ${state === "collapsed" ? "p-3 justify-center h-12" : "p-3 h-12"}`}
                  >
                    <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    {state === "expanded" && <span className="font-medium">Calendar</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Search */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Search">
                  <a 
                    href="#" 
                    className={`group hover:bg-sidebar-accent/80 transition-all duration-300 hover:scale-[1.02] rounded-xl flex items-center gap-3 w-full ${state === "collapsed" ? "p-3 justify-center h-12" : "p-3 h-12"}`}
                  >
                    <Search className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    {state === "expanded" && <span className="font-medium">Search</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <a 
                    href="#" 
                    className={`group hover:bg-sidebar-accent/80 transition-all duration-300 hover:scale-[1.02] rounded-xl flex items-center gap-3 w-full ${state === "collapsed" ? "p-3 justify-center h-12" : "p-3 h-12"}`}
                  >
                    <Settings className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    {state === "expanded" && <span className="font-medium">Settings</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Pushes footer down */}
        <div className="flex-1" />

        {/* User section */}
        <SidebarFooter className={`${state === "collapsed" ? "p-1" : "p-2"}`}>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton 
                    size="lg"
                    tooltip={state === "collapsed" ? user?.user?.name : undefined}
                    className={`group hover:bg-sidebar-accent/80 transition-all duration-300 hover:scale-[1.02] rounded-xl bg-gradient-to-r from-sidebar-accent/30 to-sidebar-accent/20 border border-sidebar-border/30 ${
                      state === "collapsed" 
                        ? "p-2 justify-center w-12 h-12 mx-auto" 
                        : "p-3"
                    }`}
                  >
                    <div className={`rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center ${
                      state === "collapsed" ? "w-8 h-8" : "w-8 h-8"
                    }`}>
                      <User2 className="w-4 h-4 text-white" />
                    </div>
                    {state === "expanded" && (
                      <>
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <span className="font-medium text-sm truncate">
                            {user?.user?.name}
                          </span>
                          <span className="text-xs text-sidebar-foreground/60 truncate">
                            {user?.user?.email}
                          </span>
                        </div>
                        <ChevronUp className="ml-auto h-4 w-4 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                      </>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[280px] p-2 bg-sidebar-background/95 backdrop-blur-xl border-sidebar-border/50 shadow-2xl rounded-xl"
                  align="start"
                >
                  <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/60 transition-all duration-300 cursor-pointer">
                    <UserCircle className="w-4 h-4 text-primary" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/60 transition-all duration-300 cursor-pointer">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span>Billing & Plans</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-sidebar-border/30" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all duration-300 cursor-pointer text-sidebar-foreground/80"
                  >
                    <LogOut onClick = {handleLogout}className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
    
  </div>
  )
}