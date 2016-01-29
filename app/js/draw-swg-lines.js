import $ from 'jquery';
import debounce from 'lodash.debounce';
import { dispatcher, actions } from './dispatcher';

const $win               = $(window);
const $featuresContainer = $('.features-container');
const $onvIf             = $featuresContainer.find('.onvif');
const $webAccess         = $featuresContainer.find('.web-access');
const $mobileApp         = $featuresContainer.find('.mobile-app');
const $motion            = $featuresContainer.find('.motion');
const $clouds            = $featuresContainer.find('.clouds');
const $lego              = $featuresContainer.find('.lego');
const $hdd               = $featuresContainer.find('.hdd');
const $transcoder        = $featuresContainer.find('.transcoder');
const $figureIpTv        = $('.hero-figure-iptv');
const $figureIpCam       = $('.hero-figure-ipcam');

let currentState = 'ipcam'; // ipcam or iptv;

const ns = 'http://www.w3.org/2000/svg';

const svgTag = document.createElementNS(ns, 'svg');
const pathTag = document.createElementNS(ns, 'path');

const svg = $(svgTag);
const path = $(pathTag);

svg.append(path).attr({
    id: 'lines-svg'
}).appendTo($featuresContainer);

path.attr({
    stroke: 'rgba(255, 255, 255, 0.8)',
    'stroke-width': 1,
    'stroke-dasharray': 3,
    fill: 'none'
});

$win.on('resize', debounce(() => render(), 50));

dispatcher.on(actions.BEGIN_CHANGE_SECTION, (e, sectionName) => {
    currentState = sectionName;
    render();
});

render();


function getIpCamPoints() {
    const containerOffset = $featuresContainer.offset();
    const onvifOffset     = $onvIf.offset();
    const webAccessOffset = $webAccess.offset();
    const mobileAppOffset = $mobileApp.offset();
    const motionOffset    = $motion.offset();

    return [
        {
            x: $figureIpCam.offset().left + 321,
            y: containerOffset.top
        },
        {
            x: onvifOffset.left + 256,
            y: onvifOffset.top + 27
        },
        {
            x: onvifOffset.left + 5,
            y: onvifOffset.top + 206
        },
        {
            x: webAccessOffset.left + 97,
            y: webAccessOffset.top + 32
        },
        {
            x: onvifOffset.left + 209,
            y: onvifOffset.top + 323
        },
        {
            x: mobileAppOffset.left - 20
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
            x: Math.round(x),
            y: Math.round(y - containerOffset.top)
        };
    });
}

function getIpTvPoints() {
    const containerOffset  = $featuresContainer.offset();
    const cloudsOffset     = $onvIf.offset();
    const transcoderOffset = $transcoder.offset();
    const legoOffset       = $lego.offset();
    const hddOffset        = $hdd.offset();

    return [
        {
            x: $figureIpTv.offset().left + 321,
            y: containerOffset.top
        },
        {
            x: cloudsOffset.left + 75,
            y: cloudsOffset.top + 150
        },
        {
            x: transcoderOffset.left + 62,
            y: transcoderOffset.top + 3
        },
        {
            x: transcoderOffset.left + 176,
            y: transcoderOffset.top + $transcoder.height() - 43
        },
        {
            x: legoOffset.left + 103,
            y: legoOffset.top + $lego.height()
        },
        {
            x: hddOffset.left + 15,
            y: hddOffset.top + 382
        }
    ].map(point => {
        const { x, y } = point;
        return {
            x: Math.round(x),
            y: Math.round(y - containerOffset.top)
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
        `M${x3},${y3} l-10,5 s-5,0 -10,15 v150 s0,15 15,25 L${x4},${y4} ` +
        `M${x5},${y5} l140,135 s10,10 30,15 H${x6} s22,0 40,16 L${x7},${y7} ` +
        `M${x6 + 7},${y5 + 135 + 15} H${x8 - 50} s19,0 30,-20 l20,-30 s5,-12 -5,-20 ` +
        `m17,17 a167,167,0,1,0-12.3-12.08`
    );
}

function renderIpTvLines() {
    const points = getIpTvPoints();

    const { x: x1, y: y1 } = points[0];
    const { x: x2, y: y2 } = points[1];
    const { x: x3, y: y3 } = points[2];
    const { x: x4, y: y4 } = points[3];
    const { x: x5, y: y5 } = points[4];
    const { x: x6, y: y6 } = points[5];

    const _x5 = x5 - 20;
    const _y5 = y5 + 53;

    // const _dx = _x5 - x4;
    // const _dy = y4 - _y5;
    //
    // const _x6 = _x5 - 208;
    // const _y6 = _y5 + 208 * _dy / _dx;

    const _x6 = x6 - 98;
    const _y6 = y6 - 206;

    return (
        `M${x1},${y1} v20 s0,25 -30,30 H${x2 + 200} s-10,0 -20,5 L${x2},${y2} ` +
        `v180 s0,10 10,20 L${x3},${y3} ` +
        `M${x4},${y4} l60,-17 s17,-5 20,-15 l30,-45 s8,-20 30,-20 ` +
        `H${x6 - 200} s18,0 40,-15 L${_x5},${_y5} s15,-6 20,-20 L${x5},${y5} ` +
        `M${_x6},${_y6} s45,-20 40,40 V${y6 - 50} s0,10 10,20 L${x6},${y6}`
    );
}

function render(state = currentState) {
    switch (state) {
        case 'ipcam':
            path.attr('d', renderIpCamLines());
            break;
        case 'iptv':
            path.attr('d', renderIpTvLines());
            break;
        default: return;
    }
}
