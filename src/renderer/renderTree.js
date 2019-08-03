function strokeRect(item, context) {
  context.strokeRect(item.props.x, item.props.y, item.props.width, item.props.height);
}

function pushContext(item, context) {
  context.save();
  Object.assign(context, item.props);
}

function popContext(item, context) {
  context.restore();
}

function fillText(item, context) {
  context.fillText(item.props.text, item.props.x, item.props.y, item.props.maxWidth);
}

const writeToScreen = (item, context) => {
  switch (item.type) {
    case 'strokeRect': strokeRect(item, context); break;
    case 'context': pushContext(item, context); break;
    case 'fillText': fillText(item, context); break;
    default: throw Error(`Don't know how to render element '${item.type}'`);
  }

  item.children.forEach(child => writeToScreen(child, context));

  // For elements that have children, usually we execute something before rendering the children, and then something after.
  switch (item.type) {
    case 'context': popContext(item, context); break;
    default: // nothing.
  }
};

export default function (tree, context) {
  // debugging:
  console.log('Rendering:', tree);

  context.clearRect(0, 0, 480, 320);
  writeToScreen(tree, context);
}
