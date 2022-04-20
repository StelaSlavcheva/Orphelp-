import * as api from './api.js';

const endpoints = {
    catalog: '/data/posts?sortBy=_createdOn%20desc',
    create: '/data/posts',
    details: '/data/posts/',
    edit: '/data/posts/',
    delete: '/data/posts/',
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Application specific requests

export async function getAllData() {
        return api.get(endpoints.catalog);
}
export async function create(data) {
    return api.post(endpoints.create, data);
}
export async function getById(id) {
    return api.get(endpoints.details + id);
}
export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}
export async function delETE(id) {
    return api.del(endpoints.delete + id);
}
export async function getMyData() {
    const userId = sessionStorage.getItem('userId');
    return api.get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
// export async function makeaDonation(postId){
//     return api.post('/data/donations', {postId})
// }

// export async function totalDonationCountForPost(postId){
//     return api.get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`)
// }
// export async function donationForAPostFromUser(postId, userId){
//     return api.get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
// }