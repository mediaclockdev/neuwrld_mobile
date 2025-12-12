import { LayoutAnimation } from 'react-native';

export const animateItemAppear = () => {
  LayoutAnimation.configureNext({
    duration: 400,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.9,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.9,
    },
    delete: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  });
};

export const animateItemPress = () => {
  LayoutAnimation.configureNext({
    duration: 200,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  });
};

export const animateScreenEnter = () => {
  LayoutAnimation.configureNext({
    duration: 350,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
    },
  });
};