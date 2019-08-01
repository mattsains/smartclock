const writeToScreen = (item, context) => {
    switch (item.type) {
        case 'strokeRect': strokeRect(item, context);
        case 'context': pushContext(item, context);
    }

    // for some reason, sometimes the children property is not an array.
    if (item.props.children instanceof Array)
        item.props.children.forEach(item => writeToScreen(item, context));
    else if (item.props.children != undefined)
        writeToScreen(item.props.children, context);

    switch(item.type) {
        case 'context': popContext(item, context);
    }
}

const strokeRect = (item, context) => {
    context.strokeRect(item.props.x, item.props.y, item.props.width, item.props.height);
}

const pushContext = (item, context) => {
    context.save();
    if (item.props.strokeStyle) context.strokeStyle = item.props.strokeStyle;
}

const popContext = (item, context) => {
    context.restore();
}

export default function(tree, context) { 
    // debugging:
    console.log("Rendering:", tree);

    context.clearRect(0, 0, 480, 320);
    writeToScreen(tree, context) 
};
