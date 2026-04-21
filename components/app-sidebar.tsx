import type { ChatHistory } from "@/app/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({
  chatHistory,
  onSelectChat,
  activeChatId,
}: {
  chatHistory: ChatHistory[];
  onSelectChat: (chat: ChatHistory) => void;
  activeChatId?: string;
}) {
  return (
    <Sidebar
      collapsible="none"
      className="h-full min-h-0 w-full min-w-0 rounded-lg border border-sidebar-border"
    >
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    type="button"
                    isActive={activeChatId === item.id}
                    onClick={() => onSelectChat(item)}
                  >
                    <span className="truncate">{item.prompt}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
