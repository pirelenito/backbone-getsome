# Backbone GetSome #

Simple BackboneJS plugin to create dynamic custom Model attributes.

Example:

```javascript
var Investment = Backbone.Model.extend({
  getsome: {
    cost: {
      on: ['shares','sharePrice'],
      update: function (share, sharePrice) {
        return share * sharePrice;
      }
    }
  }
});

var investment = new Investment();
investment.set('shares', 100);
investment.set('sharePrice', 15);
investment.get('cost'); // 155
```

Uses regular Model attributes, so events still works. By changing a depending attribute, it changes the dynamic attribute, firing the event:

```javascript
var investment = new Investment();

investment.on('change:cost', function () {
  console.log(investment.get('cost'));
});

investment.set('shares', 100);
```

This is a Work in Progress. **Not ready for production**.