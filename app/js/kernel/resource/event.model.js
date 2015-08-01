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
            create: config.proxy.origin + '/api/calendar/event/create',
            remove: config.proxy.origin + '/api/calendar/event/delete'
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
            repeatType: function () {
                if( this.get('isRepeat') && !this.get('repeatType') ){
                    return 'Repeated type should exists';
                }
            },
            repeatDays: function () {
                var model = this.toJSON();

                if( model.isRepeat && model.repeatType == 2 && (!model.repeatDays || !model.repeatDays.length) ){
                    return 'Repeated days should exists';
                }
            },
            calendarId: {
                required: true
            }
        },

        initialize: function (options) {
            BaseModel.prototype.initialize.apply(this, arguments);
        },

        create: function () {
            var model = this.toJSON(),
                data = {
                    title: model.title,
                    description: model.description,
                    start: model.start,
                    end: model.end,
                    isAllDay: model.isAllDay,
                    calendarId: model.calendarId,
                    isRepeat: model.isRepeat
                };

            if( model.isRepeat ){
                data.repeatType = model.repeatType;

                if( model.repeatType == 2 ){
                    data.repeatDays = model.repeatDays;
                }

                if(model.repeatEnd){
                    data.repeatEnd = model.repeatEnd;
                }
            }

            return this.fetch({
                type: "POST",
                url: this._urls.create,
                data: JSON.stringify(data)
            });
        },

        remove: function () {
            var model = this.toJSON();

            return this.fetch({
                type: "POST",
                url: this._urls.remove,
                data: JSON.stringify({
                    _id: (model.rawId) ? model.rawId : model._id
                })
            });
        }
    });
});