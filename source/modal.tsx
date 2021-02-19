import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

type PropsType = {
  visible: boolean;
  onDismiss: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const Modal = ({ visible, onDismiss, style, children }: PropsType) => {
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [rendered, setRendered] = useState(visible);
  const showModal = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };
  const hideModal = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) {
        return;
      }
      if (visible && onDismiss) {
        onDismiss();
      }
      if (visible) {
        showModal();
      } else {
        setRendered(false);
      }
    });
  };

  useEffect(() => {
    visible ? showModal() : hideModal();
  }, [visible]);

  if (!rendered) {
    return null;
  }
  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityViewIsModal
      accessibilityLiveRegion="polite"
      style={StyleSheet.absoluteFill}
      onAccessibilityEscape={hideModal}>
      <TouchableWithoutFeedback accessibilityRole="button" onPress={hideModal}>
        <Animated.View style={[{ flex: 1, opacity }]} />
      </TouchableWithoutFeedback>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { justifyContent: 'center' },
          style,
        ]}
        pointerEvents="box-none">
        {children}
      </View>
    </Animated.View>
  );
};

export default Modal;
