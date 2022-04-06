import { createContext, useState } from 'react'

interface CartContextInterface {
	cart: CartItemInterface[]
	setCart: React.Dispatch<React.SetStateAction<CartItemInterface[]>>
}

export const CartContext = createContext<CartContextInterface>({ cart: [], setCart: () => [] })

interface CartProviderInterface {
	children: React.ReactNode
}

export interface CartItemInterface {
	gear: string | undefined
	model: string | undefined
	price: string | undefined
	category: string | null | undefined
}

export const CartProvider = ({ children }: CartProviderInterface) => {
	const [cart, setCart] = useState<CartItemInterface[]>([])

	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
}
