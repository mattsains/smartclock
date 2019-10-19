import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

import Platform from './renderer/platform';

import Image from './components/primatives/image';
import Text from './components/primatives/text';

const apiKey = require('../apikey.json');

export default class UI extends React.Component {
  render() {
    return [
      (<Text font={"20px dja"} x={0} y={0} textBaseline="top" style="white" text={"Hello"} />),
    ];
  }
}
