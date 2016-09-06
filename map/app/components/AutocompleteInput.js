var React = require('react');
var Autocomplete = require('pui-react-autocomplete').Autocomplete;

var AutocompleteInput = React.createClass({

  onInitializeItems:function(callback) {
    callback(['foo', 'food', 'bar']);
  },
  onPick: function(item) {
    alert('You selected ' + item.value);
  },
  render: function() {
    return (
        <Autocomplete onInitializeItems={this.onInitializeItems} onPick={this.onPick}/>
    );
  }
});


module.exports = AutocompleteInput;
