const additionalChoice = () => {
  let choiceNum = document.querySelectorAll('.choice').length + 1;
  let target = document.querySelector('.choices');
  //parent
  let choiceDiv = document.createElement('div');
  choiceDiv.classList.add('choice');
  
  let choiceLabel = document.createElement('label');
  choiceLabel.setAttribute('for', `choice${choiceNum}`)
  choiceLabel.innerHTML = `Choice #${choiceNum}`;
  choiceDiv.appendChild(choiceLabel);

  let choiceInput = document.createElement('input');
  choiceInput.setAttribute('type', 'text');
  choiceInput.setAttribute('name', `choices[]`);
  choiceInput.setAttribute('id', `option${choiceNum}`);
  choiceDiv.appendChild(choiceInput);

  target.appendChild(choiceDiv);

}

const addChoiceElement = document.querySelector('.addChoice');
addChoiceElement.addEventListener('click', additionalChoice);
