
var Select = require('react-select');


var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log("Selected: " + val);
}


module.exports = AutocompleteInput;
