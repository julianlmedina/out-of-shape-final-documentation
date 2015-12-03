var ConsoleUnits = {
  numeric: {symbol: '', type: 'integer'},
  degree: {symbol: 'deg', type: 'integer'},
  coordinate: {symbol: 'units', type: 'float'},
  pixel: {symbol: 'px', type: 'integer'}
};
var ConsoleAttribute = React.createClass({
  /**
  * Get Initial State of values.
  *
  * @return {attributeType}
  * @return {attributeValue}
  * @return {attributeValueInitial}
  * @return {attributeRange}
  * @return {attributeWrapsAround}
  * @return {attributeName}
  * @return {attributeUnit}
  * @return {smallIncrement}
  * @return {largeIncrement}
  */
  getInitialState: function() {
    var attributeValueInitial = typeof this.props.attributeValue == 'undefined' ? null : this.props.attributeValue;
    var attributeUnit = typeof this.props.attributeUnit == 'undefined' ? 'numeric' : this.props.attributeUnit;
    var unboundedRange = {from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY};

    return {
      attributeType: ConsoleUnits[attributeUnit].type,
      attributeValue: attributeValueInitial,
      attributeValueInitial: attributeValueInitial,
      attributeRange: this.props.attributeRange ? this.props.attributeRange : unboundedRange,
      attributeWrapsAround: typeof this.props.attributeWrapsAround == 'undefined' ? false : this.props.attributeWrapsAround,
      attributeName: this.props.attributeName,
      attributeUnit: attributeUnit,
      smallIncrement: typeof this.props.smallIncrement == 'undefined' ? 1 : this.props.smallIncrement,
      largeIncrement: typeof this.props.largeIncrement == 'undefined' ? 10 : this.props.largeIncrement
    };
  },

  /**
  * Get the increment size.
  *
  * @param {event} getIncrementSize - Increment size.
  */
  getIncrementSize: function(event) {
    switch (event.keyCode) {
      case 38:
      case 87:
        return event.shiftKey ? this.state.largeIncrement : this.state.smallIncrement;
      case 40:
      case 83:
        return event.shiftKey ? -this.state.largeIncrement : -this.state.smallIncrement;
      default:
        return 0;
    }
  },

  /**
  * Change attributes on action.
  *
  * @param {event} onAttributeChange - When the attribute changes.
  */
  onAttributeChange: function(event) {
    var attributeValue;
    switch (this.state.attributeType) {
      case 'integer': attributeValue = parseInt(event.target.value); break;
      case 'float': attributeValue = parseFloat(event.target.value); break;
      default: attributeValue = event.target.value;
    }
    if (attributeValue == attributeValue) { // If is not NaN
      if
      (
        attributeValue >= this.state.attributeRange.from &&
        attributeValue <= this.state.attributeRange.to
      )
      {
        this.setState({attributeValue: attributeValue});
        this.props.onAttributeChange(this.state.attributeName, attributeValue);
      }
    } else {
      this.setState({attributeValue: null});
    }
  },
  /**
  * Change attributes when key is down.
  *
  * @param {event} onAttributeKeyDown - Event when key is down.
  */
  onAttributeKeyDown: function(event) {
    var incrementSize = this.getIncrementSize(event);
    var attributeValue = this.state.attributeValue + incrementSize;
    if (this.state.attributeWrapsAround) {
      if (attributeValue < this.state.attributeRange.from) {
        attributeValue = this.state.attributeRange.to + incrementSize;
      } else if (attributeValue > this.state.attributeRange.to) {
        attributeValue = this.state.attributeRange.from + incrementSize;
      }
    }
    if
    (
      attributeValue >= this.state.attributeRange.from &&
      attributeValue <= this.state.attributeRange.to
    )
    {
      this.setState({attributeValue: attributeValue});
      this.props.onAttributeChange(this.state.attributeName, attributeValue);
    }
  },
  /**
  * Undo actions on click.
  *
  * @param {event} onUndoClick - When click is undone.
  */
  onUndoClick: function(event) {
    this.setState({attributeValue: this.state.attributeValueInitial});
    this.props.onAttributeChange(this.state.attributeName, this.state.attributeValueInitial);
  },

  /**
  * Function for rendering.
  * @return {createElement}
  */
  render: function() {
    var attributeUnitElement = null;
    if (this.state.attributeUnit != null) {
      attributeUnitElement = (
        React.createElement('div', {className: 'input-group-addon'}, ConsoleUnits[this.state.attributeUnit].symbol)
      );
    }

    var undoButtonElement = null;
    if (this.state.attributeValue != this.state.attributeValueInitial) {
      undoButtonElement = (
        React.createElement('div', {className: 'col-md-2'},
          React.createElement('button', {
            className: 'btn btn-sm btn-danger',
            onClick: this.onUndoClick
          },
            React.createElement('span', {className: 'glyphicon glyphicon-trash'})
          )
        )
      );
    }

    return (
      React.createElement('div', {className: 'row row-spaced'},
        React.createElement('div', {className: 'col-md-5'},
          React.createElement('label', {className: 'label-input-sm'}, this.state.attributeName)
        ),
        React.createElement('div', {className: 'col-md-5'},
          React.createElement('div', {className: 'input-group'},
            React.createElement('input', {
              className: 'form-control input-sm text-right',
              value: this.state.attributeValue.toFixed(3),
              onChange: this.onAttributeChange,
              onKeyDown: this.onAttributeKeyDown
            }),
            attributeUnitElement
          )
        ),
        undoButtonElement
      )
    );
  }
});

/**
* Makes console attribute.
*
* @param {string} name - Name of attribute.
* @param {int} value - Value of attribute.
* @param {int} rangeFrom - Start of range.
* @param {int} rangeTo - The end of range.
* @param {int} wrapsAround - The wrap around.
* @param {event} unit - The unit.
* @param {int} smallIncrement - Smaller increment
* @param {int} largeIncrement - Larger increment
* @param {onAttributeChange} callback - Callback from onAttributeChange.
* @return {createElement}
*/
function makeConsoleAttribute(name, value, rangeFrom, rangeTo, wrapsAround, unit, smallIncrement, largeIncrement, callback)
{
  return React.createElement(ConsoleAttribute, {
    attributeName: name,
    attributeValue: value,
    attributeRange: {from: rangeFrom, to: rangeTo},
    attributeWrapsAround: wrapsAround,
    attributeUnit: unit,
    smallIncrement: smallIncrement,
    largeIncrement: largeIncrement,
    onAttributeChange: callback
  });
}

/**
* Makes console angle attribute.
*
* @param {string} name - Name of attribute.
* @param {int} value - Value of attribute.
* @param {int} rangeFrom - Start of range.
* @param {int} rangeTo - The end of range.
* @param {onAttributeChange} callback - Callback from onAttributeChange.
* @return {makeConsoleAngleAttribute}
*/
function makeConsoleAngleAttribute(name, value, rangeFrom, rangeTo, callback)
{
  return makeConsoleAttribute(name, value, rangeFrom, rangeTo, true, 'degree', 1, 10, callback);
}

/**
* Makes console position attribute.
*
* @param {string} name - Name of attribute.
* @param {int} value - Value of attribute.
* @param {int} rangeFrom - Start of range.
* @param {int} rangeTo - The end of range.
* @param {onAttributeChange} callback - Callback from onAttributeChange.
* @return {makeConsoleAngleAttribute}
*/
function makeConsolePositionAttribute(name, value, rangeFrom, rangeTo, callback)
{
  return makeConsoleAttribute(name, value, rangeFrom, rangeTo, false, 'coordinate', 1, 10, callback);
}
