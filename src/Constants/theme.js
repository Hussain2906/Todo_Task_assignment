import { Dimensions } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const { width, height } = Dimensions.get("window");

export const ThameFont = {
    PrimaryRegular: "OpenSans-Regular",//400
    PrimaryMeduim: "OpenSans-Medium",//500
    PrimarySemiBold: "OpenSans-SemiBold",//600
    PrimaryBold: "OpenSans-Bold",//700
    PrimaryExtraBold: "OpenSans-ExtraBold",//800
}

export const FSize = {

    height,
    width,
    
    font12: 12,
    font13: 13,
    font14: 14,
    font15: 15,
    font16: 16,
    font18: 18,
    font19: 19,
    font20: 20,
    font22: 22,
    font24: 24,
    font25: 25,
    font26: 26,
    font28: 28,
    font30: 30,
}

export const TColor = {

    Primary: 'rgba(227, 129, 23, 1)', //orange
    white: '#FFFFFF',
    black: '#060606',
    grayLight: "rgba(6, 6, 6, 0.3)",
    grayDark: "rgba(6, 6, 6, 0.6)",
    red: "rgba(226, 27, 34, 1)",
    green: "rgba(10, 137, 1, 1)",
}

const AppTheme = { FSize, TColor, ThameFont }

export default AppTheme;