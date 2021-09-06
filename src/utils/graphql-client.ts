import client from "./fetch-client";

// GraphQL client to be used for Grapghql requests.
const handler = async (
  query: string,
  params: any,
  errorMsg: string,
  selectorFn = (result: any): any => result.data
): Promise<any> => {
  try {
    const result = await client("graphql", {
      query,
      variables: params || {},
    });

    if (result.errors && result.errors.length > 0) {
      return [true, result.errors[0].message];
    }

    if (selectorFn(result)) {
      return [false, selectorFn(result)];
    }

    return [true, errorMsg];
  } catch (error) {
    return [true, errorMsg];
  }
};

export default handler;
