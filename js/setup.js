'use strict';

var WIZARDS_NUMBER = 4;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

document.querySelector('.overlay.setup').classList.remove('hidden');

var similarElementsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomWizard = function (names, surnames, coatcolors, eyescolors) {
  return {
    name: getRandomElement(names) + ' ' + getRandomElement(surnames),
    coatColor: getRandomElement(coatcolors),
    eyesColor: getRandomElement(eyescolors)
  };
};

var wizards = [];

for (var i = 0; i < WIZARDS_NUMBER; i++) {
  wizards.push(getRandomWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATCOLORS, WIZARD_EYESCOLORS));
}

var fragment = document.createDocumentFragment();

for (var j = 0; j < 4; j++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[j].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[j].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[j].eyesColor;
  fragment.appendChild(wizardElement);
}

similarElementsList.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
