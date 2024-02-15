class Slider {
	#defaultOptions = {
		loop: false,

		buttons: {
			presense: false,
			prevButton: null,
			nextButton: null,
		},

		pagination: {
			presense: false,
			element: null,
		}
	}

	constructor(element, options) {
		this.element = element
		this.options = { ...this.#defaultOptions, ...options }
	}
}

export default Slider