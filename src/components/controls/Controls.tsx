import { LegacyRef } from 'react'
import classes from './Controls.module.scss'

interface OptionInterface {
	value: string
	text: string
}

interface ControlsProps {
	id: string
	type?: string
	label: string
	min?: number
	error?: boolean | undefined
	inputRef?: LegacyRef<HTMLInputElement> | undefined
	selectRef?: LegacyRef<HTMLSelectElement> | undefined
	element?: string
	options?: OptionInterface[]
}

export const Controls = ({ id, type, label, min = 0, error, inputRef, selectRef, element, options }: ControlsProps) => {
	if (element === 'select') {
		return (
			<div className={classes.controls}>
				<label htmlFor={id}>{label}</label>
				<select className={classes.input} ref={selectRef}>
					{options?.map((option: OptionInterface) => {
						return (
							<option key={option.value} value={option.value}>
								{option.text}
							</option>
						)
					})}
				</select>
			</div>
		)
	}
	return (
		<div className={classes.controls}>
			<label htmlFor={id}>{label}</label>
			{type === 'number' ? (
				<input
					type={type}
					className={`${classes.input} ${error ? classes.error : null}`}
					ref={inputRef}
					min={min}
					step={0.1}
				/>
			) : (
				<input type={type} className={`${classes.input} ${error ? classes.error : null}`} ref={inputRef} />
			)}
		</div>
	)
}
