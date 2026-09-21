import { Badge } from "@/components/ui/badge";

export function PublishBadge({ isPublished }: { isPublished: boolean }) {
  return (
    <Badge variant={isPublished ? "default" : "secondary"} className="font-normal">
      {isPublished ? "Publié" : "Brouillon"}
    </Badge>
  );
}
