export function slideTo(slideIndex, slider, animation = null, needUpdate = false) {
	const statusTextTemplate = slider.options.slideStatusA11y?.split(', ') || ['Displaying slide', 'of']

	slider.currentSlide?.setAttribute('aria-hidden', 'true')
	slider.slides[slideIndex].removeAttribute('aria-hidden')

	slider.status.innerText = `${statusTextTemplate[0]} ${slideIndex + 1} ${statusTextTemplate[1]} ${slider.slides.length}`

	animation(slideIndex)

	slider.currentSlide = slider.slides[slideIndex]
	slider.currentSlideIndex = slideIndex

	if (needUpdate) slider.update()
}