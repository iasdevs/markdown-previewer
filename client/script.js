var editor = document.querySelector('#editor');
var previewer = document.querySelector('#previewer');
var wordCount = document.querySelector('#word-count');
var characterCount = document.querySelector('#character-count');
var btnSaveSession = document.querySelector('#save-session');
var btnClearSession = document.querySelector('#clear-session');

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

var loadSession = function(value) {
    var data = sessionStorage.getItem('md');
    let md = data !== null ? data : value;
    output(md);
};

editor.addEventListener('input', function() {
    this.onkeydown = null;
    output(editor.value);
});

// fallback if oninput event is not supported
editor.addEventListener('onkeydown', function() {
    output(editor.value);
});

btnSaveSession.addEventListener('click', function() {
    sessionStorage.setItem('md', editor.value);
});

btnClearSession.addEventListener('click', function() {
    sessionStorage.clear();
    location.reload();
});

{
    loadSession(editor.value);
}