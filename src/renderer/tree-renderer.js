export default class TreeRenderer {
  constructor(canvas, context, platform) {
    this.canvas = canvas;
    this.context = context;
    this.platform = platform;
  }

  strokeRect(item) {
    this.context.strokeRect(item.props.x, item.props.y, item.props.width, item.props.height);
  }

  pushContext(item) {
    this.context.save();
    Object.assign(this.context, item.props);
  }

  popContext() {
    this.context.restore();
  }

  fillText(item) {
    if (item.props.maxWidth === undefined) {
      this.context.fillText(item.props.text, item.props.x, item.props.y);
    } else {
      this.context.fillText(item.props.text, item.props.x, item.props.y, item.props.maxWidth);
    }
  }

  image(item) {
    this.context.drawImage(item.props.image, item.props.x, item.props.y, item.props.width, item.props.height);
  }

  writeToScreen(item) {
    switch (item.type) {
      case 'strokeRect': this.strokeRect(item); break;
      case 'context': this.pushContext(item); break;
      case 'fillText': this.fillText(item); break;
      case 'image': this.image(item); break;
      case 'root': break;
      default: throw Error(`Don't know how to render element '${item.type}'`);
    }

    item.children.forEach(child => this.writeToScreen(child));

    // For elements that have children, usually we execute something before rendering the children, and then something after.
    switch (item.type) {
      case 'context': this.popContext(item); break;
      default: // nothing.
    }
  }

  render(tree) {
    // debugging:
    console.log('Rendering:', tree);

    this.context.clearRect(0, 0, 480, 320);
    if (tree instanceof Array) {
      tree.forEach(c => this.writeToScreen(c));
    }
    this.writeToScreen(tree);
    this.platform.saveCanvas(this.canvas);
  }
}
