import React, { useState } from "react"
import { FormControl, InputGroup, Table } from "react-bootstrap"
import { Country } from "../../data/country"
import CountryCurrencyItem from "./country-currency-item"

interface Props {
  countries: Array<Country>
}
// Country Currency page renders the selected list of countries
const CountryCurrency: React.FunctionComponent<Props> = ({ countries }) => {
  const [amount, setAmount] = useState<string>("")

  const onAmountChange = async (event: any): Promise<void> => {
    if (
      /^\d*(\.\d*)?$/.test(event.target.value.trim()) &&
      event.target.value.length < 30
    ) {
      setAmount(event.target.value)
    }
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Convert to SEK</InputGroup.Text>
        <FormControl
          placeholder="Enter the amount to be converted to SEK"
          type="text"
          value={amount}
          onChange={onAmountChange}
        />
      </InputGroup>
      <Table variant="dark">
        <thead>
          <tr className="selected-item">
            <th className="selected-double">Name</th>
            <th className="selecetd-single">Population</th>
            <th className="selected-single">Currency</th>
            <th className="selected-single">Converted</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <CountryCurrencyItem key={`selected${country.name}`} country={country} amount={amount} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default CountryCurrency
