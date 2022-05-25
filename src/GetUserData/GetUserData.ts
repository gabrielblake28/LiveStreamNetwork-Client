import axios, { AxiosRequestConfig } from "axios";

const Client_ID = "cyg0w4xnvmd6qc81l3q6i31zsppy40";
const Client_Secret = "246hkyxoq3i0oxb4eqez5l0fg3kfib";

export const getUserData = async (accessToken: string) => {
  const userOptions: AxiosRequestConfig = {
    url: "https://api.twitch.tv/helix/users",
    method: "GET",
    headers: {
      "Client-ID": Client_ID,
      Authorization: "Bearer " + accessToken,
    },
  };
  return await axios(userOptions);
};
