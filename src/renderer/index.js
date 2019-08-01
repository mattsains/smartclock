import Reconciler from "react-reconciler";
import renderTree from './renderTree';
import toArray from 'react';

export default class CanvasRenderer {
  constructor(canvasContext, renderCallback) {
    this.renderingChildren = [];
    this.canvasContext = canvasContext;
    this.renderCallback = renderCallback;

    const hostConfig = {
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
        return false // this makes sure that every element becomes an Element instance and not a prop (I think)
      },
      createTextInstance: function (
        newText,
        rootContainerInstance,
        currentHostContext,
        workInProgress
      ) { },
      createInstance: function (
        type,
        props,
        rootContainerInstance,
        currentHostContext,
        workInProgress
      ) {
        return CanvasRenderer.createElement(type, props);
      },
      appendInitialChild: (parent, child) => { parent.appendChild(child) },
      finalizeInitialChildren: (
        instance,
        type,
        newProps,
        rootContainerInstance,
        currentHostContext
      ) => { },
      prepareForCommit: function (rootContainerInstance) { },
      prepareUpdate: function (instance, type, oldProps, newProps) {
        // I know this function needs to exist, but I'm not sure its purpose.
        // I know it's supposed to return the value of props that have changed.
        const propKeys = new Set(
          Object.keys(newProps).concat(
            Object.keys(oldProps)
          )
        ).values();
        const payload = [];
        for (let key of propKeys) {
          if (
            key !== 'children' && // text children shouldn't exist, but I am removing them here just in case.
            oldProps[key] !== newProps[key]
          ) {
            payload.push({ [key]: newProps[key] })
          }
        }
        return payload;
      },
      resetAfterCommit: (instance) => {
        // Reset seems like the best place to render, it seems to be called whenever the DOM has changed.
        instance.children.forEach(child => renderTree(child, canvasContext));
        renderCallback();
      },
      commitMount: (element, type, newProps, fiberNode) => {  },
      commitUpdate: (element, updatePayload, type, oldProps, newProps) => { element.setPropsTo(newProps); },
      appendChildToContainer: (parent, child) => { parent.appendChild(child) },
      removeChildFromContainer: (parent, child) => { parent.removeChild(child) },
      supportsMutation: true
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

      setPropsTo(props) {
        this.props = props;
      },

      removeChild(child) {
        this.children = this.children.filter(child => child != child);
      }
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
      parentComponent
    ); // Start reconcilation and render the result
  }
};