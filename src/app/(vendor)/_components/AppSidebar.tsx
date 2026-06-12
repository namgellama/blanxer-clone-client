import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { links } from "@/constants/vendor/menu-links";

export function AppSidebar() {
    const { store } = useAppSelector((state) => state.vendorStore);
    const router = useRouter();

    return (
        <Sidebar>
            <SidebarHeader className="px-4 py-5 cursor-pointer hover:bg-white">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <Avatar label={store!.name.charAt(0)} />

                        <div>
                            <h4 className="font-semibold">
                                {store?.name.split(" ")[0]}
                            </h4>
                            <h6 className="text-xs text-gray-400">
                                {store?.userRole}
                            </h6>
                        </div>
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-transparent"
                    >
                        <ChevronRight />
                    </Button>
                </header>
            </SidebarHeader>
            <Separator />
            <SidebarContent className="pl-2 py-2">
                {links.map((link) => (
                    <SidebarGroup key={link.heading}>
                        <SidebarGroupLabel className="font-medium text-sm text-gray-400 ">
                            {link.heading}
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {link.items.map((item) => (
                                <SidebarMenuItem
                                    key={item.label}
                                    className="flex items-center gap-5 cursor-pointer hover:bg-purple-100 pl-3 py-2 rounded-sm"
                                    onClick={() => router.push(item.path)}
                                >
                                    {
                                        <item.icon className="size-5 text-gray-400" />
                                    }
                                    <span className="text-sm font-medium text-black/70">
                                        {item.label}
                                    </span>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
