import classes from './App.module.scss'
import { Form } from './components/form/Form'
import { Hero } from './components/hero/Hero'

export const App = () => {
	return (
		<main className={classes.main}>
			<Hero />
			<div className={classes['form-body']}>
				<Form />
			</div>
		</main>
	)
}
