document.addEventListener('mouseup', async function() {
    if (event.target.closest('#extension-panel')) {
        return;
    }

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
        throw new Error('Error in fetching etymology');
    }
}

// create and display a panel to show the word and etymology
function extensionPanel() {
    var panel = document.createElement('div');
    panel.id = 'extension-panel';
    panel.style.position = 'fixed';
    panel.style.bottom = '15px';
    panel.style.right = '15px';
    panel.style.width = '300px';
    panel.style.padding = '12.5px';
    panel.style.backgroundColor = 'white';
    panel.style.border = '2px solid black';

    var wordElement = document.createElement('p');
    wordElement.id = 'word';
    panel.appendChild(wordElement);

    var etymologyElement = document.createElement('p');
    etymologyElement.id = 'etymology';
    panel.appendChild(etymologyElement);

    var exitButton = document.createElement('button');
    exitButton.innerHTML = 'exit';
    exitButton.style.float = 'right';
    exitButton.onclick = function() {
        document.body.removeChild(panel);
    };
    panel.appendChild(exitButton);

    document.body.appendChild(panel);
}

// update the word and etymology within the floating panel
function displayEtymology(word, etymology) {
    if (!document.getElementById('extension-panel')) {
        extensionPanel();
    }

    document.getElementById('word').innerHTML = `Word: ${word}`;
    document.getElementById('etymology').innerHTML = `Etymology: ${etymology}`;
}
