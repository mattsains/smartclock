import React from 'react';
import PropTypes from 'prop-types';

import fetch from 'cross-fetch';

import Platform from './renderer/platform';

import Image from './components/primatives/image';
import Text from './components/primatives/text';

const apiKey = require('../apikey.json');

export default class UI extends React.Component {
  static propTypes = {
    platform: PropTypes.instanceOf(Platform).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seattle&appId=${apiKey}`)
      .then(result => result.json())
      .then((result) => {
        console.log(result);
        const temp = Math.round(result.main.temp - 273.15);
        const imgSrc = this.getWeatherImageSrc(result);

        this.setState({ loading: false, imgSrc, temp });
      });
  }

  getWeatherImageSrc(weather) {
    const condition = weather.weather[0].main;

    let imgSrc = ({
      Clear: 'sun',
      Clouds: 'cloudy',
      Rain: 'rain',
    })[condition];

    if (condition === 'Rain') {
      if (weather.weather[0].description.includes('light rain')) {
        imgSrc = 'rain_light';
      } else if (weather.weather[0].description.includes('heavy rain')) {
        imgSrc = 'rain_heavy';
      }
    }

    return imgSrc;
  }

  render() {
    const { platform } = this.props;
    const { loading, imgSrc, temp } = this.state;
    const iconSize = 90;
    const iconY = (320 - iconSize) / 2;

    if (loading) return null;

    return [
      (<Image
        key="icon"
        src={`assets/${imgSrc}.png`}
        platform={platform}
        x={0}
        y={iconY}
        width={iconSize}
        height={iconSize}
      />),
      (<Text font={`${iconSize}px Serif`} x={iconSize} y={iconY} textBaseline="top" style="white" key="temp" text={`${temp}°C`} />),
    ];
  }
}
