    import axios from 'axios';

    const apiurl = 'http://localhost:5000/users';

    
    export async function getAllUsers(params) {
    return await axios.get(`${apiurl}/getAllUsers`);
    }


    export async function login(params) {
    return await axios.post(`${apiurl}/login`, params); 
    }

    
export async function addUserClient(data) {
  return await axios.post(`http://localhost:5000/users/addUserClient`, data);
}

export async function addUserAdmin(data) {
  return await axios.post(`${apiurl}/addUserAdmin`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}


    
    export async function deleteUserById(id) {
    return await axios.delete(`${apiurl}/deleteUserById/${id}`); 
    }

   export async function updateuserById(params,id) {
    return await axios.put(`${apiurl}/updateuserById/${id}`,params); 
    }

  export async function addUserClientWithImg(params) {
    return await axios.put(`${apiurl}/addUserClientWithImg`,params); 
    }

    


  export async function logout(params) {
    return await axios.post(`${apiurl}/logout`, params); 
    }