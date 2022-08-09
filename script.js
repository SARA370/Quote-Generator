const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];
// show Loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// show new quote
function newQuote(){
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with 'unknown'
    if(!quote.author) {
        authorText.textContent = 'unknown';
    }else{
        authorText.textContent = quote.author;
    }
    //check quote length to dertermine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

// Get Quotes From API
// so we are going to use an asynchronous fetch request within a try catch statement. an asynchronous function can run at any time independently and it won't stop the browser from completing the loading of tha page
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    
//try, catct help us to attempt to complete a fetch (go for and then bring back (someone or something) for someone)request, but if it dosent work, we can catch the error information and do something with it.
    try{
        const response = await fetch(apiUrl); // this means that this constant will not be populated until it has some data fetched from our API; THIS MEANS by default, if we did not do asynchronous and we did not do await, it would try to set this response value before it had a chance to fetch and that would cause an error. so in this case, we are only setting the response constant when we actually have data and it can actually be set or else it would juste be undefined.

        apiQuotes = await response.json(); // so its means that we are getting the JSON from our API as a response and then we are truning that response into a JSON object because from a web server, it's actually juste a series of strings, as we so in the other one. and we are going to pass that into a global variable called API quotes
        newQuote();
    }catch (error){

    }
}
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; // the ? is to show that we will have a query parametre here whiche came from the page of insctructions of twitter
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on load
getQuotes(); // here we need to run get quotes function as soon as the page loads.
