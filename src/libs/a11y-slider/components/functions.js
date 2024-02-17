export function slideTo(slideIndex, context, needUpdate = false, animation = null) {
	const newPage = context.slider.slides[slideIndex]
	const statusTextTemplate = context.slider.options.slideStatusA11y.split(', ')

	context.slider.currentSlide?.setAttribute('aria-hidden', 'true')
	context.slider.slides[slideIndex].removeAttribute('aria-hidden')

	context.slider.status.innerText = `${statusTextTemplate[0]} ${slideIndex + 1} ${statusTextTemplate[1]} ${context.slider.slides.length}`

	if (!animation) {
		const translateWidth = newPage.offsetWidth + (parseFloat(getComputedStyle(newPage.parentElement).columnGap) || 0)
		newPage.parentElement.style.transform = `translateX(-${translateWidth * slideIndex}px)`
	}

	context.slider.currentSlide = context.slider.slides[slideIndex]

	if (needUpdate) context.slider.update()
}