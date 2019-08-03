import React from 'react';
import PropTypes from 'prop-types';

function Rectangle({
  x, y, width, height, strokeStyle,
}) {
  return (
    <context strokeStyle={strokeStyle}>
      <strokeRect x={x} y={y} width={width} height={height} />
    </context>
  );
}

Rectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  strokeStyle: PropTypes.string,
};

Rectangle.defaultProps = {
  strokeStyle: null,
};

export default Rectangle;
