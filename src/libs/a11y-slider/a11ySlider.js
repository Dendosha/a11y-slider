import deepObjectMerge from "../deep-object-merge/deepObjectMerge.js"
import { slideTo } from "./components/functions.js"

class Slider {
	#defaultOptions = {
		modules: [],

		loop: false,
		transition: '',
		cursor: {
			default: 'default',
			grab: 'default',
		},
		slideStatusA11y: 'Displaying slide, of',

		skipSlider: {
			buttonPresense: true,
			a11y: ['Skip slider', 'End of slider'],
		},

		navigation: {
			prevButton: null,
			nextButton: null,
			a11y: ['Previous slide', 'Next slide'],
		},

		pagination: {
			element: null,
			a11y: ['Slider pagination', 'Slide to, of'],
		},
	}

	constructor(element, options) {
		this.element = element
		this.options = deepObjectMerge(this.#defaultOptions, options)

		this.moduleInstances = []

		this.#setup()
	}

	#setup() {
		this.userPointer = {
			isDown: false,
			target: null,
		}

		this.grabSlideList = {
			clientX: 0,
			clientY: 0,
			needChangeSlide: false,
			newSlideIndex: null,
			translated: 0,
		}

		this.slideList = this.element.querySelector('[data-slider="slideList"]')
		this.slideList.style.transition = this.options.transition
		this.slideList.style.cursor = this.options.cursor.default

		this.slides = Array.from(this.slideList.children)
		this.currentSlide = null
		this.currentSlideIndex = null

		this.#addAccessibility()

		this.options.modules.forEach(Module => {
			const moduleInstance = new Module(this, this.slides, this.options)
			this.moduleInstances.push(moduleInstance)
		})

		this.pointerDownHandler = this.pointerDownHandler.bind(this)
		this.pointerUpHandler = this.pointerUpHandler.bind(this)
		this.pointerMoveHandler = this.pointerMoveHandler.bind(this)

		this.element.addEventListener('pointerdown', this.pointerDownHandler)
		this.element.addEventListener('pointerup', this.pointerUpHandler)
		this.element.addEventListener('pointermove', this.pointerMoveHandler)

		slideTo(0, this)
	}

	#addAccessibility() {
		if (this.options.skipSlider.buttonPresense) {
			this.endOfSlider = document.createElement('div')
			this.endOfSlider.innerText = this.options.skipSlider.a11y[1]
			this.endOfSlider.setAttribute('tabindex', '-1')
			this.endOfSlider.classList.add('--visually-hidden', '--sr-only', '--end-of-slider')

			this.skipSliderButton = document.createElement('button')
			this.skipSliderButton.innerText = this.options.skipSlider.a11y[0]
			this.skipSliderButton.classList.add('--visually-hidden', '--sr-only', '--skip-slider-button')

			this.element.append(this.endOfSlider)
			this.element.prepend(this.skipSliderButton)

			this.skipSliderButton.addEventListener('click', (e) => {
				this.endOfSlider.focus()
			})
		}

		const statusTextTemplate = this.options.slideStatusA11y.split(', ')

		this.status = document.createElement('div')
		this.element.append(this.status)

		this.status.setAttribute('role', 'status')
		this.status.classList.add('--slider-status', '--visually-hidden')
		this.status.innerText = `${statusTextTemplate[0]} 1 ${statusTextTemplate[1]} ${this.slides.length}`

		this.slides.forEach((slide, index) => {
			if (index === 0) {
				this.currentSlide = slide
			} else {
				slide.setAttribute('aria-hidden', 'true')
			}
		})
	}

	pointerDownHandler(e) {
		if (e.target.closest('[data-slider="slideList"]')) {
			this.userPointer.isDown = true
			this.userPointer.target = e.target
			this.grabSlideList.clientX = e.clientX
			this.grabSlideList.clientY = e.clientY

			this.slideList.style.transition = ''
			this.slideList.style.cursor = this.options.cursor.grab
		}
	}

	pointerUpHandler(e) {
		if (this.userPointer.isDown) {
			this.userPointer.isDown = false
			this.userPointer.target = null
			this.grabSlideList.clientX = 0
			this.grabSlideList.clientY = 0

			if (this.grabSlideList.needChangeSlide) {
				slideTo(this.grabSlideList.newSlideIndex, this, true)
			} else {
				this.slideList.style.transform = `translateX(${this.grabSlideList.translated}px)`
			}

			this.slideList.style.transition = this.options.transition
			this.slideList.style.cursor = this.options.cursor.default
		}
	}

	pointerMoveHandler(e) {
		if (!this.userPointer.isDown) return

		const translateWidth = this.currentSlide.offsetWidth + parseFloat(getComputedStyle(this.slideList).columnGap || 0)
		this.grabSlideList.translated = -translateWidth * this.currentSlideIndex
		const translateChange = e.clientX - this.grabSlideList.clientX
		const translateValue = this.grabSlideList.translated + translateChange

		this.slideList.style.transform = `translateX(${translateValue}px)`

		if (translateChange < 0 && Math.abs(translateChange) >= translateWidth / 2) {
			this.grabSlideList.needChangeSlide = true

			if (this.currentSlideIndex !== this.slides.length - 1) {
				this.grabSlideList.newSlideIndex = this.currentSlideIndex + 1
			} else {
				this.grabSlideList.newSlideIndex = 0
			}

		} else if (translateChange > 0 && Math.abs(translateChange) >= translateWidth / 2) {
			this.grabSlideList.needChangeSlide = true

			if (this.currentSlideIndex !== 0) {
				this.grabSlideList.newSlideIndex = this.currentSlideIndex - 1
			} else {
				this.grabSlideList.newSlideIndex = this.slides.length - 1
			}

		}
	}

	update() {
		this.moduleInstances.forEach(moduleInstance => {
			if (moduleInstance.update) moduleInstance.update()
		})
	}
}

export default Slider