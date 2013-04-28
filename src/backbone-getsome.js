(function (Backbone) {
  var oldConstructor = Backbone.Model.prototype.constructor;

  Backbone.Model = Backbone.Model.extend({
    constructor: function () {
      oldConstructor.apply(this, arguments);
      getSome.call(this);
    }
  });

  function getSome() {
    var model = this;

    _(model.getsome).chain().pairs().each(function (mutator) {
      var name = mutator[0];
      var attributes = mutator[1].on;
      var valueFunction = mutator[1].value;

      function update () {
        var values = getValues(model, attributes);
        var result = valueFunction.apply(model, values);

        model.set(name, result, { fromGetSome: true });
      }

      model.on('change:' + name, preventSet);
      model.on(getEventNames(attributes), update);
      update();
    });
  }

  function getEventNames (attributes) {
    return _(attributes).map(function (attribute) {
      return 'change:' + attribute;
    }).join(' ');
  }

  function getValues (model, attributes) {
    return _(attributes).map(function (attribute) {
      return model.get(attribute);
    });
  }

  function preventSet (_, _, options) {
    if (!options.fromGetSome) { throw "can't set a dynamic attribute"; }
  }

})(Backbone);