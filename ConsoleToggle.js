var ConsoleToggle = React.createClass({

  /**
  * Get initial state of attributes.
  *
  * @return {attributeValue}
  *
  * @return {attributeName}
  */
  getInitialState: function() {
    var attributeValueInitial = typeof this.props.attributeValue == 'undefined' ? false : this.props.attributeValue;

    return {
      attributeValue: attributeValueInitial,
      attributeName: this.props.attributeName,
    };
  },

  /**
  * State gets upon click.
  *
  * @param {event} event - Event upon click.
  */
  onClick: function(event) {
    var attributeValue = !this.state.attributeValue;
    this.setState({attributeValue: attributeValue});
    this.props.onAttributeChange(this.state.attributeName, attributeValue);
  },

  /**
  * @return {createElement} Return divs for buttons.
  */
  render: function() {
    return (
      React.createElement('div', {className: 'row row-spaced'},
        React.createElement('div', {className: 'col-md-5'},
          React.createElement('label', {className: 'label-input-sm'}, this.state.attributeName)
        ),
        React.createElement('div', {className: 'col-md-5'},
          React.createElement('div', {className: 'input-group margin-auto'},
            React.createElement('button', {
              className: 'btn btn-sm ' + (this.state.attributeValue ? 'btn-primary' : 'btn-default'),
              onClick: this.onClick
            },
              this.state.attributeValue ? 'on' : 'off'
            )
          )
        )
      )
    );
  }
});
