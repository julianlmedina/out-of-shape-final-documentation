var Console = React.createClass({
  /**
  * Get the initial state of rotation and position.
  * @return {rotationX}
  * @return {rotationY}
  * @return {rotationZ}
  * @return {positionX}
  * @return {positionY}
  * @return {positionZ}
  */
  getInitialState: function() {
    return {
      /** X rotation */
      rotationX: window.consoleDelegate.rotationX / Math.PI * 180,
      /** Y rotation */
      rotationY: window.consoleDelegate.rotationY / Math.PI * 180,
      /** Z rotation */
      rotationZ: window.consoleDelegate.rotationZ / Math.PI * 180,
      /** X position */
      positionX: window.consoleDelegate.positionX,
      /** Y position */
      positionY: window.consoleDelegate.positionY,
      /** Z position */
      positionZ: window.consoleDelegate.positionZ,
    };
  },
  /**
  * Helpers for increment.
  *
  * @param {event} event - Events for actions.
  * @param {purpose} purpose - Purpose of action.
  *
  */
  incrementFor: function(event, purpose) {
    if (purpose == 'rotation') {
      switch (event.keyCode) {
        case 38: // Up arrow
        case 87: // W
          return event.shiftKey ? 10 : 1
        case 40: // Down arrow
        case 83: // S
          return event.shiftKey ? -10 : -1;
      }
    }
    return 0;
  },

  /**
  * Action that occurs upon attribute change.
  *
  * @param {String} onAttributeChange - Actions that occur when attributes change.
  */
  onAttributeChange: function(attributeName, attributeValue) {
    switch (attributeName) {
      /** X Rotation */
      case 'Rotation X': window.consoleDelegate.rotationX = attributeValue * Math.PI / 180; break;
      /** Y Rotation */
      case 'Rotation Y': window.consoleDelegate.rotationY = attributeValue * Math.PI / 180; break;
      /** Z Rotation */
      case 'Rotation Z': window.consoleDelegate.rotationZ = attributeValue * Math.PI / 180; break;
      /** X Position */
      case 'Position X': window.consoleDelegate.positionX = attributeValue; break;
      /** Y Position */
      case 'Position Y': window.consoleDelegate.positionY = attributeValue; break;
      /** Z Position */
      case 'Position Z': window.consoleDelegate.positionZ = attributeValue; break;
      /** Bounding Box */
      case 'Vertex Collection': window.consoleDelegate.toggleTargetsVertexCollection(); break;
      case 'Vertex DOM': window.consoleDelegate.toggleTargetsVertexCollectionDOMProjection(); break;
      case 'Bounding Box DOM': window.consoleDelegate.toggleTargetsBoundingBoxDOMProjection(); break;
    }
  },
  /**
  * Rendering
  * @return {createElement} 
  *
  */
  render: function() {
    /** X Angle Rotation */
    var rotationXAngleElement = makeConsoleAngleAttribute('Rotation X', this.state.rotationX, 0, 360, this.onAttributeChange);
    /** Y Angle Rotation */
    var rotationYAngleElement = makeConsoleAngleAttribute('Rotation Y', this.state.rotationY, 0, 360, this.onAttributeChange);
    /** Z Angle Rotation */
    var rotationZAngleElement = makeConsoleAngleAttribute('Rotation Z', this.state.rotationZ, 0, 360, this.onAttributeChange);
    /** Position X Element */
    var positionXElement = makeConsolePositionAttribute('Position X', this.state.positionX, -5000, 3000, this.onAttributeChange);
    /** Position Y Element */
    var positionYElement = makeConsolePositionAttribute('Position Y', this.state.positionY, -5000, 3000, this.onAttributeChange);
    /** Position Z Element */
    var positionZElement = makeConsolePositionAttribute('Position Z', this.state.positionZ, -5000, 3000, this.onAttributeChange);
    return (
      React.createElement('div', {className: 'container-fluid'},
        React.createElement('h3', null, 'Rotation'),
        rotationXAngleElement,
        rotationYAngleElement,
        rotationZAngleElement,
        React.createElement('h3', null, 'Position'),
        positionXElement,
        positionYElement,
        positionZElement,
        React.createElement('h3', null, 'Bounding Box'),
        React.createElement(ConsoleToggle, {attributeName: 'Vertex Collection', onAttributeChange: this.onAttributeChange}),
        React.createElement(ConsoleToggle, {attributeName: 'Vertex DOM', onAttributeChange: this.onAttributeChange}),
        React.createElement(ConsoleToggle, {attributeName: 'Bounding Box DOM', onAttributeChange: this.onAttributeChange})
      )
    );
  }
});
