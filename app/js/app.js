import $ from 'jquery';
import autosize from 'autosize';
import ScrollMagic from 'scrollmagic';
import debounce from 'lodash.debounce';
import SVGMorpheus from './svgmorpheus';
import { initMap } from './map';
import { dispatcher, actions } from './dispatcher';
import './draw-swg-lines';
window.$ = window.jQuery = $;
import './draw-svg';
import 'jquery.transit';

const scrollController = new ScrollMagic.Controller({
    container: 'body',
    loglevel: 2
});

const mq = window.matchMedia('(max-width: 767px)');

$('.hero-btn').on('click touchend', toggleSection);

$(window).on('resize', debounce(() => {
    setFeaturesHeight();
}, 200));

$('.menu-button').on('click touchend', function(e) {
    e.preventDefault();
    $(this).parents('.header').toggleClass('show-menu');
});

$('.header .lang').on('touchend', function() {
    const $this = $(this);
    $this.addClass('hover');
    setTimeout(() => {
        $('body').one('touchend', function() {
            $this.removeClass('hover');
        });
    }, 100);
});

morhOnvif();
morphLightning();
initTextareaAutoresize();
buildHeaderScrollScene();
buildLegoScene();
setFeaturesHeight();
initMap('#map');

function drawHeroSvg(el) {
    if (mq.matches) return;

    if (typeof el === 'string') {
        el = $(el);
    }

    if (/drawsvg-initialized/.test(el.attr('class'))) {
        el.drawsvg('animate');
        return;
    }

    el.drawsvg({
        duration: 1000,
        stagger: 0,
        reverse: false
    });

    el.drawsvg('animate');
}

function toggleSection(e) {
    e.preventDefault();

    const targetBtn = $(e.delegateTarget);

    if (targetBtn.hasClass('is-active')) return;

    const sectionName  = targetBtn.data('section');
    const targetFigure = $(`.hero-figure-${sectionName}`);
    const targetFeatures = $(`.features-${sectionName}`);


    $('.hero-btn.is-active, .hero-figure.is-active, .features.is-active').removeClass('is-active');

    targetBtn
        .add(`.hero-btn[data-section='${sectionName}']`)
        .add(targetFigure)
        .add(targetFeatures)
        .addClass('is-active');

    setFeaturesHeight(targetFeatures);

    drawHeroSvg(targetFigure.find('svg'));

    dispatcher.trigger(actions.CHANGE_SECTION, sectionName);
}

function setFeaturesHeight(activeFeatures) {
    if (activeFeatures === undefined || activeFeatures === null) {
        activeFeatures = $('.features.is-active');
    }

    activeFeatures.parent().css({ height: activeFeatures.outerHeight() });
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

function buildHeaderScrollScene() {
    const header    = $('header');
    const container = $('.features-container');
    const trigger   = $('.hero .hero-links');

    function calcDuration() {
        return container.outerHeight() + container.offset().top - trigger.offset().top - 70;
    }

    const scene = new ScrollMagic.Scene({
        duration: calcDuration(),
        offset: -22,
        triggerElement: trigger[0],
        triggerHook: 'onLeave'
    }).on('start', (e) => {
        header.toggleClass('show-buttons');
    }).on('end', (e) => {
        header.toggleClass('hide-buttons');
    }).addTo(scrollController);

    $(window).on('resize', debounce((e) => {
        scene.duration(calcDuration());
    }, 500));
}

function buildLegoScene() {
    const container  = $('.lego');
    const upperBrick = container.find('.lego__brick-upper');
    const deltaY     = -100;

    const scene = new ScrollMagic.Scene({
        duration: 200,
        triggerElement: container[0],
        triggerHook: 'onCenter'
    }).on('progress', (e) => {
        upperBrick.transit({
            y: deltaY - (deltaY * e.progress)
        }, 300, 'linear');
    }).on('end', (e) => {
        container.toggleClass('animation-done');
    }).addTo(scrollController);
}
