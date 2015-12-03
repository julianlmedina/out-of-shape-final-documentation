/**
* Allows for delegation in console.
* @constructor
*/
ConsoleDelegate = function()
{
  /** @property {3Dobject} consoleContainer - The container for console. */
  this.consoleContainer;

  /** @property {3Dobject} mode - mode for console. */
  this.mode;

  /** @property {3Dobject} engine - Console Delegate's engine. */
  this.engine

  /** @property {3Dobject} target - Console target */
  this.target;

  /** @property {3Dobject} rotationX - The rotation for X. */
  this.rotationX;

  /** @property {3Dobject} rotationY - The rotation for Y. */
  this.rotationY;

  /** @property {3Dobject} rotationZ - The rotation for Z. */
  this.rotationZ;

  /** @property {3Dobject} positionX - The position for X. */
  this.positionX;

  /** @property {3Dobject} positionY - The position for Y. */
  this.positionY;

  /** @property {3Dobject} positionZ - The position for Z. */
  this.positionZ;

  /** @property {3Dobject} boundingBoxVertexCollection - The bounding box. */
  this.boundingBoxVertexCollection;
}

/** ConsoleDelegate mode inactive */
ConsoleDelegate.modeInactive = 0;

/** ConsoleDelegate mode active */
ConsoleDelegate.modeActive = 1;

/**
* Initialize values within ConsoleDelegate to 0.
*
* @return {ConsoleDelegate}
*/
ConsoleDelegate.prototype.initEmpty = function()
{
  /** set consoleContainer to null. */
  this.consoleContainer = null;
  /** set mode to inactive. */
  this.mode = ConsoleDelegate.modeInactive;
  /** set engine to null. */
  this.engine = null;
  /** set target to null. */
  this.target = null;
  /** set rotationX to null. */
  this.rotationX = 0;
  /** set rotationY to null. */
  this.rotationY = 0;
  /** set rotationZ to null. */
  this.rotationZ = 0;
  /** set positionX to null. */
  this.positionX = 0;
  /** set positionY to null. */
  this.positionY = 0;
  /** set positionZ to null. */
  this.positionZ = 0;
  /** set boundingBoxVertexCollection to null. */
  this.boundingBoxVertexCollection = null;

  return this;
};

/**
* Initializes container ID and engine.
*
* @param {ContainerIDObject} containerId - The ID of the container.
*
* @param {engineObject} engine - The engine
*
* @return {consoleDelegate} initWithContainerIdAndEngine - Return the container ID and engine.
*/
ConsoleDelegate.prototype.initWithContainerIdAndEngine = function(containerId, engine)
{
  this.initEmpty();

  this.consoleContainer = document.querySelector('#' + containerId);
  this.engine = engine;

  return this;
};

/**
* Creates with container ID and engine.
*
* @param {ContainerIDObject} containerId - The ID of the container.
*
* @param {engineObject} engine - The engine
*
* @return {consoleDelegate} createWithContainerIdAndEngine - Return the container ID and engine in console.
*/
ConsoleDelegate.createWithContainerIdAndEngine = function(containerId, engine)
{
  return window.consoleDelegate = new ConsoleDelegate().initWithContainerIdAndEngine(containerId, engine);
};

/**
* Sets console mode.
*
* @param {3Dobject} mode - Set mode.
*/
ConsoleDelegate.prototype.setMode = function(mode)
{
  this.mode = mode;
};

/**
* Activate ConsoleDelegate
*/
ConsoleDelegate.prototype.activate = function()
{
  this.setMode(ConsoleDelegate.modeActive);
  if (!this.consoleContainer.querySelector('container-fluid')) {
    this.render();
  }
};

/**
* Deactivate ConsoleDelegate
*/
ConsoleDelegate.prototype.deactivate = function()
{
  this.setMode(ConsoleDelegate.modeInactive);
  this.unrender();
};

/**
* Sets debug target.
*
* @param {3Dobject} target - Set target.
*/
ConsoleDelegate.prototype.setDebugTarget = function(target)
{
  if (this.mode == ConsoleDelegate.modeActive || true) {
    var object3D = target instanceof THREE.Object3D ? target : target.getObject3D();
    /** X rotation. */
    this.rotationX = object3D.rotation.x;
    /** Y rotation. */
    this.rotationY = object3D.rotation.y;
    /** Z rotation. */
    this.rotationZ = object3D.rotation.z;
    /** X position. */
    this.positionX = object3D.position.x;
    /** Y position. */
    this.positionY = object3D.position.y;
    /** Z position. */
    this.positionZ = object3D.position.z;

    this.target = object3D;
  }
};

/**
* Debug function for ConsoleDelegate.
*/
ConsoleDelegate.prototype.debug = function()
{
  if (this.mode == ConsoleDelegate.modeActive && this.target) {
    /** Rotation along X. */
    this.target.rotation.x = this.rotationX;
    /** Rotation along Y. */
    this.target.rotation.y = this.rotationY;
    /** Rotation along Z. */
    this.target.rotation.z = this.rotationZ;
    /** Position along X. */
    this.target.position.x = this.positionX;
    /** Rotation along Y. */
    this.target.position.y = this.positionY;
    /** Rotation along Z. */
    this.target.position.z = this.positionZ;
  }
};

/**
* Allows for the toggling of the vertex.
*/
ConsoleDelegate.prototype.toggleTargetsVertexCollection = function()
{
  if (this.boundingBoxVertexCollection) {
    this.boundingBoxVertexCollection.eraseFromTargetObject3D();
    this.boundingBoxVertexCollection = null;
  } else {
    this.boundingBoxVertexCollection = new VertexCollection().initWithObject3DBox(this.target);
    this.boundingBoxVertexCollection.drawOntoObject3D(this.engine.getScene());
  }
};

/**
* Vertex DOM Projection
*/
ConsoleDelegate.prototype.toggleTargetsVertexCollectionDOMProjection = function()
{
  if (!this.boundingBoxVertexCollection) {
    this.boundingBoxVertexCollection = new VertexCollection().initWithObject3DBox(this.target);
  }
  this.boundingBoxVertexCollection.drawOntoDOMElementWithIdUsingCamera('canvas-container', this.engine.getCamera());
};

/**
* Bounding Box DOM Projection
*/
ConsoleDelegate.prototype.toggleTargetsBoundingBoxDOMProjection = function()
{
  if (!this.boundingBoxVertexCollection) {
    this.boundingBoxVertexCollection = new VertexCollection().initWithObject3DBox(this.target);
  }
  this.boundingBoxVertexCollection.drawOntoDOMElementWithIdBoundingBoxUsingCamera('canvas-container', this.engine.camera);
};

/**
* Renders ConsoleDelegate instance.
*/
ConsoleDelegate.prototype.render = function()
{
  ReactDOM.render(React.createElement(Console), this.consoleContainer);
};

/**
* Unrenders ConsoleDelegate instance.
*/
ConsoleDelegate.prototype.unrender = function()
{
  this.consoleContainer.removeChild(this.consoleContainer.querySelector('.container-fluid'));
};
