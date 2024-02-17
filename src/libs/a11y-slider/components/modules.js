import { slideTo } from "./functions.js"

export class Pagination {
	constructor(slider, slides, options) {
		this.slider = slider
		this.slides = slides
		this.options = options.pagination

		this.element = this.options.element

		if (this.element) this.#setup()
		else console.warn(('Pagination element is undefined'))
	}

	#setup() {
		this.userPointer = {
			isDown: false,
			target: null,
		}

		this.pages = Array.from(this.element.children)
		this.currentPage = this.pages[0]

		this.#addAccessibility()

		this.keyDownHandler = this.keyDownHandler.bind(this)
		this.pointerDownHandler = this.pointerDownHandler.bind(this)
		this.pointerUpHandler = this.pointerUpHandler.bind(this)

		this.element.addEventListener('keydown', this.keyDownHandler)
		this.element.addEventListener('pointerdown', this.pointerDownHandler)
		this.element.addEventListener('pointerup', this.pointerUpHandler)
	}

	#addAccessibility() {
		const buttonAriaLabel = this.options.a11y[1].split(', ')

		this.element.setAttribute('aria-label', `${this.options.a11y[0]}`)

		this.pages.forEach((page, index) => {
			page.children[0].setAttribute('aria-label', `${buttonAriaLabel[0]} ${index + 1} ${buttonAriaLabel[1]} ${this.pages.length}`)

			if (index === 0) {
				page.children[0].setAttribute('aria-current', 'true')
			}
		})
	}

	keyDownHandler(e) {
		const page = e.target.parentElement
		if (page.tagName !== 'LI') return

		switch (e.key) {
			case 'Home':
				e.preventDefault()
				this.changePage(this.pages[0])
				break
			case 'End':
				e.preventDefault()
				this.changePage(this.pages[this.pages.length - 1])
				break
			case 'Enter':
			case ' ':
				e.preventDefault()
				this.changePage(page)
				break
		}
	}

	pointerDownHandler(e) {
		if (e.target.closest('button')) {
			this.userPointer.isDown = true
			this.userPointer.target = e.target
		}
	}

	pointerUpHandler(e) {
		if (!this.userPointer.isDown) return

		if (e.target === this.userPointer.target) {
			this.changePage(e.target.parentElement)
			this.userPointer.isDown = false
		}
	}

	update() {
		this.selectPage(this.pages[this.slider.slides.indexOf(this.slider.currentSlide)])
	}

	selectPage(page) {
		this.currentPage.children[0].removeAttribute('aria-current')
		page.children[0].setAttribute('aria-current', 'true')

		this.currentPage = page
	}

	changePage(page) {
		this.selectPage(page)
		page.children[0].focus()
		slideTo(this.pages.indexOf(page), this.slider)
	}
}

export class Navigation {

	constructor(slider, slides, options) {
		this.slider = slider
		this.slides = slides
		this.options = options.navigation

		this.prevButton = this.options.prevButton
		this.nextButton = this.options.nextButton

		if (this.prevButton && this.nextButton) this.#setup()
		else console.warn(('Navigation buttons are undefined'))
	}

	#setup() {
		this.userPointer = {
			isDown: false,
			target: null,
		}

		this.#addAccessibility()

		this.keyDownHandler = this.keyDownHandler.bind(this)
		this.pointerDownHandler = this.pointerDownHandler.bind(this)
		this.pointerUpHandler = this.pointerUpHandler.bind(this)

		this.prevButton.addEventListener('keydown', this.keyDownHandler)
		this.prevButton.addEventListener('pointerdown', this.pointerDownHandler)
		this.prevButton.addEventListener('pointerup', this.pointerUpHandler)

		this.nextButton.addEventListener('keydown', this.keyDownHandler)
		this.nextButton.addEventListener('pointerdown', this.pointerDownHandler)
		this.nextButton.addEventListener('pointerup', this.pointerUpHandler)
	}

	#addAccessibility() {
		this.prevButton.setAttribute('aria-label', this.options.a11y[0])
		this.nextButton.setAttribute('aria-label', this.options.a11y[1])
	}

	keyDownHandler(e) {
		const pressedButton = e.target.closest('button')

		if (!pressedButton) return

		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault()
			this.changeSlide(pressedButton)
		}
	}

	pointerDownHandler(e) {
		if (e.target.closest('button')) {
			this.userPointer.isDown = true
			this.userPointer.target = e.target.closest('button')
		}
	}

	pointerUpHandler(e) {
		if (!this.userPointer.isDown) return

		if (e.target.closest('button') === this.userPointer.target) {
			e.preventDefault()
			this.changeSlide(this.userPointer.target)

			this.userPointer.isDown = false
		}
	}

	changeSlide(button) {
		const currentSlideIndex = this.slider.currentSlideIndex

		switch (button) {
			case this.prevButton:
				if (this.slider.slides[currentSlideIndex].previousElementSibling) {
					slideTo(currentSlideIndex - 1, this.slider, true)
				} else {
					slideTo(this.slider.slides.length - 1, this.slider, true)
				}
				break
			case this.nextButton:
				if (this.slider.slides[currentSlideIndex].nextElementSibling) {
					slideTo(currentSlideIndex + 1, this.slider, true)
				} else {
					slideTo(0, this.slider, true)
				}
				break
		}
	}
}