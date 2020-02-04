'use strict';

var BAR_START_X = 130;
var BAR_START_Y = 235;
var CLOUD_START_X = 100;
var CLOUD_START_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
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
  renderCurve(ctx, 200 + shiftX / 2, 30 + shiftY / 2, 150 + shiftX, 10 + shiftY);
  renderCurve(ctx, 400 + shiftX / 2, 30 + shiftY / 2, 300 + shiftX, 0 + shiftY);
  renderCurve(ctx, 480 + shiftX / 2, 50 + shiftY / 2, 430 + shiftX, 10 + shiftY);
  renderCurve(ctx, 480 + shiftX / 2, 250 + shiftY / 2, CLOUD_START_X + CLOUD_WIDTH + shiftX, 160 + shiftY);
  renderCurve(ctx, 400 + shiftX / 2, CLOUD_HEIGHT + CLOUD_START_Y + shiftY / 2, 420 + shiftX, 300 + shiftY);
  renderCurve(ctx, 200 + shiftX / 2, CLOUD_HEIGHT + CLOUD_START_Y + shiftY / 2, 300 + shiftX, 300 + shiftY);
  renderCurve(ctx, 100 + shiftX / 2, 220 + shiftY / 2, 120 + shiftX, 280 + shiftY);
  renderCurve(ctx, 100 + shiftX / 2, 50 + shiftY / 2, 0, 100 + shiftX, 100 + shiftY);
  ctx.fill();
  ctx.closePath();
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', SHADOW_X_GAP, SHADOW_Y_GAP);
  ctx.font = '16 px PT Mono';
  renderCloud(ctx, '#fff', 0, 0);
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
