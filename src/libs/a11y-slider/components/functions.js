export function slideTo(slideIndex, slider, needUpdate = false, animation = null) {
	const newPage = slider.slides[slideIndex]
	const statusTextTemplate = slider.options.slideStatusA11y.split(', ')

	slider.currentSlide?.setAttribute('aria-hidden', 'true')
	slider.slides[slideIndex].removeAttribute('aria-hidden')

	slider.status.innerText = `${statusTextTemplate[0]} ${slideIndex + 1} ${statusTextTemplate[1]} ${slider.slides.length}`

	if (!animation) {
		const translateWidth = newPage.offsetWidth + (parseFloat(getComputedStyle(newPage.parentElement).columnGap) || 0)
		newPage.parentElement.style.transform = `translateX(-${translateWidth * slideIndex}px)`
	} else {
		animation()
	}

	slider.currentSlide = slider.slides[slideIndex]
	slider.currentSlideIndex = slideIndex

	if (needUpdate) slider.update()
}