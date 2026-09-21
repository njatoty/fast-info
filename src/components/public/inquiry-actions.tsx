import { MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

function toWhatsAppLink(number: string, message: string) {
  const digits = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function InquiryActions({
  phone,
  whatsapp,
  message,
  contactHref = "/contact",
}: {
  phone: string;
  whatsapp: string;
  message: string;
  contactHref?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" asChild className="gap-2">
        <a href={`tel:${phone.replace(/\s+/g, "")}`}>
          <Phone className="size-4" />
          Appeler
        </a>
      </Button>
      <Button size="lg" variant="outline" asChild className="gap-2">
        <a href={toWhatsAppLink(whatsapp, message)} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
      </Button>
      <Button size="lg" variant="ghost" asChild className="gap-2">
        <Link href={contactHref}>
          <Send className="size-4" />
          Formulaire
        </Link>
      </Button>
    </div>
  );
}
