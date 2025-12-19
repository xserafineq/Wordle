class Game {
    constructor(words, guessWords, inputs) {
        this.words = words;
        this.guessWords = guessWords;
        this.inputs = inputs;
    }

    openInputs(startIndex, endIndex) {
        for (let i = startIndex - 1; i < endIndex; i++) {
            inputs[i].disabled = false;
        }
    }

    disableInputs(startIndex, endIndex) {
        for (let i = startIndex - 1; i < endIndex; i++) {
            inputs[i].disabled = true;
        }
    }

    start() {
        this.word = this.words[Math.floor(Math.random() * this.words.length)]
        this.startIndex = 1;
        this.endIndex = 5;
        console.log(this.word)
        this.openInputs(this.startIndex, this.endIndex);
        window.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.checkWord(this.startIndex, this.endIndex)
            }
        });
    }


    checkWord(startIndex, endIndex) {
        const lettersContainsCounts = new Map();

        for (let i = 0; i < this.word.length; i++) {
            lettersContainsCounts.set(this.word[i], this.howMuchContains(this.word[i], this.word))
        }

        var guessedWord = ""
        for (let i = startIndex - 1; i < endIndex; i++) {
            guessedWord += inputs[i].value.toLocaleLowerCase();
        }

        if (guessedWord === this.word) {
            for (let i = startIndex - 1; i < endIndex; i++) {
                inputs[i].className = "accepted";
            }
            document.getElementById("name").textContent = "WYGRAŁES"
        }

        else if (this.guessWords.includes(guessedWord)) {
            let index = 0;
            for (let i = startIndex - 1; i < endIndex; i++) {
                if (lettersContainsCounts.get(guessedWord[index]) > 0) {
                    if (guessedWord[index] == this.word[index]) {
                        inputs[i].className = "accepted";
                        lettersContainsCounts.set(guessedWord[index], lettersContainsCounts.get(guessedWord[index]) - 1)
                    }
                    else if (this.word.includes(guessedWord[index])) {
                        inputs[i].className = "contains";
                        lettersContainsCounts.set(guessedWord[index], lettersContainsCounts.get(guessedWord[index]) - 1)
                    }
                }
                index++;
            }
            this.disableInputs(this.startIndex, this.endIndex);
            this.startIndex = startIndex + 5;
            this.endIndex = endIndex + 5;
            this.openInputs(this.startIndex, this.endIndex);
        }

    }

    howMuchContains(letter, word) {
        let counter = 0;
        for (let i = 0; i < word.length; i++) {
            if (word[i] == letter) {
                counter++;
            }
        }
        return counter;
    }
}

var inputs = document.querySelectorAll("input"); //pobranie kolekcji pól tekstowych ze strony
var game = new Game(secretWords, guessWords, inputs); //utworzenie obiektu, przekazanie tablic ze słowami oraz pól tekstowych
game.start() //rozpoczęcie gry

