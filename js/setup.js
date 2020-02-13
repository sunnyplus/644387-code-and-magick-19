'use strict';

var WIZARDS_NUMBER = 4;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// var userNameInput = document.querySelector('input[name=username]');
var setup = document.querySelector('.overlay.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var openPopup = function () { // функция открытия модального окна
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () { // функция закрытия модального окна
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target.tagName !== 'INPUT') {
    closePopup();
  }
};

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

var renderWizars = function () {
  var wizards = [];
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    wizards.push(getRandomWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATCOLORS, WIZARD_EYESCOLORS));
  }

  for (var j = 0; j < 4; j++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[j].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[j].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[j].eyesColor;
    fragment.appendChild(wizardElement);
  }

  similarElementsList.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden'); // показ блока похожих магов
};

renderWizars();

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function () {
  closePopup();
});
