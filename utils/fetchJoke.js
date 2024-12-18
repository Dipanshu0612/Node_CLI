import axios from 'axios';
import { configDotenv } from 'dotenv';
configDotenv();

const fetchJoke = async () => {
    try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/jokes",
          {
            headers: {
              "X-Api-Key": `${process.env.API_KEY}`,
            },
          }
        );

        if (!response) {
          console.error("No response received from API.");
        } else {
            const data = response.data;
            // console.log(response)
            return data[0].joke;
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        return "Error on the Server Side!";
      }
};

// fetchJoke();
export { fetchJoke };