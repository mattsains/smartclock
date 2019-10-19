import Reconciler from 'react-reconciler';
import RenderTree from './tree-renderer';

export default class CanvasRenderer {
  constructor(canvas, platform) {
    this.renderingChildren = [];
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    this.platform = platform;
    this.renderTree = new RenderTree(this.canvas, this.canvasContext, this.platform);

    const hostConfig = {
      now: Date.now,
      getRootHostContext() {
        const rootContext = {};
        return rootContext;
      },
      getChildHostContext(fiberType) {
        const context = { type: fiberType };
        return context;
      },
      shouldSetTextContent() {
        return false; // this makes sure that every element becomes an Element instance and not a prop (I think)
      },
      createTextInstance() { },
      createInstance(
        type,
        props,
      ) {
        return CanvasRenderer.createElement(type, props);
      },
      appendInitialChild: (parent, child) => { parent.appendChild(child); },
      finalizeInitialChildren: () => { },
      prepareForCommit() { },
      prepareUpdate(oldProps, newProps) {
        // I know this function needs to exist, but I'm not sure its purpose.
        // I know it's supposed to return the value of props that have changed.
        const propKeys = new Set(
          Object.keys(newProps).concat(
            Object.keys(oldProps),
          ),
        ).values();
        const payload = [];
        propKeys.forEach((key) => {
          if (
            key !== 'children' // text children shouldn't exist, but I am removing them here just in case.
            && oldProps[key] !== newProps[key]
          ) {
            payload.push({ [key]: newProps[key] });
          }
        });
        return payload;
      },
      resetAfterCommit: (instance) => {
        // Reset seems like the best place to render, it seems to be called whenever the DOM has changed.
        this.renderTree.render(instance);
        platform.saveCanvas(this.canvas);
      },
      commitMount: () => { },
      commitUpdate: (element, updatePayload, type, oldProps, newProps) => { element.setPropsTo(newProps); },
      insertInContainerBefore: (container, child, beforeChild) => {
        container.addChildBefore(child, beforeChild);
      },
      appendChildToContainer: (parent, child) => { parent.appendChild(child); },
      removeChildFromContainer: (parent, child) => { parent.removeChild(child); },
      supportsMutation: true,
    };

    this.reconcilerInstance = Reconciler(hostConfig);
  }

  static createElement(type, props) {
    return {
      type,
      props,
      children: [],

      appendChild(child) {
        this.children.push(child);
      },

      setPropsTo(newProps) {
        this.props = newProps;
      },

      removeChild(childToRemove) {
        this.children = this.children.filter(child => child !== childToRemove);
      },

      addChildBefore(child, beforeChild) {
        const index = this.children.indexOf(beforeChild);
        this.children.splice(index, 0, child);
      },
    };
  }

  render(element) {
    const isAsync = false; // Disables async rendering

    const rootElement = CanvasRenderer.createElement('root', {});

    const container = this.reconcilerInstance.createContainer(rootElement, isAsync); // Creates root fiber node.

    const parentComponent = null; // Since there is no parent (since this is the root fiber). We set parentComponent to null.
    this.reconcilerInstance.updateContainer(
      element,
      container,
      parentComponent,
    ); // Start reconcilation and render the result
  }
}
