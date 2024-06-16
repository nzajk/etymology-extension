document.addEventListener('mouseup', async function() {
    var word = window.getSelection().toString().trim();

    if (word) {
        var etymology = await getEtymology(word);
        displayEtymology(word, etymology);
    }
});

// the API call for the etymology
async function getEtymology(word) {
    var response = await fetch(`http://127.0.0.1:5000/etymology/${word}`);
    var data = await response.json();

    if (response.ok) {
        return data['etymology'][0];
    } else {
        throw new Error(e);
    }
}

// update the word and etymology within the popup window
function displayEtymology(word, etymology) {
    document.getElementById('word').innerHTML = word;
    document.getElementById('etymology').innerHTML = etymology;
}