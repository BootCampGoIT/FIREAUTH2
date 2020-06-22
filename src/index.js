import './styles.css';
import { signUpUser, signInUser, postData, getData, deleteData } from './firebaseServices/firebaseServices';

const refs = {
  authForm: document.forms.user,
  messageForm: document.forms.post,
  content: document.querySelector('.content'),
  // postList: document.querySelector('.postList'),
}

const data = {
  user: {
    email: '',
    password: ''
  },
  post: {
    title: '',
    message: ''
  },
  posts: []
}

const getInfo = (e) => {
  // console.log(e.currentTarget.name)
  // console.log(data[e.currentTarget.name])
  // if (e.currentTarget.name === 'authForm') {
  //   data.user[e.target.name] = e.target.value
  // }
  // if (e.currentTarget.name === 'messageForm') {
  //   data.user[e.target.name] = e.target.value
  // }
  data[e.currentTarget.name][e.target.name] = e.target.value;
}

const registerUser = (e) => {
  e.preventDefault();
  // console.log(e)
  // console.log(e.submitter.dataset.action)
  // if (e.submitter.dataset.action === "signup") {
  //   signUpUser(data.user)
  // }
  // if (e.submitter.dataset.action === "signin") {
  //   signInUser(data.user)
  // }
  switch (e.submitter.dataset.action) {
    case "signup":
      signUpUser(data.user)
      break;
    case "signin":
      signInUser(data.user)
      break;
    default:
      break;
  }
  e.currentTarget.reset();
}

const submitPost = (e) => {
  e.preventDefault();
  postData(data.post)
    .then(response => {
      data.posts = [...data.posts, ...transformData(response)];
      return response
    })
    .then(response => {
      document.querySelector('.postListContainer')
        .insertAdjacentHTML('beforeend', createMarkup([{ id: response.data.name, ...data.post }]))
    });
  e.currentTarget.reset();
}

const createMarkup = (array) => {
  return array.reduce((acc, post) => {
    console.log(post.id)
    acc += `
  <li>
  <h2>${post.title}</h2>
  <p>${post.message}</p>
  <button type="button" data-button="deletebutton" data-id="${post.id}">Delet</button>
  </li>
  `
    return acc
  }, '')
}

const transformData = (response) => {
  let tempData = [];
  console.log(response.data)
  for (const key in response.data) {
    tempData.push({ id: key, ...response.data[key] })
  }
  console.log('tempData', tempData)
  return tempData
}

getData().then(response => {
  data.posts = [...data.posts, ...transformData(response)]
  console.log('data.posts', data.posts)
  return data.posts
})
  .then((data) => {
    document.querySelector('.postListContainer').innerHTML = createMarkup(data);
  });

const deletePost = (e) => {
  if (e.target.dataset.button = "deletebutton") {

    deleteData(e.target.dataset.id).then(response => {
      data.posts = data.posts.filter(post => post.id !== e.target.dataset.id);
      console.log(data.posts)
      document.querySelector('.postListContainer').innerHTML = createMarkup(data.posts);
    });
  }
}
document.querySelector('.postListContainer').addEventListener('click', deletePost)
refs.authForm.addEventListener('input', getInfo);
refs.authForm.addEventListener('submit', registerUser);
refs.messageForm.addEventListener('input', getInfo);
refs.messageForm.addEventListener('submit', submitPost);
