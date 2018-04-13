
const vote = (e) => {
  console.log(e)
}

const voteNodes = document.querySelectorAll('.votes');
Array.from(voteNodes).forEach(node => node.addEventListener('click', vote ))