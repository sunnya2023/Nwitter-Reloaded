// import original module declarations
import "styled-components";
import { withTheme } from "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bg: string;
    textLighter: string;
    textDarker: string;
    textGray: string;
  }
}
