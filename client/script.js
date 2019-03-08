var editor = document.querySelector('#editor');
var previewer = document.querySelector('#previewer');
var wordCount = document.querySelector('#word-count');
var characterCount = document.querySelector('#character-count');
var navItemSub = document.querySelectorAll('.nav__item--sub');
var displayCountItem = document.querySelectorAll('.display__count p');
var setAutosave = document.querySelector('#autosave-set');
var setCharacterCount = document.querySelector('#character-count-set');
var setWordCount = document.querySelector('#word-count-set');

var wordLength = function(value) {
    return value === "" ? 0 : value.split(" ").length;
};

var characterLength = function(value) {
    return value.replace(/\s/g, '').length;
};

var output = function(md) {
    editor.innerHTML = md;
    previewer.innerHTML = marked(md); 
    wordCount.innerHTML = wordLength(md);
    characterCount.innerHTML = characterLength(md);   
};

var saveSession = function() {
    clearSession();
    sessionStorage.setItem('md', editor.value);
    sessionStorage.setItem('characterCount', setCharacterCount.checked);
    sessionStorage.setItem('wordCount', setWordCount.checked);
    sessionStorage.setItem('autosave', setAutosave.checked);
}

var clearSession = function() {
    sessionStorage.clear();
};

var loadSession = function(value) {
    var md = sessionStorage.getItem('md');
    output(md !== null ? md : value);

    setAutosave.checked = JSON.parse(sessionStorage.getItem('autosave')) || setAutosave.checked;
    setCharacterCount.checked = JSON.parse(sessionStorage.getItem('characterCount')) || setCharacterCount.checked;
    setWordCount.checked = JSON.parse(sessionStorage.getItem('wordCount')) || setWordCount.checked;       
};

var loadSettings = function() {
    if(setAutosave.checked) saveSession();

    if(!setCharacterCount.checked) displayCountItem[0].classList.add('hidden');
    else displayCountItem[0].classList.remove('hidden');

    if(!setWordCount.checked) displayCountItem[1].classList.add('hidden');
    else displayCountItem[1].classList.remove('hidden');
}

editor.addEventListener('input', function() {
    this.onkeydown = null;
    if(setAutosave.checked) {
        saveSession();
        loadSession(editor.value);
    }
    output(editor.value);
});

// fallback if oninput event is not supported
editor.addEventListener('onkeydown', function() {
    if(setAutosave.checked) {
        saveSession();
        loadSession(editor.value);
    }
    output(editor.value);
});

document.querySelector('#save-session').addEventListener('click', function() {
    saveSession();
});

document.querySelector('#clear-session').addEventListener('click', function() {
    clearSession();
    location.reload();
});

document.querySelector('.item__preview-as').addEventListener('click', function() {
    navItemSub[0].classList.toggle('hidden');
});

document.querySelector('#html-set').addEventListener('click', function() {
    previewer.classList.add('html-display');
    previewer.classList.remove('styled-html-display');
});

document.querySelector('#styled-html-set').addEventListener('click', function() {
    previewer.classList.add('styled-html-display');
    previewer.classList.remove('html-display');
});

document.querySelector('.item__settings').addEventListener('click', function() {
    navItemSub[1].classList.toggle('hidden');
});

setAutosave.addEventListener('change', function() {
    saveSession();
});

setCharacterCount.addEventListener('change', function() {
    displayCountItem[0].classList.toggle('hidden');
});

setWordCount.addEventListener('change', function() {
    displayCountItem[1].classList.toggle('hidden');
});

{
    loadSession(editor.value);
    loadSettings();
}