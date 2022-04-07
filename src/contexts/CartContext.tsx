import { createContext, useState } from 'react'

interface CartContextInterface {
	cart: CartItemInterface[]
	setCart: React.Dispatch<React.SetStateAction<CartItemInterface[]>>
	categories: CategoryInterface[]
	setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>
	temporary: CartItemInterface[]
	setTemporary: React.Dispatch<React.SetStateAction<CartItemInterface[]>>
}

export const CartContext = createContext<CartContextInterface>({
	cart: [],
	setCart: () => [],
	categories: [],
	setCategories: () => [],
	temporary: [],
	setTemporary: () => [],
})

interface CartProviderInterface {
	children: React.ReactNode
}

export interface CartItemInterface {
	gear: string | undefined
	model: string | undefined
	price: string | undefined
	category: string | null | undefined
	id: string
	value: string | undefined
}

interface CategoryInterface {
	value: string
	text: string
}

const basicCategories = [
	{ value: 'components', text: 'Podzespoły' },
	{ value: 'hardware', text: 'Urządzenia peryferyjne' },
	{ value: 'software', text: 'Oprogramowanie' },
	{ value: 'other', text: 'inne' },
]

export const CartProvider = ({ children }: CartProviderInterface) => {
	const [cart, setCart] = useState<CartItemInterface[]>([])
	const [temporary, setTemporary] = useState<CartItemInterface[]>([])
	const [categories, setCategories] = useState<CategoryInterface[]>(basicCategories)

	return (
		<CartContext.Provider value={{ cart, setCart, categories, setCategories, temporary, setTemporary }}>
			{children}
		</CartContext.Provider>
	)
}
