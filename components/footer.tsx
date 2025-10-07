export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">SK</span>
            </div>
            <span className="font-semibold text-foreground">Sparepart Kursi</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Toko Sparepart Kursi. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
