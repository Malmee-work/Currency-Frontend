import { stripIndents } from "common-tags"
import handler from "../utils/graphql-client"
import { Country } from "./country"

type SuccessResponse = [boolean, Country]
type ErrorResponse = [boolean, any]

const getCountry = async (
  name: string
): Promise<ErrorResponse | SuccessResponse> => {
  const query = stripIndents`query getCountries($name: String) {
    countries(name: $name) {
      name
      population
      currencies {
        code
        name
        rate
      }
    }
  }`

  return handler(
    query,
    { name },
    "Error occurred when fetching the countries list",
    (r) => r.data.countries[0]
  )
}

export default getCountry
