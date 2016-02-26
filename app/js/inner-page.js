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

// accord
var acord 		= $('.js-accord'),
	acordBlock  = $('.js-accord-block');
$('.js-accord-top').on('click', function(){
	var this_ 	= $(this),
		parent 	= this_.parents('.js-accord'),
		block 	= parent.find('.js-accord-block');
	if (parent.hasClass('is-active')) {
		parent.removeClass('is-active');
		block.slideUp(300);
	}
	else {
		acord.removeClass('is-active');
		acordBlock.slideUp(300);
		parent.addClass('is-active');
		block.slideDown(300);
	}
	setTimeout(function() {header_bg();}, 350);
	return false;
});
acord.each(function(){
	var accord = $(this),
		accordBlock = accord.find(acordBlock);
	if (accord.hasClass('is-active')) {
		accordBlock.show();
	};
});