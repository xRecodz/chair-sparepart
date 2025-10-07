"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LogOut, Plus, Pencil, Trash2, Package } from "lucide-react"
import { getAdminToken, removeAdminToken } from "@/lib/client-auth"
import { ProductDialog } from "@/components/admin/product-dialog"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import type { IProduct } from "@/models/Product"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null)

  useEffect(() => {
    const token = getAdminToken()
    if (!token) {
      router.push("/admin")
      return
    }
    fetchProducts()
  }, [router])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    removeAdminToken()
    router.push("/admin")
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product: IProduct) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const handleDeleteClick = (product: IProduct) => {
    setProductToDelete(product)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return

    try {
      const token = getAdminToken()
      const response = await fetch(`/api/products/${productToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchProducts()
        setIsDeleteDialogOpen(false)
        setProductToDelete(null)
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const handleSaveProduct = async () => {
    await fetchProducts()
    setIsDialogOpen(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Kelola Produk</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Daftar Produk</CardTitle>
            <Button onClick={handleAddProduct} className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Produk
            </Button>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="py-12 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Belum ada produk</p>
                <Button onClick={handleAddProduct} className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Produk Pertama
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gambar</TableHead>
                      <TableHead>Nama Produk</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleEditProduct(product)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDeleteClick(product)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <ProductDialog
        product={selectedProduct}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveProduct}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name || ""}
      />
    </div>
  )
}
