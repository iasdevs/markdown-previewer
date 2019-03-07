var editor = document.querySelector('#editor');
var previewer = document.querySelector('#previewer');
var wordCount = document.querySelector('#word-count');
var characterCount = document.querySelector('#character-count');

var wordLength = function(value) {
    return value === "" ? 0 : value.split(" ").length;
};

var characterLength = function(value) {
    return value.replace(/\s/g, '').length;
};

var output = function(editor) {
    let md = editor.value;
    wordCount.innerHTML = wordLength(md);
    characterCount.innerHTML = characterLength(md);
    previewer.innerHTML = marked(md);    
};

editor.addEventListener('input', function() {
    this.onkeydown = null;
    output(editor);
});

// fallback if oninput event is not supported
editor.addEventListener('onkeydown', function() {
    output(editor);
});

{
    output(editor);
}