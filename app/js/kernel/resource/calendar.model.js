define([
    'clientCore/resource/base.model'
], function (BaseModel) {
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
            create: '/api/calendar/calendar/create'
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
        }
    });
});