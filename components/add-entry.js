import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';

import { Ionicons } from '@expo/vector-icons';

import UdaciSlider from './udaci-slider';
import UdaciSteppers from './udaci-steppers';
import DateHeader from './date-header';

import { submitEntry, removeEntry } from '../utils/api';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>
        Submit
      </Text>
    </TouchableOpacity>
  );
}

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState((state) => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    });
  }
  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);
    this.setState((state) => {
      const count = state[metric] - step;
      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    });
  }
  slide = (metric, slide) => {
    this.setState(() => ({
      [metric]: value,
    }))
  }
  onSubmit = () => {
    const key = timeToString();
    const entry = this.state;

    // Update Redux

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));
    // Navigate to Home
    submitEntry({ key, entry });
    // Clearn local notification
  }
  onReset = () => {
    const key = timeToString();
    removeEntry(key);
  }
  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons
            name="ios-happy-outline"
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.onReset}>
            Reset
          </TextButton>
        </View>
      );
    }
    return (
      <View>
        <DateHeader date={(new Date()).toLocaleString()} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key]
          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciSteppers
                    value={value}
                    onIncrement={() => this.increment()}
                    onDecrement={() => this.decrement()}
                    {...rest}
                  />
              }
            </View>
          );
        })}
        <SubmitBtn onPress={this.onSubmit} />
      </View>
    );
  }
}