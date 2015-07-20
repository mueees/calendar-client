define([
    'clientCore/resource/base.model'
], function (BaseModel) {
    var EventModel = BaseModel.extend({
        idAttribute: '_id',

        headers: {"Content-Type": 'application/json'},

        initialize: function (options) {
            BaseModel.prototype.initialize.apply(this, arguments);
        }
    });

    return EventModel;
});