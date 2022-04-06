import classes from './App.module.scss'
import { Form } from './components/form/Form'
import { Hero } from './components/hero/Hero'

export const App = () => {
	return (
		<main className={classes.main}>
			<Hero />
			<Form />
		</main>
	)
}
