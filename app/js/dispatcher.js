import $ from 'jquery';

export const actions = {
    BEGIN_CHANGE_SECTION: 'BEGIN_CHANGE_SECTION',
    END_CHANGE_SECTION: 'END_CHANGE_SECTION',
    CHANGE_SECTION: 'CHANGE_SECTION'
};

export const dispatcher = {
    _o: $({}),

    on() {
        this._o.on.apply(this._o, arguments);
    },

    one() {
        this._o.one.apply(this._o, arguments);
    },

    off() {
        this._o.off.apply(this._o, arguments);
    },

    trigger() {
        this._o.trigger.apply(this._o, arguments);
    }
};
