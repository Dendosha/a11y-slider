export function slideTo(slideIndex, context, needUpdate = false, animation = null) {
	const newPage = context.slider.slides[slideIndex]

	context.slider.currentSlide?.setAttribute('tabindex', '-1')
	context.slider.slides[slideIndex].setAttribute('tabindex', '0')

	if (!animation) {
		const translateWidth = newPage.offsetWidth + (parseFloat(getComputedStyle(newPage.parentElement).columnGap) || 0)
		newPage.parentElement.style.transform = `translateX(-${translateWidth * slideIndex}px)`
	}

	context.slider.currentSlide = context.slider.slides[slideIndex]

	if (needUpdate) context.slider.update()
}