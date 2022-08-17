import axios from "axios";

export async function get(url) {
    const { data } = await axios.get(url);

    setTimeout(null, 3000);

    return data;
}