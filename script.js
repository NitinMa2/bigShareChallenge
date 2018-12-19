(function() {
  var Photo, addListeners, canvas, createGrid, ctx, gridItem, grids, height, img, imgInfo, imgSrc, imgs, init, magnet, mouse, populateCanvas, render, resizeCanvas, rotateAndPaintImage, updateMouse, useGrid, width;

  canvas = document.getElementById('canvas');

  ctx = canvas.getContext('2d');

  width = canvas.width = window.innerWidth;

  height = canvas.height = window.innerHeight;

  imgSrc = canvas.dataset.image;

  img = new Image();

  useGrid = true;

  imgInfo = {};

  imgs = [];

  grids = [];

  magnet = 2000;

  mouse = {
    x: 1,
    y: 0
  };

  init = function() {
    addListeners();
    img.onload = function(e) {
      var numberToShow;
      imgInfo.width = e.path ? e.path[0].width : e.target.width;
      imgInfo.height = e.path ? e.path[0].height : e.target.height;
      numberToShow = (Math.ceil(window.innerWidth / imgInfo.width)) * (Math.ceil(window.innerHeight / imgInfo.height));
      if (useGrid) {
        createGrid();
      }
      populateCanvas(numberToShow * 4);
      canvas.classList.add('ready');
      return render();
    };
    return img.src = imgSrc;
  };

  addListeners = function() {
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', updateMouse);
    return window.addEventListener('touchmove', updateMouse);
  };

  updateMouse = function(e) {
    mouse.x = e.clientX;
    return mouse.y = e.clientY;
  };

  resizeCanvas = function() {
    width = canvas.width = window.innerWidth;
    return height = canvas.height = window.innerHeight;
  };

  populateCanvas = function(nb) {
    var i, p, results;
    i = 0;
    results = [];
    while (i <= nb) {
      p = new Photo();
      imgs.push(p);
      results.push(i++);
    }
    return results;
  };

  createGrid = function() {
    var c, grid, i, imgScale, item, j, k, l, r, ref, ref1, ref2, results, x, y;
    imgScale = 0.5;
    grid = {
      row: Math.ceil(window.innerWidth / (imgInfo.width * imgScale)),
      cols: Math.ceil(window.innerHeight / (imgInfo.height * imgScale)),
      rowWidth: imgInfo.width * imgScale,
      colHeight: imgInfo.height * imgScale
    };
    for (r = j = 0, ref = grid.row; 0 <= ref ? j < ref : j > ref; r = 0 <= ref ? ++j : --j) {
      x = r * grid.rowWidth;
      for (c = k = 0, ref1 = grid.cols; 0 <= ref1 ? k < ref1 : k > ref1; c = 0 <= ref1 ? ++k : --k) {
        y = c * grid.colHeight;
        item = new gridItem(x, y, grid.rowWidth, grid.colHeight);
        grids.push(item);
      }
    }
    results = [];
    for (i = l = 0, ref2 = grids.length; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
      results.push(grids[i].draw());
    }
    return results;
  };

  gridItem = function(x, y, w, h) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    this.draw = function() {
      ctx.drawImage(img, x, y, w, h);
    };
  };

  Photo = function() {
    var TO_RADIANS, finalX, finalY, forceX, forceY, h, r, seed, w, x, y;
    seed = Math.random() * (2.5 - 0.7) + 0.7;
    w = imgInfo.width / seed;
    h = imgInfo.height / seed;
    x = window.innerWidth * Math.random();
    finalX = x;
    y = window.innerHeight * Math.random();
    finalY = y;
    console.log("INIT Y :: " + finalY + " || INIT X :: " + finalX);
    r = Math.random() * (180 - (-180)) + (-180);
    forceX = 0;
    forceY = 0;
    TO_RADIANS = Math.PI / 180;
    this.update = function() {
      var distance, dx, dy, powerX, powerY, x0, x1, y0, y1;
      x0 = x;
      y0 = y;
      x1 = mouse.x;
      y1 = mouse.y;
      dx = x1 - x0;
      dy = y1 - y0;
      distance = Math.sqrt((dx * dx) + (dy * dy));
      powerX = x0 - (dx / distance) * magnet / distance;
      powerY = y0 - (dy / distance) * magnet / distance;
      forceX = (forceX + (finalX - x0) / 2) / 2.1;
      forceY = (forceY + (finalY - y0) / 2) / 2.2;
      x = powerX + forceX;
      y = powerY + forceY;
    };
    this.draw = function() {
      return rotateAndPaintImage(ctx, img, r * TO_RADIANS, x, y, w / 2, h / 2, w, h);
    };
  };

  rotateAndPaintImage = function(context, image, angle, positionX, positionY, axisX, axisY, widthX, widthY) {
    context.translate(positionX, positionY);
    context.rotate(angle);
    context.drawImage(image, -axisX, -axisY, widthX, widthY);
    context.rotate(-angle);
    return context.translate(-positionX, -positionY);
  };

  render = function() {
    var x, y;
    x = 0;
    y = 0;
    ctx.clearRect(0, 0, width, height);
    while (y < grids.length) {
      grids[y].draw();
      y++;
    }
    while (x < imgs.length) {
      imgs[x].update();
      imgs[x].draw();
      x++;
    }
    return requestAnimationFrame(render);
  };

  init();

}).call(this);

let h1 = document.querySelector("h1");
let yes = document.querySelector("#yes");
let no = document.querySelector("#no");
let tag = 0;

const questions = {
  0: "Are you hungry?",
  1: "Would you like a different font to be used?",
  2: "Grab a bite and then continue. Ready?",
  3: "Keep this font?",
  4: "Would you like to impress your friends, family or any stranger?",
  5: "I'll wait. Seriously, health first! Eaten yet?",
  6: "Is career important to you?",
  7: "Would you like to create something that anyone in the world can see?",
  8: "Does anything matter to you?",
  9: "Would you like to learn some top skills that will give you an extra edge in the industry?",
  10: "Would you like to build robots, VR or a website?",
  11: "Do you want to earn some cash in your free time?",
  12: "Do you happen to know anyone who might be interested?",
  13: "Find someone and continue. I'll wait..",
  14: "Would you like to get involved in a new community?",
  15: "Check the course..",
}

yes.addEventListener("click", function(){checkTag(tag, "yes")}); 
no.addEventListener("click", function(){checkTag(tag, "no")}); 

function checkTag(tag, ans){
  if(tag===0 && ans==="yes"){updateScreen(2)}
  else if(tag===0 && ans==="no"){updateScreen(1)}
  else if(tag===1 && ans==="yes"){changeFont(2)}
  else if(tag===1 && ans==="no"){updateScreen(4)}
  else if(tag===2 && ans==="yes"){updateScreen(1)}
  else if(tag===2 && ans==="no"){updateScreen(5)}
  else if(tag===3 && ans==="yes"){updateScreen(4);}
  else if(tag===3 && ans==="no"){changeFont(1)}
  else if(tag===4 && ans==="yes"){updateScreen(7)}
  else if(tag===4 && ans==="no"){updateScreen(6)}
  else if(tag===5 && ans==="yes"){updateScreen(1)}
  else if(tag===6 && ans==="yes"){updateScreen(9)}
  else if(tag===6 && ans==="no"){updateScreen(8)}
  else if(tag===7 && ans==="yes"){finalScreen()}
  else if(tag===7 && ans==="no"){updateScreen(10)}
  else if(tag===8 && ans==="yes"){updateScreen(11)}
  else if(tag===8 && ans==="no"){finalScreen()}
  else if(tag===9 && ans==="yes"){finalScreen()}
  else if(tag===9 && ans==="no"){updateScreen(11)}
  else if(tag===10 && ans==="yes"){finalScreen()}
  else if(tag===10 && ans==="no"){updateScreen(14)}
  else if(tag===11 && ans==="yes"){finalScreen()}
  else if(tag===11 && ans==="no"){updateScreen(12)}
  else if(tag===12 && ans==="yes"){finalScreen()}
  else if(tag===12 && ans==="no"){updateScreen(13)}
  else if(tag===13 && ans==="yes"){finalScreen()}
  else if(tag===14 && ans==="yes"){finalScreen()}
  else if(tag===14 && ans==="no"){updateScreen(6)}
}

function updateScreen(newTag){
  tag = newTag;
  h1.innerHTML = questions[newTag];
} 

function changeFont(a){
  if (a===2){
    h1.classList.remove("font1");
    h1.classList.add("font2");
    updateScreen(3);
  }
  else {
    h1.classList.add("font1");
    h1.classList.remove("font2");
    updateScreen(4);
  }
}

function finalScreen(){
  tag = 15;
  h1.innerHTML = "Great Answers! You are the ideal student for Andrei's <br>Zero to Mastery Web Development course <br>on Udemy where you can advance in <br>the hottest topics of the industry at any level! <br>You'll gain valuable knowledge. Trust me on this!";
  h1.classList.add("final");
  no.parentNode.removeChild(no);
  yes.innerHTML = "Take Me There";
  yes.addEventListener("click", function(){
    window.location='https://www.udemy.com/share/100HQLBUUYdFxXRnw=/';
  })
}