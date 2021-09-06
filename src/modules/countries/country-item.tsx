import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { Country } from "../../data/country";

interface Props {
  country: Country;
  selectDisabled: boolean;
  onSelect: (country: Country) => void;
}

const CountryItem: React.FunctionComponent<Props> = ({
  country,
  selectDisabled,
  onSelect,
}) => {
  return (
    <div className="country-item">
      <div>{country.name}</div>
      <div>
        {selectDisabled ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <Button onClick={(): void => onSelect(country)} variant="secondary">
            Select
          </Button>
        )}
      </div>
    </div>
  );
};

export default CountryItem;
