import { MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";

function toWhatsAppLink(number: string, message: string) {
  const digits = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export async function InquiryActions({
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
  const dict = await getDictionary();

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="cta" size="lg" asChild className="gap-2 rounded-[8px]">
        <a href={`tel:${phone.replace(/\s+/g, "")}`}>
          <Phone className="size-4" />
          {dict.inquiry.call}
        </a>
      </Button>
      <Button size="lg" variant="outline" asChild className="gap-2 rounded-[8px]">
        <a href={toWhatsAppLink(whatsapp, message)} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-4" />
          {dict.inquiry.whatsapp}
        </a>
      </Button>
      <Button size="lg" variant="ghost" asChild className="gap-2 rounded-[8px]">
        <Link href={contactHref}>
          <Send className="size-4" />
          {dict.inquiry.form}
        </Link>
      </Button>
    </div>
  );
}
