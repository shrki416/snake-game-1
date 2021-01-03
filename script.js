let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');

//snake
canvasContext.beginPath();
canvasContext.rect(100, 100, 50, 10);
canvasContext.fillStyle = 'red';
canvasContext.fill();
canvasContext.closePath();

//apple
canvasContext.beginPath();
canvasContext.arc(240, 160, 10, 0, Math.PI * 2, false);
canvasContext.fillStyle = 'green';
canvasContext.fill();
canvasContext.closePath();
