export type Colors = {
    primary: string;
    primaryBright: string;
    primaryDark: string;
    secondary: string;
    tertiary: string;
    success: string;
    failure: string;
    warning: string;
    contrast: string;
    invertedContrast: string;
    input: string;
    inputSecondary: string;
    background: string;
    backgroundDisabled: string;
    text: string;
    textDisabled: string;
    textSubtle: string;
    borderColor: string;
    card: string;
    gradients: Gradients;

    // Brand colors
    binance: string;
};

export type Gradients = {
    bubblegum: string;
};

export type MediaQueries = {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    nav: string;
};

export type Spacing = number[];

export type Breakpoints = string[];
