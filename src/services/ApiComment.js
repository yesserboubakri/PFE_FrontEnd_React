 import axios  from "axios";
 const apiurl ='http://localhost:5000/Comments'
export async function createComment(params) {
    return await axios.post(`${apiurl}/createComment`)
    
}
export async function getAllComments(params) {
    return await axios.get(`${apiurl}/getAllComments`)
    
}
export async function updateComment(params) {
    return await axios.put(`${apiurl}/updateComment`, params);



}
    export async function deleteComment(params) {
    return await axios.delete(`${apiurl}/deleteComment`, params);
}

export async function getCommentById(params) {
    return await axios.get(`${apiurl}/getCommentById`)
    
}
