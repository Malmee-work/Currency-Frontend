import React from "react";
import { Country } from "../../data/country";

interface Props {
  country: Country;
  amount: string;
}

const CountryCurrencyItem: React.FunctionComponent<Props> = ({
  country,
  amount,
}) => {
  return (
    <>
      {country.currencies?.map((currency) => (
        <tr key={country.name + currency.code} className="selected-item">
          <td className="selected-double">{country.name}</td>
          <td className="selected-single">{country.population}</td>
          <td className="selected-single">{currency.code}</td>
          <td className="selected-single">
            {amount ? (Number(amount) * Number(currency.rate)).toPrecision(9) : null}
          </td>
        </tr>
      ))}
    </>
  );
};

export default CountryCurrencyItem;
