import Reconciler from "react-reconciler";
import renderTree from './renderTree';

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
        renderTree(instance, canvasContext);
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