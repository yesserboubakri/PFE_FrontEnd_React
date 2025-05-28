import axios from 'axios';

const apiUrl = 'http://localhost:5000/car';


export async function getAllCars() {
  try {
    const res = await axios.get(`${apiUrl}/getAllCars`);
    return res;
  } catch (err) {
    throw err;
  }
}


export async function AddCar(data) {
  try {
    const res = await axios.post(`${apiUrl}/AddCar`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
}


export async function getCarById(id) {
  try {
    const res = await axios.get(`${apiUrl}/getCarById/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
}


export async function affectCarToUser(userId, carId) {
  try {
    const res = await axios.put(`${apiUrl}/affect`, { userId, carId });
    return res;
  } catch (err) {
    throw err;
  }
}


export async function deleteCarById(id) {
  return await axios.delete(`${apiUrl}/deleteCarById/${id}`);
}


export async function updateCar(id, data) {
  return await axios.put(`${apiUrl}/UpdateCar/${id}`, data);
}

