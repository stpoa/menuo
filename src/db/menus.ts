export type Menu = MenuEntry[]

export interface MenuEntry {
  index: number
  restaurant: string
  section: string
  dishName: string
  dishDescription?: string 
  dishVariantName?: string
  dishVariantDescription?: string 
  dishVariantPrice: number
}
