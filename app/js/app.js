import $ from 'jquery';
import SVGMorpheus from './svgmorpheus';
import autosize from 'autosize';
window.$ = window.jQuery = $;
import './draw-svg';

$('.hero-btn').on('click', toggleSection);

// morhOnvif();
initTextareaAutoresize();

function drawHeroSvg(el) {
    if (typeof el === 'string') {
        el = $(el);
    }

    el.drawsvg({
        duration: 1000,
        stagger: 0,
        reverse: false,
        callback() {
            el.find('path').removeAttr('style');
        }
    });

    el.drawsvg('animate');
}

function toggleSection(e) {
    let targetBtn, sectionName, targetFigure;

    e.preventDefault();

    targetBtn = $(e.delegateTarget);

    if (targetBtn.hasClass('is-active')) return;

    sectionName  = targetBtn.data('section');
    targetFigure = $(`.hero-figure-${sectionName}`);

    $('.hero-btn.is-active, .hero-figure.is-active').removeClass('is-active');

    targetBtn.add(targetFigure).addClass('is-active');

    drawHeroSvg(targetFigure.find('svg'));
}

function morhOnvif() {
    let morph = new SVGMorpheus('.onvif svg');

    let options = {
        duration: 5000,
        rotation: 'none',
        easing: 'sine-in-out'
    };

    function toStateOne() {
        morph.to('onvif-state-1', options, toStateTwo);
    }

    function toStateTwo() {
        morph.to('onvif-state-2', options, toStateThree);
    }

    function toStateThree() {
        morph.to('onvif-state-3', options, toStateOne);
    }

    toStateOne();
}

function initTextareaAutoresize() {
    let el = $('textarea').filter('[data-autoresize]');
    if (el.length) {
        autosize(el);
    }
}
