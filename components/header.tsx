import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">SK</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Sparepart Kursi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/produk" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Produk
          </Link>
          <Link href="/tentang" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Tentang Kami
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/produk" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Produk
              </Link>
              <Link
                href="/tentang"
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                Tentang Kami
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
