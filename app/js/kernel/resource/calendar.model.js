define([
    'clientCore/resource/base.model'
], function (BaseModel) {
    return BaseModel.extend({
        idAttribute: '_id',

        headers: {"Content-Type": 'application/json'},

        initialize: function (options) {
            BaseModel.prototype.initialize.apply(this, arguments);
        },

        defaults: {
            name: '',
            description: ''
        }
    });
});