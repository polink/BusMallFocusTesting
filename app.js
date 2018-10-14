'use strict';

/* 

BusMall Focus Testing!

Pseudocode/Goal:
Make a Constructor that presents a series of three images on the focus testing site.
Each image cannot repeat after another. There will be counters for each time an image is voted on, each time an image appears but is not selected, and the number of times a user has voted.

After 25 votes, the results will be displayed.

STRETCH -For randomly picking a starting image:
use document.getElementbyId('left/mid/right').setAttribute('src',srcArray[x])

*/

// global variables
var imageSection = document.getElementById('clickme');
var busImageLeft = document.getElementById('left');
var busImageMid = document.getElementById('mid');
var busImageRight = document.getElementById('right');

// variables for images currently used
var busIndexLeft = 0;
var busIndexMid = 5;
var busIndexRight = 10;

var allBusImages = [];
var clickCounter = 0;

//chart variable
var ctx = document.getElementById("myChart").getContext('2d');
console.log(ctx);

// Constructor for Bus Mall Images
var BusMallImage = function(src, name){
  this.likes = 0;
  this.src = src;
  this.name = name;
  this.instanced = 0;

  allBusImages.push(this);
};

// Prototypes
BusMallImage.prototype.renderImage = function (){
  busImageLeft.src = this.src;
};

/*
Current issues:
- do... whiles not registering similar index/random numbers
- event handler does not stop after 25 clicks - fixed! not referencing right event handler variable.

*/

// Event listeners and handlers
var imgClickHandler = function (eventObject) {
  if(event.target.id === 'left' || event.target.id === 'mid' || event.target.id === 'right') {

    do { //left image detector
      var ranLeft = Math.floor(Math.random() * allBusImages.length);
    } while(ranLeft === busIndexLeft ||
       ranLeft === busIndexMid ||
        ranLeft === busIndexRight);
    
    do {
      var ranMid = Math.floor(Math.random() * allBusImages.length);
    } while(ranMid === busIndexLeft ||
       ranMid === busIndexMid ||
        ranMid === ranLeft ||
         ranMid === busIndexRight);
    
    do {
      var ranRight = Math.floor(Math.random() * allBusImages.length);
    } while(ranRight === busIndexRight ||
       ranRight === busIndexLeft ||
        ranRight === ranMid ||
         ranRight === ranLeft ||
          ranRight === busIndexMid ||
           ranRight === busIndexRight);
    
    busImageLeft.src = allBusImages[ranLeft].src;
    busImageMid.src = allBusImages[ranMid].src;
    busImageRight.src = allBusImages[ranRight].src;
    // console.log(event.target.id);
    console.log('Random Left', ranLeft);
    console.log('Random Middle', ranMid);
    console.log('Random Right', ranRight);
    console.log('LEFT',allBusImages[ranLeft].src);
    console.log('mid',allBusImages[ranMid].src);
    console.log('right',allBusImages[ranRight].src);


    // like incrementor
    if (event.target.id === 'left'){
      allBusImages[busIndexLeft].likes++;
    } else if (event.target.id ==='middle') {
      allBusImages[busIndexMid].likes++;
    } else {
      allBusImages[busIndexRight].likes++;
    }

    allBusImages[busIndexLeft].instanced++;
    allBusImages[busIndexMid].instanced++;
    allBusImages[busIndexRight].instanced++;

    busImageLeft.dataset.index = ranLeft;
    busImageMid.dataset.index = ranMid;
    busImageRight.dataset.index = ranRight;

    busIndexLeft = ranLeft;
    busIndexMid = ranMid;
    busIndexRight = ranRight;


  }
  //this part should count up total number of clicks and turn off event handler once 25 are reached. will also call vote list or chart later on.
  clickCounter++;
  if (clickCounter === 25) {
    busImageLeft.removeEventListener('click',imgClickHandler);
    busImageMid.removeEventListener('click',imgClickHandler);
    busImageRight.removeEventListener('click',imgClickHandler);
    renderChart();
  }
  console.log(clickCounter, (clickCounter >= 25), 'true?');
};

busImageLeft.addEventListener('click', imgClickHandler);
busImageMid.addEventListener('click', imgClickHandler);
busImageRight.addEventListener('click', imgClickHandler);

// constructed img-objects go here
new BusMallImage('./img/bag.jpg', 'Artoo Luggage');
new BusMallImage('./img/banana.jpg', 'Nana Slicer');
new BusMallImage('./img/bathroom.jpg', 'Bathroom iPad Stand');
new BusMallImage('./img/boots.jpg', 'Toeless Boots');
new BusMallImage('./img/breakfast.jpg', 'Toaster Oven & Coffee Pot');
new BusMallImage('./img/bubblegum.jpg', 'Meatball Gum');
new BusMallImage('./img/chair.jpg', 'Artisinal Chair');
new BusMallImage('./img/cthulhu.jpg', 'Cthulhu Action Figure');
new BusMallImage('./img/dragon.jpg', 'Can o\' Dragon Meats');
new BusMallImage('./img/pen.jpg', 'Pencap Cutlery');
new BusMallImage('./img/pet-sweep.jpg', 'PetBroom');
new BusMallImage('./img/scissors.jpg', 'Pisa Scissors');
new BusMallImage('./img/shark.jpg', 'Shark Sleeping Bag');
new BusMallImage('./img/sweep.png', 'Kid Sweeper');
new BusMallImage('./img/tauntaun.jpg', 'Tauntaun Sleeping Bag');
new BusMallImage('./img/unicorn.jpg', 'Can o\' Unicorn Meats');
new BusMallImage('./img/usb.gif', 'USB Tentacle');
new BusMallImage('./img/water-can.jpg', 'Self-Watering Can');
new BusMallImage('./img/wine-glass.jpg', 'Snifter Wine Glass');
// STRETCH: add laptop steering wheel and sugar-free haribo gummy bears

//=========
// Charts
//=========

var renderChart = function () {
  var imageNames = [];
  var imageLikes = [];
  var colors = [];
  for (var i in allBusImages) {
    imageNames.push(allBusImages[i].name);
    imageLikes.push(allBusImages[i].likes);
    colors.push('red');
  }
  console.log(imageLikes);

  var chartData = {
    labels: imageNames, // #Labels for individual rows of data
    datasets: [{ //takes in more than one set of data
      label: '# of Votes', // #Need to label your chart
      data: imageLikes, //#array of values
      backgroundColor: colors,
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    animation: {
      duration: 800,
      easing: 'easeInCirc',
    },
    responsive: true,
  };

  var barChart = {
    type: 'horizontalBar', //refers to the type of chart
    data: chartData, // #insert actual array of chart Data
    options: chartOptions, // insert the default options
  };

  //render the chart
  var myChart = new Chart(ctx, barChart);
};
