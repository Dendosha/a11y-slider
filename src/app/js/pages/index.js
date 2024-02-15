import Slider from "../../../libs/a11y-slider/a11y-slider.js";

const pageSliders = document.querySelectorAll('[data-slider]')
pageSliders.forEach(slider => {
	new Slider(slider, {

	})
})