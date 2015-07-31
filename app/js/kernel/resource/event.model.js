define([
    'config/app',
    'clientCore/resource/base.model'
], function (config, BaseModel) {
    return BaseModel.extend({
        idAttribute: '_id',
        
        defaults: {
            title: '',
            description: '',
            start: new Date(),
            end: new Date(),
            isAllDay: false,
            isRepeat: false,
            calendarId: null
        },

        _urls: {
            create: config.proxy.origin + '/api/calendar/event/create'
        },

        validation: {
            title: {
                required: true
            },
            start: {
                required: true
            },
            end: {
                required: true
            },
            isAllDay: {
                required: true
            },
            isRepeat: {
                required: false
            },
            calendarId: {
                required: true
            }
        },

        initialize: function (options) {
            BaseModel.prototype.initialize.apply(this, arguments);
        },

        create: function () {
            var model = this.toJSON();

            return this.fetch({
                type: "POST",
                url: this._urls.create,
                data: JSON.stringify({
                    title: this.get('title'),
                    description: this.get('description'),
                    start: this.get('start'),
                    end: this.get('end'),
                    isAllDay: this.get('isAllDay'),
                    calendarId: this.get('calendarId'),
                    isRepeat: this.get('isRepeat')
                })
            });
        }
    });
});