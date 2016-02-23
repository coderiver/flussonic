import $ from 'jquery';
window.$ = window.jQuery = $;
import ScrollMagic from 'scrollmagic';
import buildContentFadeScenes from './fade-in-scenes.js';
import svg4everybody from 'svg4everybody';

buildContentFadeScenes();
svg4everybody();

$('.menu-button').on('click touchend', function(e) {
    e.preventDefault();
    $(this).parents('.header').toggleClass('is-show-menu');
});

function innerHeaderScroll() {

    var controller = new ScrollMagic.Controller({
        container: 'body',
        loglevel: 2
    });

	var header = $('.header');

	const scene = new ScrollMagic.Scene({
	    offset: 100,
	    triggerElement: 'body',
	    triggerHook: 'onLeave'
	}).on('start', () => {
	    header.toggleClass('scrolled');
	}).addTo(controller);

}

innerHeaderScroll();