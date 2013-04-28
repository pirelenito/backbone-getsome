describe("Backbone GetSome", function() {
  var MyModel = Backbone.Model.extend({
    getsome: {
      fullName: {
        on: ['firstName', 'lastName'],
        value: function (firstName, lastName) {
          return firstName + ' ' + lastName;
        }
      }
    }
  })

  it("should update a getSome attribute on a depending attribute change", function() {
    var model = new MyModel();
    model.set('firstName', 'Paulo');
    model.set('lastName', 'Ragonha');

    expect(model.get('fullName')).toEqual('Paulo Ragonha');
  });
});