# Backbone GetSome #

Simple BackboneJS plugin to create dynamic custom Model attributes.

Example:

```javascript
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

var model = new MyModel();
model.set('firstName', 'Paulo');
model.set('lastName', 'Ragonha');

model.get('fullName') // Paulo Ragonha
```

Uses regular Model attributes, so events still works. By changing a depending attribute, it changes the dynamic attribute, firing the event:

```javascript
var model = new MyModel();

model.on('change:fullName', function () {
  console.log(model.get('fullName'));
});

model.set('firstName', 'Pedro');
```

This is a Work in Progress. **Not ready for production**.