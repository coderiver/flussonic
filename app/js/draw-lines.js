import $ from 'jquery';
import debounce from 'lodash.debounce';

const $win = $(window);
const $featuresContainer = $('.features-container');
const $figureIpTV = $('.hero-figure-iptv');
const $figureIpCam = $('.hero-figure-ipcam');

const canvas = $('<canvas></canvas>', {
    id: 'lines-canvas',
    css: {
        position: 'absolute',
        top: '0',
        left: '0',
        'pointer-events': 'none'
    }
}).appendTo('.out');

const ctx = canvas[0].getContext('2d');


draw();

$(window).on('resize', debounce(draw, 300));

console.log(ctx);
console.log(calcCoords());

/**
 * helpers
 */

function calcHeight() {
    return $featuresContainer.outerHeight() + $featuresContainer.offset().top;
}

function setSize() {
    canvas.attr({
        width: $win.width(),
        height: calcHeight()
    });
}

function calcCoords() {
    let res = [];
    const point1 = $figureIpCam.offset();
    // const point2 =

    res.push({
        x: point1.top,
        y: point1.left
    });

    return res;
}

function draw() {
    setSize();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.setLineDash([3, 3]);
    ctx.moveTo(100, 150);
    ctx.lineTo(450, 50);
    ctx.lineTo(456, 200);
    ctx.quadraticCurveTo(288, 0, 388, 150);

    ctx.stroke();
}
