# COMP2112 - Assignment 1

## Introduction
The E6+ feature I chose to use throughout Assignment 1 was <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions">arrow functions</a>. I chose to do so because I find them to be a cleaner, more condensed alternative to regular function syntax, and I think my code is bloated enough as it is... :D

## Example from A1:
`handleFileSelect = event => {
	const reader = new FileReader();
	reader.addEventListener('load', (event) => {
	imgSrc = ``<img class="thumb" src="${event.target.result}" style="width: 100%"/>``;
	imgGifPoll.innerHTML = imgSrc;
});
  reader.readAsDataURL(event.target.files[0]);
}`

## And what the user sees as a result:

![What the user sees as a result](https://github.com/lindaryan/comp2115-lab6/blob/master/img/a1ss.png)
