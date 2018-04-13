const pollList = document.querySelector('.polls');

//get all the polls
const getPolls = () => {
  axios.get('/api')
    .then((data) => {
      parsePolls(data.data)
    })
    .catch(err => console.log(err));
}

//parse poll data
const parsePolls = (polls) => {
  polls.forEach(poll => postPoll(poll));
}

//post single poll to page
const postPoll = (poll) => {
  console.log(poll)
  const listItem = document.createElement('li');
  
  //data-id to api calls
  listItem.setAttribute('data-id', poll._id);
  let singlePoll = poll.question;
  listItem.innerHTML = singlePoll;

  pollList.appendChild(listItem);
}


//fire our polls function on page load
window.addEventListener('load', getPolls )