import $ from 'jquery';
import debounce from 'lodash.debounce';

const $win               = $(window);
const $featuresContainer = $('.features-container');
const $onvIf             = $featuresContainer.find('.onvif');
const $webAccess         = $featuresContainer.find('.web-access');
const $mobileApp         = $featuresContainer.find('.mobile-app');
const $motion            = $featuresContainer.find('.motion');
const $figureIpTV        = $('.hero-figure-iptv');
const $figureIpCam       = $('.hero-figure-ipcam');

const currentState = 'ipcam';

const svgTag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const pathTag = document.createElementNS('http://www.w3.org/2000/svg', 'path');

const svg = $(svgTag);
const path = $(pathTag);

svg.append(path).attr({
    id: 'lines-svg',
    width: '100%',
    height: '100%'
}).css({
    position: 'absolute',
    top: '0',
    left: '0',
    'z-index': 0,
    'pointer-events': 'none'
}).appendTo($featuresContainer);

path.attr({
    stroke: 'rgba(255, 255, 255, 0.8)',
    'stroke-width': 1,
    'stroke-dasharray': 3,
    fill: 'none'
});

$win.on('load', () => {
    render();
    // svg.drawsvg({
    //     duration: 2000,
    //     stagger: 300,
    //     reverse: false
    // });
    // setTimeout(() => {
    //     svg.drawsvg('animate');
    // }, 3000);
});
$win.on('resize', debounce(render, 50));


function getIpCamPoints() {
    const containerOffset = $featuresContainer.offset();
    const onvifOffset     = $onvIf.offset();
    const webAccessOffset = $webAccess.offset();
    const mobileAppOffset = $mobileApp.offset();
    const motionOffset    = $motion.offset();

    return [
        {
            x: $figureIpCam.offset().left + 321,
            y: $featuresContainer.offset().top
        },
        {
            x: onvifOffset.left + 255,
            y: onvifOffset.top + 26
        },
        {
            x: onvifOffset.left + 5,
            y: onvifOffset.top + 205
        },
        {
            x: webAccessOffset.left + 97,
            y: webAccessOffset.top + 12
        },
        {
            x: onvifOffset.left + 209,
            y: onvifOffset.top + 323
        },
        {
            x: mobileAppOffset.left - 40
        },
        {
            x: mobileAppOffset.left + 120,
            y: mobileAppOffset.top + 28
        },
        {
            x: motionOffset.left,
            y: motionOffset.top + $motion.height()
        }
    ].map(point => {
        const { x, y } = point;
        return {
            x,
            y: y - containerOffset.top
        };
    });
}

function renderIpCamLines() {
    const points = getIpCamPoints();
    const { x: x1, y: y1 } = points[0];
    const { x: x2, y: y2 } = points[1];
    const { x: x3, y: y3 } = points[2];
    const { x: x4, y: y4 } = points[3];
    const { x: x5, y: y5 } = points[4];
    const { x: x6 }        = points[5];
    const { x: x7, y: y7 } = points[6];
    const { x: x8, y: y8 } = points[7];
    return (
        `M${x1},${y1} v20 s0,25 -30,30 H${x2 + 80} s-10,0 -20,5 L${x2},${y2} ` +
        `M${x3},${y3} l-10,5 s-5,0 -10,15 v100 s0,15 15,25 L${x4},${y4} ` +
        `M${x5},${y5} l110,95 s10,10 30,15 H${x6} s25,0 40,20 L${x7},${y7} ` +
        `M${x6},${y5 + 95 + 15} H${x8 - 50} s15,0 30,-20 l20,-30 s5,-12 -5,-20 ` +
        `m17,17 a167,167,0,1,0-12.3-12.08`
    );
}

function draw() {
    path.attr({
        d: renderIpCamLines()
    });
}

function render() {
    // setSize();
    draw();
}
