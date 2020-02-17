'use strict';

var WIZARDS_NUMBER = 4;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// функция перемешивания массива
var shuffleArray = function (array) {
  var j;
  var x;
  var i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

var wizardCoat = document.querySelector('.wizard-coat'); // пальто
var coatColor = document.querySelector('input[name=coat-color]'); // переключатель цвета пальто
var eyesColor = document.querySelector('input[name=eyes-color]'); // переключатель цвета глаз
var fireBall = document.querySelector('.setup-fireball-wrap'); // файербол
var wizardEyes = document.querySelector('.wizard-eyes'); // глаза

var changeCoatColor = function () {
  var color = shuffleArray(WIZARD_COATCOLORS)[0];
  coatColor.value = color;
  wizardCoat.style.fill = color;
};
var changeFireballColor = function () {
  var color = shuffleArray(FIREBALL_COLORS)[0];
  fireBall.style.background = color;
  document.querySelector('input[name=fireball-color]').value = color;
};

var changeEyesColor = function () {
  var color = shuffleArray(WIZARD_EYESCOLORS)[0];
  wizardEyes.style.fill = color;
  eyesColor.value = color;
};

// функция изменения цвета пальто волшебника
var onCoatClick = function () {
  changeCoatColor();
};

var onCoatPress = function (evt) {
  if (evt.key === 'Enter') {
    changeCoatColor();
  }
};

// функция изменения цвета глаз волшебника
var onEyesClick = function () {
  changeEyesColor();
};

var onEyesPress = function (evt) {
  if (evt.key === 'Enter') {
    changeEyesColor();
  }
};

// функция изменения цвета файербола волшебника
var onFireballClick = function () {
  changeFireballColor();
};

var onFireballPress = function (evt) {
  if (evt.key === 'Enter') {
    changeFireballColor();
  }
};

// обработчик клика по пальто
wizardCoat.addEventListener('click', onCoatClick);
// обработчик нажатия на пальто
wizardCoat.addEventListener('keydown', onCoatPress);
// обработчик клика по глазам
wizardEyes.addEventListener('click', onEyesClick);
// обработчик нажатия на глаза
wizardEyes.addEventListener('keydown', onEyesPress);
// обработчик клика по файерболу
fireBall.addEventListener('click', onFireballClick);
// обработчик нажатия на файербол
fireBall.addEventListener('keydown', onFireballPress);

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

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});
