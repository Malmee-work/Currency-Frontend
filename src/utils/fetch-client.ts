import configuration from "../config"
import { getToken } from "../modules/login/useToken"

async function client(endpoint: any, body?: any): Promise<any> {

  const token = getToken()
  const headers: any = {}
  let requestBody: any = body
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  if (body) {
    requestBody = JSON.stringify(body)
    headers["content-type"] = "application/json"
  }

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    headers,
  }

  if (requestBody) {
    config.body = requestBody
  }

  const response = await fetch(`${configuration.apiurl}${endpoint}`, config)
  if (response.status === 401) {
    localStorage.clear()
    window.location.reload()
    alert("Token expired please login again");
    return;
  } 
  try {
    return await response.json()
  } catch (err) {
    return response
  }
}

export default client
