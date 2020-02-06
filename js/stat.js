'use strict';

var START_X = 0;
var START_Y = 0;
var BAR_START_X = 130;
var BAR_START_Y = 235;
var CLOUD_START_X = 100;
var CLOUD_START_Y = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var TEXT_GAP = 15;
var FIGURES_GAP = 10;
var SHADOW_X_GAP = 10;
var SHADOW_Y_GAP = 10;
var TITLE_X_GAP = 60;
var TITLE_Y_GAP = 35;
var RESULTS_Y_GAP = 15;
var MAX_HEIGHT = 150;

var CLOUD_COORDINATES = [
  {
    curveToX: 200,
    curveToY: 30,
    controlX: 150,
    controlY: 10
  },
  {
    curveToX: 400,
    curveToY: 30,
    controlX: 300,
    controlY: 0
  },
  {
    curveToX: 480,
    curveToY: 50,
    controlX: 430,
    controlY: 10
  },
  {
    curveToX: 480,
    curveToY: 250,
    controlX: 520,
    controlY: 160
  },
  {
    curveToX: 400,
    curveToY: 280,
    controlX: 420,
    controlY: 300
  },
  {
    curveToX: 200,
    curveToY: 280,
    controlX: 300,
    controlY: 300
  },
  {
    curveToX: 100,
    curveToY: 220,
    controlX: 120,
    controlY: 280
  },
  {
    curveToX: 100,
    curveToY: 50,
    controlX: 100,
    controlY: 100
  }
];

var makeColor = function () {
  return Math.ceil(Math.random() * 100);
};
var renderCurve = function (ctx, x1, y1, x2, y2) {
  ctx.quadraticCurveTo(x2, y2, x1, y1);
};

var renderCloud = function (ctx, fillColor, shiftX, shiftY) {
  ctx.beginPath();
  ctx.fillStyle = fillColor;
  ctx.moveTo(CLOUD_START_X + shiftX, CLOUD_START_Y + shiftY);

  CLOUD_COORDINATES.forEach(function (elm) {
    renderCurve(ctx, elm.curveToX + shiftX, elm.curveToY + shiftY, elm.controlX + shiftX, elm.controlY + shiftY);
  });

  ctx.fill();
  ctx.closePath();
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', SHADOW_X_GAP, SHADOW_Y_GAP);
  ctx.font = '16 px PT Mono';
  renderCloud(ctx, '#fff', START_X, START_Y);
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', BAR_START_X + TITLE_X_GAP, CLOUD_START_Y + TITLE_Y_GAP);
  ctx.fillText('Список результатов:', BAR_START_X + TITLE_X_GAP, CLOUD_START_Y + TITLE_Y_GAP + RESULTS_Y_GAP);

  var basicHeight = 0;
  for (var i = 0; i < times.length; i++) {
    if (basicHeight < times[i]) {
      basicHeight = times[i];
    }
  }

  for (var x = 0, g = 0; x < players.length; x++, g = g + BAR_GAP + BAR_WIDTH) {
    if (players[x] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(210,' + makeColor() + '%, 50%)';
    }
    var currentHeight = MAX_HEIGHT * times[x] / basicHeight;

    ctx.fillRect(BAR_START_X + g, BAR_START_Y, BAR_WIDTH, -currentHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(players[x], BAR_START_X + g, BAR_START_Y + TEXT_GAP);
    ctx.fillText(Math.floor(times[x]), BAR_START_X + g, BAR_START_Y - currentHeight - FIGURES_GAP);
  }
};


