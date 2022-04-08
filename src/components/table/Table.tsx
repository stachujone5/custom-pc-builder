import { useContext } from 'react'
import { IoClose } from 'react-icons/io5'
import { CartContext } from '../../contexts/CartContext'
import classes from './Table.module.scss'

interface TableProps {
	handleItemRemove: (id: string) => void
}

export const Table = ({ handleItemRemove }: TableProps) => {
	const { temporary } = useContext(CartContext)

	return (
		<table className={classes.table}>
			<thead>
				<tr>
					<th className={classes.column}>Rodzaj sprzętu:</th>
					<th className={classes.column}>Model:</th>
					<th className={classes.column}>Cena:</th>
					<th className={classes.column}>Kategoria:</th>
				</tr>
			</thead>
			<tbody>
				{temporary.map(item => {
					return (
						<tr key={item.id}>
							<td className={classes.td}>{item.gear}</td>
							<td className={classes.td}>{item.model}</td>
							<td className={classes.td}>{item.price} zł</td>
							<td className={classes.td}>{item.category}</td>
							<td>
								<button className={classes['table-btn']} onClick={() => handleItemRemove(item.id)}>
									<IoClose />
								</button>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
