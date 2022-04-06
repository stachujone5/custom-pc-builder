import classes from './Form.module.scss'

export const Form = () => {
	return (
		<form className={classes.form}>
			<label htmlFor='gear' className={classes.label}>
				Rodzaj sprzętu
			</label>
			<input type='text' className={classes.input} id='gear' />
			<label htmlFor='model' className={classes.label}>
				Model
			</label>
			<input type='text' className={classes.input} id='model' />
			<label htmlFor='category'></label>
			<select id='category' className={classes.select}>
				<option value='components'>Podzespoły</option>
				<option value='hardware'>Urządzenia peryferyjne</option>
				<option value='software'>Oprogramowanie</option>
				<option value='other'>Inne</option>
			</select>
			<label htmlFor='price' className={classes.label}>
				Cena
			</label>
			<input type='number' className={classes.input} id='price' />
		</form>
	)
}
