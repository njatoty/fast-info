import { MessageCircle } from "lucide-react";

function toWhatsAppLink(number: string) {
  const digits = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

export function WhatsAppFab({ whatsapp }: { whatsapp: string }) {
  if (!whatsapp) return null;

  return (
    <a
      href={toWhatsAppLink(whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/10 transition-transform hover:scale-105 motion-reduce:transition-none"
    >
      <MessageCircle className="size-6" fill="white" strokeWidth={0} />
    </a>
  );
}
