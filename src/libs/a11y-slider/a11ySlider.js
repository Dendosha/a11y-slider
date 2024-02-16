import deepObjectMerge from "../deep-object-merge/deepObjectMerge.js"

class Slider {
	#defaultOptions = {
		loop: false,

		buttons: {
			prevButton: null,
			nextButton: null,
			a11y: ['Previous slide', 'Next slide'],
		},

		pagination: {
			element: null,
			a11y: ['Slider pagination', 'Slide'],
		}
	}

	constructor(element, options) {
		this.element = element
		this.options = deepObjectMerge(this.#defaultOptions, options)

		this.#setup()
	}

	#setup() {
		this.userPointer = {
			isDown: false,
			element: null,
		}

		this.slideList = this.element.querySelector('[data-slider="slideList"]')
		this.slides = Array.from(this.slideList.children)

		this.#addAccessibility()

		this.slideTo(0)

		this.pointerDownHandler = this.pointerDownHandler.bind(this)
		this.pointerUpHandler = this.pointerUpHandler.bind(this)
		this.pointerMoveHandler = this.pointerMoveHandler.bind(this)
		this.pointerLeaveHandler = this.pointerLeaveHandler.bind(this)

		this.element.addEventListener('pointerdown', this.pointerDownHandler)
		this.element.addEventListener('pointerup', this.pointerUpHandler)
		this.element.addEventListener('pointermove', this.pointerMoveHandler)
		this.element.addEventListener('pointerleave', this.pointerLeaveHandler)
	}

	#addAccessibility() {
		let havePagination = this.options.pagination.element
		this.options?.buttons?.prevButton?.setAttribute('aria-label', this.options?.buttons?.a11y[0])
		this.options?.buttons?.nextButton?.setAttribute('aria-label', this.options?.pagination?.a11y[1])

		if (havePagination) {
			this.options.pagination.element.setAttribute('aria-label', this.options.pagination.a11y[0])
		}

		this.slides.forEach((slide, index) => {
			slide.setAttribute('tabindex', '-1')

			if (havePagination) {
				const pageButton = this.options.pagination.element.children[index]
				pageButton.setAttribute('aria-label', `${this.options.pagination.a11y[1]} ${index}`)
			}
		})
	}

	pointerDownHandler() { }

	pointerUpHandler() { }

	pointerMoveHandler() { }

	pointerLeaveHandler() { }

	slideTo(slideIndex) {
		this.slides[slideIndex].setAttribute('tabindex', '0')
	}

	slidePrev() { }

	slideNext() { }
}

export default Slider