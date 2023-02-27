import React from "react";
import { LightTheme, DarkTheme } from '../services/Common/theme'

export const ThemeContext = React.createContext({
    theme: DarkTheme,//"light",
    setTheme: () => {},
  });
