import Reconciler from "react-reconciler";

export default class CanvasRenderer {
  constructor(canvasContext) {
    this.renderingChildren = [];
    this.canvasContext = canvasContext;

    const hostConfig = {
      // Most of this is annoying boilerplate, but finalizeInitialChildren is when React wants you to actually render things.
      now: Date.now,
      getRootHostContext: function (nextRootInstance) {
        let rootContext = {};
        return rootContext;
      },
      getChildHostContext: function (parentContext, fiberType, rootInstance) {
        let context = { type: fiberType };
        return context;
      },
      shouldSetTextContent: function (type, nextProps) {
        return false;
      },
      createTextInstance: function (
        newText,
        rootContainerInstance,
        currentHostContext,
        workInProgress
      ) { },
      createInstance: function (
        type,
        newProps,
        rootContainerInstance,
        currentHostContext,
        workInProgress
      ) {
        return {
          type: type,
          props: newProps
        };
      },
      appendInitialChild: (parent, child) => {},
      finalizeInitialChildren: (
        instance,
        type,
        newProps,
        rootContainerInstance,
        currentHostContext
      ) => {
        // TODO: refactor
        const writeToScreen = item => {
          this.canvasContext.clearRect(0, 0, 480, 320);
          switch (item.type) {
            case 'strokeRect': canvasContext.strokeRect(item.props.x, item.props.y, item.props.width, item.props.height);
            case 'context': {
              if (item.props.strokeStyle) canvasContext.strokeStyle = item.props.strokeStyle;
            };
          }
        
          // for some reason, sometimes the children property is not an array.
          if (item.props.children instanceof Array)
            item.props.children.forEach(writeToScreen);
          else if (item.props.children != undefined)
          writeToScreen(item.props.children);
        }

        writeToScreen(instance);

        return false;
      },
      prepareForCommit: function (rootContainerInstance) { },
      resetAfterCommit: function (rootContainerInstance) { },
      commitMount: (domElement, type, newProps, fiberNode) => { },
      appendChildToContainer: (parent, child) => { },
      supportsMutation: true
    };

    this.reconcilerInstance = Reconciler(hostConfig);
  }

  render(element, callback) {
    // element: This is the react element for App component
    // callback: if specified will be called after render is done.

    const isAsync = false; // Disables async rendering
    const container = this.reconcilerInstance.createContainer(null, isAsync); // Creates root fiber node.

    const parentComponent = null; // Since there is no parent (since this is the root fiber). We set parentComponent to null.
    this.reconcilerInstance.updateContainer(
      element,
      container,
      parentComponent,
      callback
    ); // Start reconcilation and render the result
  }
};