import { DarkTheme } from '@react-navigation/native';

export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  gray: '#B8B8BB',
  onBoardingColor: '#8C53E7',
  btnColor: '#1dbe1a',
  textColor: '#979797',
  lightGray: '#222223',
};

export const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'black',
    card: 'black',
  },
};
