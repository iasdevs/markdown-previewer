const editor = document.getElementById('editor');
const previewer = document.getElementById('previewer');

const displayWordCount = document.getElementById('word-count');
const displayCharacterCount = document.getElementById('character-count');
const displayCountItem = document.querySelectorAll('.display__count p');

const setAutosave = document.getElementById('autosave-set');
const setCharacterCount = document.getElementById('character-count-set');
const setWordCount = document.getElementById('word-count-set');

const aPreviewAs = document.getElementById('a__preview-as');
const aSettings = document.getElementById('a__settings');
const dropdownPreviewAs = document.getElementById('dropdown-preview');
const dropdownSettings = document.getElementById('dropdown-settings');

const view = (value) => {
    editor.innerHTML = value;
    previewer.innerHTML = marked(value); 
    displayWordCount.innerHTML = value === "" ? 0 : value.split(" ").length;
    displayCharacterCount.innerHTML = value.replace(/\s/g, '').length;  
};

const clearSession = () => sessionStorage.clear();

const saveSession = () => {
    sessionStorage.setItem('markdown', editor.value);
    sessionStorage.setItem('characterCount', setCharacterCount.checked);
    sessionStorage.setItem('wordCount', setWordCount.checked);
    sessionStorage.setItem('autosave', setAutosave.checked);
}

const loadSession = () => {
    let session = (key) => JSON.parse(sessionStorage.getItem(key));
    let markdown = sessionStorage.getItem('markdown');
    
    view(markdown !== null ? markdown : editor.value);

    setAutosave.checked = session('autosave');
    setCharacterCount.checked = session('characterCount') ;
    setWordCount.checked = session('wordCount') ;       
};

const loadSettings = () => {
    if (setAutosave.checked) saveSession();

    if (!setCharacterCount.checked) displayCountItem[0].classList.add('hidden');
    else displayCountItem[0].classList.remove('hidden');

    if (!setWordCount.checked) displayCountItem[1].classList.add('hidden');
    else displayCountItem[1].classList.remove('hidden');
}

aPreviewAs.addEventListener('mouseup', () => {
    dropdownSettings.classList.add('hidden');
    aSettings.classList.remove('active');
    aPreviewAs.classList.toggle('active');
    dropdownPreviewAs.classList.toggle('hidden');
});

aSettings.addEventListener('mouseup', () => {
    dropdownPreviewAs.classList.add('hidden');
    aPreviewAs.classList.remove('active');
    aSettings.classList.toggle('active');
    dropdownSettings.classList.toggle('hidden');
});

editor.addEventListener('input', () => {
    if (setAutosave.checked) {
        clearSession();
        saveSession();
        loadSettings();
    }

    view(editor.value);
});

document.getElementById('save-session').addEventListener('mouseup', () => {
    clearSession();
    saveSession();
    loadSettings();
});

document.getElementById('clear-session').addEventListener('mouseup', () => {
    clearSession();
    location.reload();
});

document.getElementById('html-set').addEventListener('mouseup', () => {
    previewer.classList.add('html-display');
    previewer.classList.remove('styled-html-display');
});

document.getElementById('styled-html-set').addEventListener('mouseup', () => {
    previewer.classList.add('styled-html-display');
    previewer.classList.remove('html-display');
});

setAutosave.addEventListener('change', () => {
    clearSession();
    saveSession(); 
});

setCharacterCount.addEventListener('change', () => {
    if (setAutosave.checked) {
        clearSession();
        saveSession();
    }

    displayCountItem[0].classList.toggle('hidden');
});

setWordCount.addEventListener('change', () => {
    if (setAutosave.checked) {
        clearSession();
        saveSession();
    }
        
    displayCountItem[1].classList.toggle('hidden');
});

{
    loadSession();
    loadSettings();
}