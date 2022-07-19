const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enable/Disable button
const toggleButton = () => {
    button.disabled = !button.disabled;
}

// pass joke to the speech API
const tellMeJoke = (joke) => {
    VoiceRSS.speech({
        key: '69a49cda9a02468abeed5c63a186920a',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Joke teller API
async function JokeTeller() {
    let Joke = '';
    const apiURl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        const res = await fetch( apiURl);
        const data = await res.json();
        if (data.setup) {
            Joke = `${data.setup} ... ${data.delivery}`;
        } else {
            Joke = data.joke;
        }
        // text-to-speech
        tellMeJoke(Joke);
        // disable/enable button
        toggleButton();
    } catch (error) {
        console.log(error)
    }
}

// Event Listeners
button.addEventListener('click', JokeTeller)
audioElement.addEventListener('ended', toggleButton)