import axios from "axios";
import { getDashboardApiUrl } from "../utils";

export default async function getRestaurantRequest(restaurantId) {
  const uri = `${getDashboardApiUrl()}/restaurant/${restaurantId}`;

  return axios
    .get(uri, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response?.data);
}
