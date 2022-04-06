import classes from './Hero.module.scss'
import hero from '../../images/hero.png'

export const Hero = () => {
	return (
		<div className={classes.hero}>
			<h1 className={classes.title}>Gaming PC Builder</h1>
			<img src={hero} alt='Gaming PC' />
		</div>
	)
}
