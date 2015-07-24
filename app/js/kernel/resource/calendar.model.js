define([
    'config/app',
    'clientCore/resource/base.model'
], function (config, BaseModel) {
    return BaseModel.extend({
        idAttribute: '_id',

        initialize: function (options) {
            BaseModel.prototype.initialize.apply(this, arguments);
        },

        defaults: {
            name: '',
            description: ''
        },

        _urls: {
            create: config.proxy.origin + '/api/calendar/calendar/create',
            remove: config.proxy.origin + '/api/calendar/calendar/delete'
        },

        validation: {
            name: {
                required: true
            }
        },

        create: function () {
            return this.fetch({
                type: "POST",
                url: this._urls.create,
                data: JSON.stringify({
                    name: this.get('name'),
                    description: this.get('description')
                })
            });
        },

        remove: function () {
            return this.fetch({
                url: this._urls.remove,
                type: 'POST',
                data: JSON.stringify({
                    _id: this.get('_id')
                })
            });
        }
    });
});