import { createContext, useState } from 'react'

export const CartContext = createContext({})

interface CartProviderInterface {
	children: React.ReactNode
}

interface CartItem {
	components: string
	model: string
	price: number
	category: string
}

export const CartProvider = ({ children }: CartProviderInterface) => {
	const [cart, setCart] = useState<CartItem[]>([])

	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
}
