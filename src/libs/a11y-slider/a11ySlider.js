import deepObjectMerge from "../deep-object-merge/deepObjectMerge.js"

class Slider {
	#defaultOptions = {
		modules: [],

		loop: false,

		navigation: {
			prevButton: null,
			nextButton: null,
			a11y: ['Previous slide', 'Next slide'],
		},

		pagination: {
			element: null,
			a11y: ['Slider pagination', 'Slide'],
			keys: {
				prevSlide: 'ArrowLeft',
				nextSlide: 'ArrowRight',
			},
		},
	}

	constructor(element, options) {
		this.element = element
		this.options = deepObjectMerge(this.#defaultOptions, options)

		this.#setup()
	}

	#setup() {
		this.userPointer = {
			isDown: false,
			target: null,
		}

		this.slideList = this.element.querySelector('[data-slider="slideList"]')
		this.slideList.style.transition = this.options.transition

		this.slides = Array.from(this.slideList.children)
		this.currentSlide = null

		this.#addAccessibility()

		this.options.modules.forEach(Module => {
			new Module(this, this.slides, this.options)
		})

		this.#addAccessibility()

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
		this.slides.forEach((slide, index) => {
			if (index === 0) {
				slide.setAttribute('tabindex', '0')

				this.currentSlide = slide
			} else {
				slide.setAttribute('tabindex', '-1')
			}
		})
	}

	pointerDownHandler(e) {

	}

	pointerUpHandler(e) {

	}

	pointerMoveHandler(e) {

	}

	pointerLeaveHandler(e) {

	}
}

export default Slider