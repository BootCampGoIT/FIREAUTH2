import axios from 'axios';
const API_KEY = "AIzaSyC4-zgLXY3nFwKeDNRmp92VoFNljfDf9yw";


// ============================ user =============================
export const signUpUser = (user) => {
  axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, { ...user, returnSecureToken: true })
    .then(response => {
      localStorage.setItem("user", JSON.stringify({ email: response.data.email, token: response.data.idToken }));
    })
}
export const signInUser = (user) => {
  axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, { ...user, returnSecureToken: true })
    .then(response => {
      localStorage.setItem("user", JSON.stringify({ email: response.data.email, token: response.data.idToken }));
    })
}

// ========================= posts =============================
export const postData = (post) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return axios.post(`https://shop-32391.firebaseio.com/post.json?auth=${token}`, post)
}
export const getData = () => {
  return axios.get(`https://shop-32391.firebaseio.com/post.json`)
}

export const deleteData = (id) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return axios.delete(`https://shop-32391.firebaseio.com/post/${id}.json?auth=${token}`)
}

export const patchData = (post) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return axios.patch(`https://shop-32391.firebaseio.com/post.json?auth=${token}`, post)
}


