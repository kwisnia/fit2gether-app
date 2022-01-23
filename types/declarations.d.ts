declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    interface customFill {
        fillPrimary: string;
        fillAccent: string;
    }

    interface svgProps extends SvgProps, customFill {}
    const content: React.FC<svgProps>;
    export default content;
}

declare module "*.png" {
    const value: import("react-native").ImageSourcePropType;
    export default value;
}
