const pianoKeys = document.querySelectorAll('.piano-keys .key'),
    volumeSlider = document.querySelector('.volume-slider input'),
    keysCheckbox = document.querySelector('.keys-checkbox input'),
    tutorialDisplay = document.querySelector('.tutorialDisplay'),
    tutorialButton = document.querySelector('#tutorial-button'),
    tutorialHide = document.querySelector('#tutorial-button-hide');

let allKeys = [],
    audio = new Audio(`tunes/a.wav`);

const playTune = (key) => {
    const audioSrc = `tunes/${key}.wav`;
    audio.src = audioSrc;
    audio.addEventListener("error", function() {
        console.error("Error", audioSrc);
        alert("Error");
    });

    if (key) {
        audio.play();
        const clickedKey = document.querySelector(`[data-key="${key}"]`);
        if (clickedKey) {
            clickedKey.classList.add("active");
            setTimeout(() => {
                clickedKey.classList.remove("active");
            }, 150);
        }
    }
};


pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (key.dataset.key) {
            playTune(key.dataset.key);
        }
    });
});


const handleVolume = (e) => {
    const volumeValue = Math.min(1, Math.max(0, e.target.value));
    audio.volume = volumeValue;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    if(allKeys.includes(e.key)){
        playTune(e.key)}
}


const showTutorial = () => {
    tutorialDisplay.style.display = "block";
}

const hideTutorial = () => {
    tutorialDisplay.style.display = "none";
}

tutorialButton.addEventListener("click", showTutorial);
tutorialHide.addEventListener("click", hideTutorial);
keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

