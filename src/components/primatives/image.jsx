import React from 'react';
import PropTypes from 'prop-types';

import Platform from '../../renderer/platform';

export default class Image extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    platform: PropTypes.instanceOf(Platform).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    const { platform } = props;
    this.state = { loading: true };
    platform.getImage(props.src)
      .then((image) => {
        this.setState({ loading: false, image });
      });
  }

  render() {
    const { x, y } = this.props;
    const { loading, image } = this.state;
    if (loading) {
      return (null);
    }

    return (<image image={image} x={x} y={y} />);
  }
}
