import Slider from "../../../libs/a11y-slider/a11ySlider.js";
import { StandardEffect, Navigation, Pagination } from "../../../libs/a11y-slider/components/modules.js";

const pageSliders = document.querySelectorAll('[data-slider="slider"]')
pageSliders.forEach(slider => {
	new Slider(slider, {
		modules: [StandardEffect, Navigation, Pagination],

		transition: 'all 0.3s',
		cursor: {
			pointerEnter: 'pointer',
			grab: 'grab',
		},

		slideStatusA11y: 'Показывается слайд, из',

		skipSlider: {
			buttonPresense: true,
			a11y: ['Пропустить слайдер', 'Конец слайдера'],
		},

		navigation: {
			prevButton: slider.querySelector('[data-slider="prevButton"]'),
			nextButton: slider.querySelector('[data-slider="nextButton"]'),
			a11y: ['Предыдущий слайд', 'Следующий слайд'],
		},

		pagination: {
			element: slider.querySelector('[data-slider="pagination"]'),
			a11y: ['Пагинация слайдера', 'Переключить на, из'],
		},
	})
})