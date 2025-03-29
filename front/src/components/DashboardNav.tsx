
import { CalendarIcon, ChartBarIcon, HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Panel",
    icon: HomeIcon,
    href: "/",
    active: false,
  },
  {
    title: "Opiniones",
    icon: ChartBarIcon,
    href: "/analytics",
    active: true,
  },
  {
    title: "Usuario",
    icon: UserIcon,
    href: "/users",
    active: false,
  },
  {
    title: "Calendario",
    icon: CalendarIcon,
    href: "/calendar",
    active: false,
  },
  {
    title: "Configuración",
    icon: SettingsIcon,
    href: "/settings",
    active: false,
  },
];

export function DashboardNav() {
  return (
    <div className="hidden md:flex w-64 flex-col h-screen bg-card px-3 py-8">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg tracking-tight">
          Hola <b>Juan Alberto</b>
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                item.active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
