import Slider from "../../../libs/a11y-slider/a11ySlider.js";
import { Navigation, Pagination } from "../../../libs/a11y-slider/components/modules.js";

const pageSliders = document.querySelectorAll('[data-slider="slider"]')
pageSliders.forEach(slider => {
	new Slider(slider, {
		modules: [Navigation, Pagination],

		transition: 'all 0.3s',

		navigation: {
			prevButton: slider.querySelector('[data-slider="prevButton"]'),
			nextButton: slider.querySelector('[data-slider="nextButton"]'),
		},

		pagination: {
			element: slider.querySelector('[data-slider="pagination"]'),
		},
	})
})
