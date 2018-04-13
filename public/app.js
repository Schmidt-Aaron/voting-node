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
  const link = document.createElement('a');
  link.setAttribute('href', `/poll/${poll._id}`)

  const listItem = document.createElement('li');
  
  //data-id to api calls
  listItem.setAttribute('data-id', poll._id);
  let singlePoll = `${poll.question} <span class="delete">X</span>`;
  listItem.innerHTML = singlePoll;

  link.appendChild(listItem);
  pollList.appendChild(link);
}

const deletePoll = (e) => {
  let poll = e.target;
  let id = poll.parentElement.getAttribute('data-id');
  if(poll.className === 'delete') {

    axios.delete(`/api/${id}`)
      .then(res => {
        console.log(res.data);
        poll.parentElement.parentElement.removeChild(poll.parentElement);
      })
      .catch(err => console.log(err))
  }

}


pollList.addEventListener('click', deletePoll)

//fire our polls function on page load
window.addEventListener('load', getPolls )