const vote = e => {
  const parent = e.target.parentElement.innerHTML;

  console.log(parent);
};

const voteNodes = document.querySelectorAll('.votes');
Array.from(voteNodes).forEach(node => node.addEventListener('click', vote));
