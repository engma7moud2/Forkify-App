import { TIME_OUT } from "./config.js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};

export const GET_JSON = async function (url) {
    try {
        const response = await Promise.race([fetch(url),timeout(TIME_OUT)]);
        const data = await response.json();
        console.log(response, data);
        if (!response.ok) throw new Error(`${response.status} ${data.message}`);
        return data;
    } catch (err) {
        throw err;
    }
}

export const SEND_JSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
