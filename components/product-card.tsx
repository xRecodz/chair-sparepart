"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

interface ProductCardProps {
  name: string
  description: string
  price: number
  image: string
}

export function ProductCard({ name, description, price, image }: ProductCardProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "628123456789"

  const handleBuyNow = () => {
    const message = encodeURIComponent(`Halo Admin, saya tertarik dengan produk ${name}.`)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">{name}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
          <p className="mt-3 text-xl font-bold text-primary">{formatPrice(price)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleBuyNow} className="w-full gap-2" size="lg">
          <MessageCircle className="h-4 w-4" />
          Beli Sekarang
        </Button>
      </CardFooter>
    </Card>
  )
}
