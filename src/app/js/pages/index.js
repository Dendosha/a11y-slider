import Slider from "../../../libs/a11y-slider/a11ySlider.js";

const pageSliders = document.querySelectorAll('[data-slider="slider"]')
pageSliders.forEach(slider => {
	new Slider(slider, {
		buttons: {
			prevButton: slider.querySelector('[data-slider="prevButton"]'),
			nextButton: slider.querySelector('[data-slider="nextButton"]'),
		},

		pagination: {
			element: slider.querySelector('[data-slider="pagination"]'),
		}
	})
})