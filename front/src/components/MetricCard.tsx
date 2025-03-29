
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon?: ReactNode;
}

export function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            {icon && (
              <div className="p-2 bg-primary/10 rounded-full">
                {icon}
              </div>
            )}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" && "text-green-500",
              trend === "down" && "text-red-500"
            )}
          >
            {change}
          </span>
        </div>
        <div className="mt-1">
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
