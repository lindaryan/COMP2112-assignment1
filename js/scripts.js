const AVATAR_URL = 'https://scontent-yyz1-1.cdninstagram.com/vp/fb0d94c8598b0bfb84cb26053788b3e0/5E0F93BD/t51.2885-19/s320x320/38518777_670223923334131_7075070090210705408_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com';
const main = document.querySelector('main');
const tweetBtn = document.querySelector('form');
const myAvatar = [...document.querySelectorAll('.my_avatar')];
myAvatar.forEach((img) => { img.src = AVATAR_URL; });
const imgGifPoll = document.querySelector('#imgGifPoll');
const searchGifBtn = document.querySelector('#searchGifBtn');
const searchGif = document.querySelector('#searchGif');

const emojibtn = document.querySelector('#emojibtn');
const emojimodalbody = document.querySelector('#emojimodalbody')
const textarea = document.querySelector('#textarea');
const searchEmoji = document.querySelector('#searchEmoji');
const emojiCategories = document.querySelector('#emojiCategories');

let emojis = [];
let toggle = document.querySelector('#switchGif');
let gifs = [];
let originalGifs = [];

const pollBtn = document.querySelector('#pollbtn')
// const tweets =  [];
const tweets = JSON.parse(localStorage.getItem('twitter')) || [];
// function to display tweet
render = () => {
    remember();
    main.innerHTML = tweets
        .map(newTweet = (tweet, i) => {
        return `
        <aside>
         <div>
            <img class="avatar" src="${tweet.avatar}">
         </div>
         <div class="formatted-tweet">
            <h6><a href="https://twitter.com/${tweet.username}">${tweet.name}</a> <span class="username">@${tweet.username}</span></h6>
            <p>${tweet.tweet} ${tweet.img}</p>
            <div class="imgGifPoll">
              ${tweet.isPollCreated ? displayVotes(tweet, i) : ''}
            </div>
            <div>
                <section>
                    <div id="reactions" class="btn-group mr-2">
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-message-outline"
                            aria-label="reply"
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-twitter-retweet"
                            aria-label="retweet"
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-heart-outline"
                            aria-label="like"
                            style=""
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-upload"
                            aria-label="share"
                        ></button>
                    </div>
                </section>
            </div>
        </div>
        </aside>
          `;
      })
        .join("");
        imgGifPoll.innerHTML = '';
        clearForm();
}
function remember() {
  // store our current tweets array in localstorage
  // but remove last memory of it first
  localStorage.removeItem('twitter');
  // remember tweets array
  localStorage.setItem('twitter', JSON.stringify(tweets))
}
function votesToPercentages(votes) {
  const total = votes.a + votes.b + votes.c + votes.d;
  return {
    a: Math.floor((votes.a / total) * 100),
    b: Math.floor((votes.b / total) * 100),
    c: Math.floor((votes.c / total) * 100),
    d: Math.floor((votes.d / total) * 100),
    total
  }
}
function displayVotes(tweet, i) {
  const percents = votesToPercentages(tweets[i].pollResults)  // {a: 33, b: 20, ,,,, total: 133}
  const letterChosen = tweets[i].pollResults.youChose; // a b c d

  if (tweet.isPollDone) {
    return `
    <div class="bargraph">
    <div id="bar1" class="bar" style="flex-basis: ${
      percents.a
    }%" data-vote="a">${tweets[i].voteOptions.a} ${
    letterChosen == "a" ? "&check;" : ""
  }</div>
    <div id="percentage1">${percents.a}%</div>
  </div>
  <div class="bargraph">
    <div id="bar2" class="bar" style="flex-basis: ${
      percents.b
    }%" data-vote="b">${tweets[i].voteOptions.b} ${
    letterChosen == "b" ? "&check;" : ""
  }</div>
    <div id="percentage2">${percents.b}%</div>
  </div>
  <div class="bargraph">
    <div id="bar3" class="bar" style="flex-basis: ${
      percents.c
    }%" data-vote="c">${tweets[i].voteOptions.c} ${
    letterChosen == "c" ? "&check;" : ""
  }</div>
  <div id="percentage3">${percents.c}%</div>
  </div>
  <div class="bargraph">
    <div id="bar4" class="bar" style="flex-basis: ${
      percents.d
    }%" data-vote="d">${tweets[i].voteOptions.d} ${
    letterChosen == "d" ? "&check;" : ""
  }</div>
  <div id="percentage4">${percents.d}%</div>
  </div>
  <div id="totalVotes">${percents.total} votes</div>
    `
  }
  return `
  <div class="poll flex-col" data-i="${i}">
     <button class="vote" value="a">${tweet.voteOptions.a}</button>
     <button class="vote" value="b">${tweet.voteOptions.b}</button>
     <button class="vote" value="c">${tweet.voteOptions.c}</button>
     <button class="vote" value="d">${tweet.voteOptions.d}</button>
  </div>
  `
}
// function to tweet everything
tweeting = event => {
	event.preventDefault();
  const voteOptions = {
    a: imgGifPoll.querySelector('#pollchoice1') ? imgGifPoll.querySelector('#pollchoice1').value : '',
    b: imgGifPoll.querySelector('#pollchoice2') ? imgGifPoll.querySelector('#pollchoice2').value : '',
    c: imgGifPoll.querySelector('#pollchoice3') ? imgGifPoll.querySelector('#pollchoice3').value : '',
    d: imgGifPoll.querySelector('#pollchoice4') ? imgGifPoll.querySelector('#pollchoice4').value : '',
  }
    if (textarea.value) {
    	tweets.unshift({
        avatar: AVATAR_URL,
        name: 'Linda R.',
        username: 'lindaryan',
        tweet: textarea.value,
        img: imgSrc,
        video: '',
        isPollCreated: !!(voteOptions.a && voteOptions.b && voteOptions.c && voteOptions.d),
        voteOptions,
        pollResults: {},
        isPollDone: false
      });
  	clearForm();
    render();
  } else {
    alert('Please enter a tweet.');
  }
}
function insertPoll() {
  // todo: disable the tweet button until all fields plus a question is inserted
  textarea.placeholder = 'Ask a question...';
  imgGifPoll.innerHTML = `
                <form>
                  <div class="form-group">
                    <input type="text" class="form-control" id="pollchoice1" aria-describedby="" maxlength="25" placeholder="Choice 1">
                    <br>
                    <input type="text" class="form-control" id="pollchoice2" aria-describedby="" maxlength="25" placeholder="Choice 2">
                    <br>
                    <input type="text" class="form-control" id="pollchoice3" aria-describedby="" maxlength="25" placeholder="Choice 3">
                    <br>
                    <input type="text" class="form-control" id="pollchoice4" aria-describedby="" maxlength="25" placeholder="Choice 4">
                    <br><br>
                    <h6>Poll length</h6>
                    <hr style="margin:0">
                    <div class="row">
                      <div class="col">
                        <label for="polldays">Days</label>
                        <select class="form-control" id="polldays">
                          <option>0</option>
                          <option selected>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div class="col">
                        <label for="pollhours">Hours</label>
                        <select class="form-control" id="pollhours">
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div class="col">
                        <label for="pollminutes">Minutes</label>
                        <select class="form-control" id="pollminutes">
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
  `;
}
async function vote(e) {
  if (!e.target.matches('.vote')) {
    return;
  }
  // find data-i's value so we know which element in tweets array to change
  const index = e.target.closest('.poll').dataset.i;
  const res = await fetch('https://my.api.mockaroo.com/votes.json?key=2d95a440')
  const data = await res.json(); // {"a":"05-658-6533","b":"60-026-8075","c":"89-841-5434","d":"65-564-0648"}
  const keyValues = Object.entries(data); // [["a","05-658-6533"], ...]
  const newKeyValues = keyValues.map(keyValArr => [keyValArr[0], parseInt(keyValArr[1].slice(-2), 10)]) // [["a",33], ...]
  // push JSON results into our tweets array
  tweets[index].pollResults = Object.fromEntries(newKeyValues) // {"a":33], ...}
  tweets[index].pollResults.youChose = e.target.value // a b c d
  tweets[index].isPollDone = true;
  render();
}
// function to select img
handleFileSelect = event => {
	const reader = new FileReader();
	reader.addEventListener('load', (event) => {
	imgSrc = `<img class="thumb" src="${event.target.result}" style="width: 100%"/>`;
	imgGifPoll.innerHTML = imgSrc;
});
  reader.readAsDataURL(event.target.files[0]);
}
// function to fetch gifs
fetchGifs = () => {
	const search = searchGif.value.replace(" ", "+");
	const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=MWTAuVtazla2ufb0p4EklJeBQ2aUbFzK&limit=10`;
	fetch(url)
	.then(response => response.json())
	.then(getGifs = response => {
		originalGifs = response.data;
	gifs['still'] = originalGifs.map((gif, index) => `<img src=${gif.images.fixed_height_small_still.url} data-index=${index} alt=""/>`).join("");
	gifs['animated'] = originalGifs.map((gif, index) => `<img src=${gif.images.fixed_height_small.url} data-index=${index} alt=""/>`).join("");
	browsegifs.innerHTML = gifs.still;
	// unhide switch to toggle gif animations
	switchgifsarea.classList.remove('hide');
});
}
// function to select gif
chooseGif = event => {
    const selected = event.target.dataset.index;
    gifSrc = originalGifs[selected].images.downsized.url;
    imgSrc = `<img src=${gifSrc} data-index=${selected} alt="" style="width: 100%"/>`;
    imgGifPoll.innerHTML = imgSrc;
    // clear and close gif search area upon gif selection
    browsegifs.innerHTML = '';
    searchGif.value = '';
    $('#insertgif').modal('hide');
}
// function to clear form
clearForm = () => {
	document.getElementById("myForm").reset();
	imgGifPoll.innerHTML = '';
	browsegifs.innerHTML = '';
  imgSrc = '';
}
// function to toggle gifs btwn still and animated src
toggleGif = () => {
    if (toggle.checked) {
      browsegifs.innerHTML = gifs.animated;
    } else {
      browsegifs.innerHTML = gifs.still;
    }
}
async function browseEmojis () {
  const url = `https://unpkg.com/emoji.json@12.1.0/emoji.json`;
  const response = await fetch(url);
  const data = await response.json()
  .then(function(resp) {
    emojis = resp;
    elements = emojis.map(emoji => `<div class="emoji">${emoji.char}</div>`).join("");
    emojimodalbody.innerHTML = elements;
  })
  searchEmoji.addEventListener('keyup', searchEmojis);
  function searchEmojis() {
    elements = emojis.filter(emoji => emoji.name.includes(searchEmoji.value))
    .map(emoji => `<div class="emoji">${emoji.char}</div>`).join("");
    emojimodalbody.innerHTML = elements;
  }
  emojimodalbody.addEventListener('click', chooseEmoji);
  // When user clicks on an emoji, that emoji gets displayed the textarea box
  function chooseEmoji(event) {
    if (event.target.className != "emoji") {
      return;
    } else {
      textarea.value += event.target.textContent;
    }
  }
}
document.querySelector('#uploadPic').addEventListener('change', handleFileSelect, false);
tweetBtn.addEventListener('submit', tweeting);
searchGifBtn.addEventListener('click', fetchGifs);
browsegifs.addEventListener('click', chooseGif);
toggle.addEventListener('change', toggleGif);
emojibtn.addEventListener('click', browseEmojis);
tweetBtn.addEventListener('submit', tweeting);
pollBtn.addEventListener('click', insertPoll);
main.addEventListener('click', vote)

render();
