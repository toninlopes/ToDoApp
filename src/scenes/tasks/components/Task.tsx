import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {TouchableHighlight} from 'react-native-gesture-handler';

const Task = (props: {
  title: string;
  isCompleted: boolean | false;
  animate: boolean | false;
  onAnimated: () => void;
  onDone: () => void;
  onDelete: () => void;
}) => {
  const [buttonHeight, setButtonHeight] = useState(0.0);
  const titleStyle = props.isCompleted
    ? StyleSheet.flatten({
        ...styles.title,
        ...styles.titleCompleted,
      })
    : StyleSheet.flatten(styles.title);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -100) {
          _startAnimation(-75).start();
          return;
        }
        if (gestureState.dx > 100) {
          _startAnimation(75).start();
          return;
        }
        _resetAnimation().start();
      },
    }),
  ).current;

  const _startAnimation = (x: number) =>
    Animated.spring(pan, {toValue: {x, y: 0}, useNativeDriver: false});

  const _resetAnimation = () =>
    Animated.spring(pan, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    });

  const _onDelete = () => {
    if (props.onDelete) {
      props.onDelete();
    }
    _resetAnimation().start();
  };

  const _onDone = () => {
    if (props.onDone) {
      props.onDone();
    }
    _resetAnimation().start();
  };

  useEffect(() => {
    if (props.animate) {
      const interval = setInterval(() => {
        Animated.sequence([
          _startAnimation(-75),
          _startAnimation(75),
          _resetAnimation(),
        ]).start(() => {
          if (props.onAnimated) {
            props.onAnimated();
          }
        });
        clearInterval(interval);
      }, 500);
    }
  }, []);

  const _touchable = (props: any): JSX.Element => {
    if (Platform.OS === 'android') {
      return (
        <TouchableHighlight style={styles.actionView} {...props}>
          {props.children}
        </TouchableHighlight>
      );
    }
    //Don't know why but TouchableOpacity does not work on Android when used
    //with PanResponder, Transformation, etc.
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  };

  return (
    <Animated.View
      style={[
        styles.viewItem,
        {
          transform: [{translateX: pan.x}],
        },
      ]}
      onLayout={(event) => {
        const height = event.nativeEvent.layout.height;
        setButtonHeight(height);
      }}
      {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.actionView,
          styles.actionDeleteView,
          {height: buttonHeight},
          {
            left: -150,
            transform: [{translateX: pan.x}],
          },
        ]}>
        <_touchable underlayColor="#f88379" onPress={_onDelete}>
          <Text>{'Delete'}</Text>
        </_touchable>
      </Animated.View>
      <Text style={titleStyle}>{props.title}</Text>

      <Animated.View
        style={[
          styles.actionView,
          styles.actionDoneView,
          {height: buttonHeight},
          {
            right: -150,
            transform: [{translateX: pan.x}],
          },
        ]}>
        <_touchable underlayColor="#98ff98" onPress={_onDone}>
          <Text>{'Done'}</Text>
        </_touchable>
      </Animated.View>
    </Animated.View>
  );
};

export default Task;

Task.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  animate: PropTypes.bool,
  onAnimated: PropTypes.func,
  onDone: PropTypes.func,
  onDelete: PropTypes.func,
};

const styles = StyleSheet.create({
  viewItem: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 20,
    margin: 18,
    color: 'black',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actionView: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
  },
  actionDoneView: {
    position: 'absolute',
    right: -75,
    backgroundColor: '#98ff98',
    borderLeftWidth: 0.5,
  },
  actionDeleteView: {
    position: 'absolute',
    left: -75,
    backgroundColor: '#f88379',
    borderRightWidth: 0.5,
  },
});
