import ScrollMagic from 'scrollmagic';
import debounce from 'lodash.debounce';

function buildContentFadeScenes(controller) {
    const sections = $('.fade-in');
    const duration = 500;
    const stack = [];

    if (controller == null ) {
        controller = new ScrollMagic.Controller({
            container: 'body',
            loglevel: 2
        });
    }

    const debouncedAnimate = debounce(() => {
        stack.forEach((obj, i) => {
            let delay = 150 * i;
            delay = delay > 450 ? 450 : delay;

            if (obj.init) return;

            obj.init = true;

            setTimeout(() => {
                obj.$el.addClass('animate');
            }, delay);

            setTimeout(() => {
                obj.$el.removeClass('fade-in slide-up animate');
            }, delay + duration);
        });
        stack.length = 0;
    }, 100);

    sections.each((index, section) => {
        let $section = $(section);
        let offset = $section.hasClass('slide-up') ? 100 : 50;

        let scene = new ScrollMagic.Scene({
            offset,
            triggerElement: section,
            triggerHook: 'onEnter'
        }).on('start', () => {
            stack.push({
                $el: $section,
                init: false
            });
            debouncedAnimate();
            scene.destroy();
        }).addTo(controller);
    });
}

export default buildContentFadeScenes
