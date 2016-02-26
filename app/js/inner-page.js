import $ from 'jquery';
window.$ = window.jQuery = $;
import ScrollMagic from 'scrollmagic';
import './draw-svg';
import buildContentFadeScenes from './fade-in-scenes.js';
import svg4everybody from 'svg4everybody';

buildContentFadeScenes();
svg4everybody();

$('.menu-button').on('click touchend', function(e) {
    e.preventDefault();
    $(this).parents('.header').toggleClass('is-show-menu');
});

// function innerHeaderScroll() {

//     var controller = new ScrollMagic.Controller({
//         container: 'body',
//         loglevel: 2
//     });

// 	var header = $('.header');

// 	const scene = new ScrollMagic.Scene({
// 	    offset: 100,
// 	    triggerElement: 'body',
// 	    triggerHook: 'onLeave'
// 	}).on('start', () => {
// 	    header.toggleClass('scrolled');
// 	}).addTo(controller);

// }

// innerHeaderScroll();

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

$('.js-sort').on('click', function () {
	$(this).toggleClass('is-active');
	return false;
});

// Iterate over each select element
$('.js-select').each(function () {

	// Cache the number of options
	var this_ = $(this),
		numberOfOptions = this_.children('option').length;

	// Wrap the select element in a div
	this_.wrap('<div class="select"></div>');

	// Insert a styled div to sit over the top of the hidden select element
	this_.after('<div class="styledSelect"></div>');

	// Cache the styled div
	var styledSelect = this_.next('div.styledSelect');

	// Show the first select option in the styled div
	styledSelect.text(this_.children('option').eq(0).text());

	// Insert an unordered list after the styled div and also cache the list
	var list = $('<ul />', {
		'class': 'options'
	}).insertAfter(styledSelect);

	// Insert a list item into the unordered list for each select option
	for (var i = 0; i < numberOfOptions; i++) {
		$('<li />', {
		    text: this_.children('option').eq(i).text(),
		    rel: this_.children('option').eq(i).val()
		}).appendTo(list);
	}

	// Cache the list items
	var listItems = list.children('li');

	// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
	styledSelect.on('click', function (e) {
		e.stopPropagation();

		$('div.styledSelect.is-active').each(function () {
		    $(this).removeClass('is-active').next('ul.options').hide();
		});
		$(this).toggleClass('is-active').next('ul.options').toggle();
		
		// position options
		var li = $(this).next('ul.options').find('li'),
			thisOption = $(this).next('ul.options');

		if (li.hasClass('is-active')) {

			var liActive = $(this).next('ul.options').find('li.is-active'),
				firstLi = $(this).next('ul.options').find('li:first'),
				offset = liActive.position(),
				top = offset.top,
				topPosition = (top + 10);

			thisOption.css('top', -topPosition);
			// console.log('good' + 'top: ' + top);
		}

	});

	// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
	// Updates the select element to have the value of the equivalent option
	listItems.on('click', function (e) {
		e.stopPropagation();
		styledSelect.text($(this).text()).removeClass('is-active');
		this_.val($(this).attr('rel'));
		listItems.removeClass('is-active');
		$(this).addClass('is-active');
		list.hide();
		// console.log(this_.val());
	});

	// Hides the unordered list when clicking outside of it
	$(document).on('click', function () {
		styledSelect.removeClass('is-active');
		list.hide();
	});

});

// anim svg
var $svg = $('.js-svg-anim svg').drawsvg({
	duration: 8000,
	easing: 'linear'
});

setTimeout(function() {
	$svg.drawsvg('animate');
}, 500);

// parallaxScroll
$(window).on('scroll',function(e){
    parallaxScroll();
});
function parallaxScroll(){
	var scrolled 	= $(window).scrollTop(),
		pos 		= 0 + (scrolled * .55) + 'px';
	$svg.css('transform', 'translateY(' + pos + ')');
};
