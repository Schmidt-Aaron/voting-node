const pollList = document.querySelector('.polls');

// // post single poll to page
// const postPoll = poll => {
//   const link = document.createElement('a');
//   link.setAttribute('href', `/poll/${poll._id}`);

//   const listItem = document.createElement('li');

//   // data-id to api calls
//   listItem.setAttribute('data-id', poll._id);
//   const singlePoll = `${poll.question} <span class="delete">X</span>`;
//   listItem.innerHTML = singlePoll;

//   link.appendChild(listItem);
//   pollList.appendChild(link);
// };

// // parse poll data
// const parsePolls = polls => {
//   polls.forEach(poll => postPoll(poll));
// };

// // get all the polls
// const getPolls = () => {
//   axios
//     .get('/api')
//     .then(data => {
//       parsePolls(data.data);
//     })
//     .catch(err => console.log(err));
// };

const deletePoll = e => {
  // e.target.preventDefault();
  const poll = e.target;
  const id = poll.parentElement.getAttribute('data-id');

  /*
    FIX THIS LATER !!!
  */
 
  if (poll.className === "delete") {
    // fetch(`api/remove/${id}`, { method: 'PUT'} )
    .then(res => res.redirect('/'))
  }
  // if (poll.className === 'delete') {
  //   fetch(`/api/remove/${id}` )
  //     // .delete(`/api/${id}`)
  //     // .then(res => {
  //     //   console.log(res.data);
  //     //   poll.parentElement.parentElement.removeChild(poll.parentElement);
  //     // })
  //     .catch(err => console.log(err));
  // }
};

pollList.addEventListener('click', deletePoll);

