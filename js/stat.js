'use strict';

var BAR_START_X = 120;
var BAR_START_Y = 240;
var CLOUD_WIDTH = 500;
var numberOfPlayers = 4;
var BAR_GAP = 50;
var BAR_WIDTH = Math.floor(CLOUD_WIDTH / numberOfPlayers - BAR_GAP);
var currentHeight = 150;
var makeColor = function () {
  return Math.ceil(Math.random() * 100);
};
var renderCurve = function (ctx, x1, y1, x2, y2) {
  ctx.quadraticCurveTo(x2, y2, x1, y1);
};

var renderCloud = function (ctx, fillColor) {
  ctx.beginPath();
  ctx.fillStyle = fillColor;
  ctx.moveTo(100, 10);
  renderCurve(ctx, 200, 30, 150, 10);
  renderCurve(ctx, 400, 30, 300, 0);
  renderCurve(ctx, 600, 50, 500, 10);
  renderCurve(ctx, 600, 250, 800, 160);
  renderCurve(ctx, 400, 270, 420, 300);
  renderCurve(ctx, 200, 270, 300, 300);
  renderCurve(ctx, 100, 220, 120, 270);
  renderCurve(ctx, 100, 50, 0, 100);
  ctx.fill();
  ctx.closePath();
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)');
  ctx.font = '16 px PT Mono';
  ctx.translate(-10, -10);
  renderCloud(ctx, '#fff');
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', BAR_START_X + 60, BAR_START_Y - currentHeight - 45);
  ctx.fillText('Список результатов:', BAR_START_X + 60, BAR_START_Y - currentHeight - 30);

  var basicHeight = 0;
  for (var i = 0; i < times.length; i++) {
    if (basicHeight < times[i]) {
      basicHeight = times[i];
    }
  }

  for (var x = 0, g = 0; x < numberOfPlayers; x++, g = g + BAR_GAP + BAR_WIDTH) {
    if (players[x] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      // ctx.fillStyle = 'rgb(' + makeColor() + ',' + makeColor() + ',' + makeColor() + ')';
      ctx.fillStyle = 'hsl(210,' + makeColor() + '%, 50%)';
    }
    currentHeight = 150 * times[x] / basicHeight;
    ctx.fillText(players[x], BAR_START_X + g, BAR_START_Y - currentHeight - 10);
    ctx.fillRect(BAR_START_X + g, BAR_START_Y, BAR_WIDTH, -currentHeight);
  }
};
