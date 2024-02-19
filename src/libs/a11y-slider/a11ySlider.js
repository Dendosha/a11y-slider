// import deepObjectMerge from "../deep-object-merge/deepObjectMerge.js"
import { slideTo } from "./components/functions.js"

class Slider {

	constructor(element, options) {
		this.element = element
		this.options = options

		this.moduleInstances = []

		this.#setup()
	}

	#setup() {
		this.userPointer = {
			isDown: false,
			target: null,
		}

		this.slideList = this.element.querySelector('[data-slider="slideList"]')
		this.slideList.style.transition = this.options.transition || ''
		this.slideList.style.cursor = this.options.cursor.pointerEnter || 'default'

		this.slides = Array.from(this.slideList.children)
		this.currentSlide = null
		this.currentSlideIndex = null

		this.#addAccessibility()

		try {
			this.options.modules.forEach(Module => {
				const moduleInstance = new Module(this, this.slides, this.options)
				this.moduleInstances.push(moduleInstance)

				if (moduleInstance.slideAnimation) this.animation = moduleInstance.slideAnimation.bind(moduleInstance)
			})
		} catch (error) {
			console.error(error)
		}

		slideTo(0, this, this.animation)
	}

	#addAccessibility() {
		if (this.options.skipSlider.buttonPresense) {
			this.endOfSlider = document.createElement('div')
			this.endOfSlider.innerText = this.options.skipSlider.a11y?.[1] || 'End of slider'
			this.endOfSlider.setAttribute('tabindex', '-1')
			this.endOfSlider.classList.add('--visually-hidden', '--sr-only', '--end-of-slider')

			this.skipSliderButton = document.createElement('button')
			this.skipSliderButton.innerText = this.options.skipSlider.a11y?.[0] || 'Skip slider'
			this.skipSliderButton.classList.add('--visually-hidden', '--sr-only', '--skip-slider-button')

			this.element.append(this.endOfSlider)
			this.element.prepend(this.skipSliderButton)

			this.skipSliderButton.addEventListener('click', (e) => {
				this.endOfSlider.focus()
			})
		}

		const statusTextTemplate = this.options.slideStatusA11y?.split(', ') || ['Displaying slide', 'of']

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

	update() {
		this.moduleInstances.forEach(moduleInstance => {
			if (moduleInstance.update) moduleInstance.update()
		})
	}
}

export default Slider