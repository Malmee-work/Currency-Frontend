import { stripIndents } from "common-tags"
import handler from "../utils/graphql-client"
import { Country } from "./country"

type SuccessResponse = [boolean, Array<Country>]
type ErrorResponse = [boolean, any]

const getCountries = async (
  name: string
): Promise<ErrorResponse | SuccessResponse> => {
  const query = stripIndents`query getCountries($name: String) {
    countries(name: $name) {
      name
    }
  }`

  return handler(
    query,
    { name },
    "Error occurred when fetching the countries list",
    (r) => r.data.countries
  )
}

export default getCountries
