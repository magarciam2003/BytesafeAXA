
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  date: string;
  review: string;
}

export function ReviewCard({ name, rating, date, review }: ReviewCardProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex space-x-4 items-start">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary-foreground text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{name}</p>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm text-muted-foreground">{review}</p>
      </div>
    </div>
  );
}
