import $ from 'jquery';
window.$ = window.jQuery = $;
import './draw-svg';

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

$('.hero-btn').on('click', toggleSection);
