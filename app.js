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
var busImageLeft = document.getElementById('left');
var busImageMid = document.getElementById('mid');
var busImageRight = document.getElementById('right');
var imageSection = document.getElementById('clickme');
var busImageLeftArrayIndex = 0;
var busImageMidArrayIndex = 0;
var busImageRightArrayIndex = 0;
var allBusImages = [];
var clickCounter = 0;


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

// Event listeners and handlers
var imgClickHandler = function (eventObject) {
  if(event.target.id === 'left' || event.target.id === 'mid' || event.target.id === 'right') {

    do {
      var randomNumberLeft = Math.floor(Math.random() * allBusImages.length);
    } while(randomNumberLeft === busImageLeftArrayIndex);

    do {
      var randomNumberMid = Math.floor(Math.random() * allBusImages.length);
    } while(randomNumberMid === busImageMidArrayIndex);

    do {
      var randomNumberRight = Math.floor(Math.random() * allBusImages.length);
    } while(randomNumberRight === busImageRightArrayIndex);

    allBusImages[busImageLeftArrayIndex].likes++;
    allBusImages[busImageLeftArrayIndex].instanced++;

    busImageLeftArrayIndex = randomNumberLeft;
    busImageMidArrayIndex = randomNumberMid;
    busImageRightArrayIndex = randomNumberRight;
    
    eventObject.target.src = allBusImages[randomNumberLeft].src;
    eventObject.target.src = allBusImages[randomNumberMid].src;
    eventObject.target.src = allBusImages[randomNumberRight].src;
  }
};

busImageLeft.addEventListener('click', imgClickHandler);

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
// add laptop steering wheel and sugar-free haribo gummy bears
