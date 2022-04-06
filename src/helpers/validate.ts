export const validate = (
	gear: HTMLInputElement | null,
	model: HTMLInputElement | null,
	price: HTMLInputElement | null
) => {
	const errors = { gear: false, model: false, price: false }

	if (!gear?.value) {
		errors.gear = true
	}
	if (!model?.value) {
		errors.model = true
	}
	if (!price?.value && price) {
		if (+price.value <= 0) {
			errors.price = true
		}
	}

	return errors
}
