import { Currency } from "./currency";

export type Country = {
  name: string;
  population?: string;
  currencies?: Array<Currency>;
  alreadyAdded?: boolean;
};
