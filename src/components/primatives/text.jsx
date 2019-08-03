import React from 'react';
import PropTypes from 'prop-types';

function Text({
  text, x, y, maxWidth, font, style,
}) {
  return (
    <context font={font} fillStyle={style}>
      <fillText text={text} x={x} y={y} maxWidth={maxWidth} />
    </context>
  );
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  maxWidth: PropTypes.number,
  font: PropTypes.string.isRequired,
  style: PropTypes.string,
};

Text.defaultProps = {
  maxWidth: undefined,
  style: undefined,
};

export default Text;
