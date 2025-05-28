import axios from "axios";

const apiurl = 'http://localhost:5000/dashboard';

export async function getUserCountByDay() {
  try {
    const res = await axios.get(`${apiurl}/getUserCountByDay`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getCarCountPerUser() {
  try {
    const res = await axios.get(`${apiurl}/getCarCountPerUser`);
    return res.data; 
  } catch (err) {
    throw err;
  }
}

export async function getCarCountByDay() {
  try {
    const res = await axios.get(`${apiurl}/getCarCountByDay`);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des voitures par jour:", error);
    throw error;
  }
}
