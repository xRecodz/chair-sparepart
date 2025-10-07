import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CheckCircle2, Package, Shield, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TentangPage() {
  const features = [
    {
      icon: Shield,
      title: "Kualitas Terjamin",
      description: "Semua produk kami telah melalui quality control ketat untuk memastikan kualitas terbaik",
    },
    {
      icon: Package,
      title: "Stok Lengkap",
      description: "Menyediakan berbagai jenis sparepart untuk kursi barbershop, sofa, dan kantor",
    },
    {
      icon: Truck,
      title: "Pengiriman Cepat",
      description: "Proses pengiriman yang cepat dan aman ke seluruh Indonesia",
    },
    {
      icon: CheckCircle2,
      title: "Harga Terjangkau",
      description: "Harga kompetitif dengan kualitas yang tidak perlu diragukan lagi",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                Tentang Kami
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                Kami adalah toko sparepart kursi terpercaya yang menyediakan berbagai komponen berkualitas untuk kursi
                barbershop, sofa, dan kursi kantor.
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="prose prose-lg mx-auto">
                <h2 className="text-2xl font-bold text-foreground">Siapa Kami?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Toko Sparepart Kursi adalah penyedia sparepart kursi terlengkap dan terpercaya di Indonesia. Dengan
                  pengalaman bertahun-tahun dalam industri furniture, kami memahami kebutuhan pelanggan akan komponen
                  kursi yang berkualitas dan tahan lama.
                </p>

                <h2 className="mt-8 text-2xl font-bold text-foreground">Visi Kami</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi toko sparepart kursi nomor satu di Indonesia yang menyediakan produk berkualitas tinggi dengan
                  harga terjangkau dan pelayanan terbaik untuk semua pelanggan.
                </p>

                <h2 className="mt-8 text-2xl font-bold text-foreground">Misi Kami</h2>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Menyediakan sparepart kursi berkualitas tinggi dengan harga kompetitif</li>
                  <li>Memberikan pelayanan terbaik dan responsif kepada setiap pelanggan</li>
                  <li>Menjaga kepercayaan pelanggan dengan produk yang terjamin kualitasnya</li>
                  <li>Terus berinovasi untuk memenuhi kebutuhan pasar yang berkembang</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Mengapa Memilih Kami?</h2>
              <p className="mt-3 text-muted-foreground">Keunggulan yang kami tawarkan untuk Anda</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="border-2 transition-all hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-lg bg-primary p-8 text-center text-primary-foreground">
              <h2 className="text-2xl font-bold sm:text-3xl">Siap Berbelanja?</h2>
              <p className="mt-3 text-primary-foreground/90">
                Hubungi kami sekarang untuk mendapatkan sparepart kursi berkualitas dengan harga terbaik
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
