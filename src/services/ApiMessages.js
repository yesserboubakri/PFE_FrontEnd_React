import axios from 'axios';

const apiUrl = 'http://localhost:5000/messages'; 







export async function sendMessage(data) {
  try {
    const res = await axios.post(apiUrl, data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getMessages(carId, userId1, userId2) {
  try {
    const res = await axios.get(`${apiUrl}/${carId}/${userId1}/${userId2}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getAllUserMessages(userId) {
  try {
    const res = await axios.get(`${apiUrl}/user/${userId}/messages`);
    return res.data.messages;
  } catch (err) {
    throw err;
  }
}
