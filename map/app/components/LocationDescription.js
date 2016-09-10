var React = require('react');

var LocationDescription = React.createClass({
  propTypes: {
    details: React.PropTypes.object
  },
  render: function () {

    var details = this.props.details;

    return (
      <div>
        <h1>Description</h1>
        <ul className='list-group'>
          <li className='list-group-item' key={details.name}>Country - <b>{details.name}</b></li>
          <li className='list-group-item' key={details.region}>Region - <b>{details.region}</b></li>
          <li className='list-group-item' key={details.subregion}>Subregion - <b>{details.subregion}</b></li>
          <li className='list-group-item' key={details.area}>Area - <b>{details.area} km2</b></li>
          <li className='list-group-item' key={details.population}><b>Population - {details.population}</b></li>
          <li className='list-group-item' key={details.callingCodes}>Calling Code - +<b>{details.callingCodes}..</b></li>
          <li className='list-group-item' key={details.capital}>Capital - <b>{details.capital}</b></li>
        </ul>
      </div>
    );
  }
});

module.exports = LocationDescription;



