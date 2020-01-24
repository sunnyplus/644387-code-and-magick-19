'use strict';

var renderCurve = function (ctx, x1, y1, x2, y2) {
  ctx.quadraticCurveTo(x2, y2, x1, y1);
};

var renderCloud = function (ctx, fillColor) {
  ctx.beginPath();
  ctx.fillStyle = fillColor;
  ctx.moveTo(100, 50);
  renderCurve(ctx, 200, 30, 150, 10);
  renderCurve(ctx, 400, 30, 300, 0);
  renderCurve(ctx, 600, 50, 500, 10);
  renderCurve(ctx, 600, 250, 800, 160);
  renderCurve(ctx, 400, 270, 500, 300);
  renderCurve(ctx, 200, 270, 300, 300);
  renderCurve(ctx, 100, 220, 120, 270);
  renderCurve(ctx, 100, 50, 0, 100);
  ctx.fill();
  ctx.closePath();
};

window.renderStatistics = function (ctx) {

  renderCloud(ctx, 'rgba(0, 0, 0, 0.3)');

  ctx.translate(-10, -10);
  renderCloud(ctx, '#fff');
};
