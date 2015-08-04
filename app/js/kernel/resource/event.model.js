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
                save: config.proxy.origin + '/api/calendar/event/edit',
                remove: config.proxy.origin + '/api/calendar/event/delete',
                getById: config.proxy.origin + '/api/calendar/event/get'
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
                    if (this.get('isRepeat') && !this.get('repeatType')) {
                        return 'Repeated type should exists';
                    }
                },
                repeatDays: function () {
                    var model = this.toJSON();

                    if (model.isRepeat && model.repeatType == 2 && (!model.repeatDays || !model.repeatDays.length)) {
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

            getId: function () {
                var rawId = this.get('rawId');

                return (rawId) ? rawId : this.get('_id');
            },

            parse: function (data) {
                if (_.isString(data.start)) {
                    data.start = new Date(data.start);
                }

                if (_.isString(data.end)) {
                    data.end = new Date(data.end);
                }

                return data;
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

                if (model.isRepeat) {
                    data.repeatType = model.repeatType;

                    if (model.repeatType == 2) {
                        data.repeatDays = model.repeatDays;
                    }

                    if (model.repeatEnd) {
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
                return this.fetch({
                    type: "POST",
                    url: this._urls.remove,
                    data: JSON.stringify({
                        _id: this.getId()
                    })
                });
            },

            save: function () {
                var model = this.toJSON(),
                    data = {
                        _id: this.getId(),
                        title: model.title,
                        description: model.description,
                        start: model.start,
                        end: model.end,
                        isAllDay: model.isAllDay,
                        calendarId: model.calendarId,
                        isRepeat: model.isRepeat
                    };

                if (model.isRepeat) {
                    data.repeatType = model.repeatType;

                    if (model.repeatType == 2) {
                        data.repeatDays = model.repeatDays;
                    }

                    if (model.repeatEnd) {
                        data.repeatEnd = model.repeatEnd;
                    }
                }

                return this.fetch({
                    type: "POST",
                    url: this._urls.save,
                    data: JSON.stringify(data)
                });
            },

            fetchById: function () {
                var def = $.Deferred(),
                    me = this;

                this.fetch({
                    type: "GET",
                    url: this._urls.getById + '/' + this.get('_id')
                }).done(function () {
                    def.resolve(me);
                });

                return def.promise();
            }
        },
        {
            getById: function (_id) {
                return (new this({
                    _id: _id
                })).fetchById();
            }
        });
});