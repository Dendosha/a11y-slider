export function slideTo(slideIndex, context, animation) {
	const newPage = context.slides[slideIndex]

	context.currentSlide?.setAttribute('tabindex', '-1')
	context.slides[slideIndex].setAttribute('tabindex', '0')

	if (!animation) {
		const translateWidth = newPage.offsetWidth + (parseFloat(getComputedStyle(newPage.parentElement).columnGap) || 0)
		newPage.parentElement.style.transform = `translateX(-${translateWidth * slideIndex}px)`
	}

	context.currentSlide = context.slides[slideIndex]
}