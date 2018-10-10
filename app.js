'use strict';

/* 

BusMall Focus Testing!

Pseudocode/Goal:
Make a Constructor that presents a series of three images on the focus testing site.
Each image cannot repeat after another. There will be counters for each time an image is voted on, each time an image appears but is not selected, and the number of times a user has voted.

After 25 votes, the results will be displayed.

*/

// global variables
var busImageLeft = document.getElementById('left');
var busImageMid = document.getElementById('mid');
var busImageRight = document.getElementById('right');
var imageSection = document.getElementById('clickme');
var busImageLeftArrayIndex = 0;

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
}

// Event listeners and handlers
var imgClickHandler = function (eventObject) {
  do {
    var randomNumber = Math.floor(Math.random() * allBusImages.length)
  } while(randomNumber === busImageLeftArrayIndex);

  allBusImages[busImageLeftArrayIndex].likes++;
  allBusImages[busImageLeftArrayIndex].appeared++;

  busImageLeftArrayIndex = randomNumber;
  eventObject.target.src = allBusImages[randomNumber].src;
};

busImageLeft.addEventListener('click', imgClickHandler);

// constructed img-objects go here
new BusMallImage();
