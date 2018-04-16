const additionalChoice = () => {
  const choiceNum = document.querySelectorAll('.choice').length + 1;
  const target = document.querySelector('.choices');
  // parent
  const choiceDiv = document.createElement('div');
  choiceDiv.classList.add('choice');

  const choiceLabel = document.createElement('label');
  choiceLabel.setAttribute('for', `choice${choiceNum}`);
  choiceLabel.innerHTML = `Choice #${choiceNum}`;
  choiceDiv.appendChild(choiceLabel);

  const choiceInput = document.createElement('input');
  choiceInput.setAttribute('type', 'text');
  choiceInput.setAttribute('name', `choices[]`);
  choiceInput.setAttribute('id', `option${choiceNum}`);
  choiceDiv.appendChild(choiceInput);

  target.appendChild(choiceDiv);
};

const addChoiceElement = document.querySelector('.addChoice');
addChoiceElement.addEventListener('click', additionalChoice);
