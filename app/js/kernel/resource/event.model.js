define([
    'clientCore/resource/base.model'
], function (BaseModel) {
    return BaseModel.extend({
        idAttribute: '_id',

        headers: {"Content-Type": 'application/json'},

        validation: {
            name: {
                required: true
            }
        },

        initialize: function (options) {
            BaseModel.prototype.initialize.apply(this, arguments);
        }
    });
});