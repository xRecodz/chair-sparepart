"use client"

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem("adminToken")
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return
  sessionStorage.setItem("adminToken", token)
  // Also set as cookie for middleware
  document.cookie = `adminToken=${token}; path=/; max-age=86400; SameSite=Strict`
}

export function removeAdminToken(): void {
  if (typeof window === "undefined") return
  sessionStorage.removeItem("adminToken")
  // Remove cookie
  document.cookie = "adminToken=; path=/; max-age=0"
}

export function isAuthenticated(): boolean {
  return getAdminToken() !== null
}
