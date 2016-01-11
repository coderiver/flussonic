import $ from 'jquery';
import autosize from 'autosize';
import SVGMorpheus from './svgmorpheus';
import {initMap} from './map';
window.$ = window.jQuery = $;
import './draw-svg';

$('.hero-btn').on('click', toggleSection);

morhOnvif();
morphLightning();
initTextareaAutoresize();
initMap('#map');

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
    let targetBtn, sectionName, targetFigure, targetFeatures;

    e.preventDefault();

    targetBtn = $(e.delegateTarget);

    if (targetBtn.hasClass('is-active')) return;

    sectionName  = targetBtn.data('section');
    targetFigure = $(`.hero-figure-${sectionName}`);
    targetFeatures = $(`.features-${sectionName}`);


    $('.hero-btn.is-active, .hero-figure.is-active, .features.is-active').removeClass('is-active');

    targetBtn.add(targetFigure).add(targetFeatures).addClass('is-active');

    drawHeroSvg(targetFigure.find('svg'));
}

function morhOnvif() {
    const morph = new SVGMorpheus('.onvif svg');

    const options = {
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

function morphLightning() {
    const morph = new SVGMorpheus('#lightning-shape');

    function toStateOne() {
        morph.to('lightningpath2', {
            duration: 1500,
            rotation: 'none',
            easing: 'sine-in-out'
        }, toStateTwo);
    }

    function toStateTwo() {
        morph.to('lightningpath3', {
            duration: 2500,
            rotation: 'none',
            easing: 'sine-in-out'
        }, toStateTree);
    }

    function toStateTree() {
        morph.to('lightningpath1', {
            duration: 1500,
            rotation: 'none',
            easing: 'sine-in-out'
        }, toStateOne);
    }

    toStateOne();
}

function initTextareaAutoresize() {
    let el = $('textarea').filter('[data-autoresize]');
    if (el.length) {
        autosize(el);
    }
}
