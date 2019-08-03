import React from 'react';
import PropTypes from 'prop-types';

function Text({
  text, x, y, maxWidth, font, style, textAlign, textBaseline,
}) {
  const contextProps = {
    text, font, fillStyle: style, textAlign, textBaseline,
  };

  return (
    <context {...contextProps}>
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
  textAlign: PropTypes.string,
  textBaseline: PropTypes.string,
};

Text.defaultProps = {
  maxWidth: undefined,
  style: undefined,
  textAlign: undefined,
  textBaseline: undefined,
};

export default Text;
