"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFloat() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "628123456789"

  const handleClick = () => {
    const message = encodeURIComponent("Halo Admin, saya ingin bertanya tentang produk.")
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}
