const loadFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

let notes = loadFromStorage("notes") ? loadFromStorage("notes") : [];
let note_id = loadFromStorage("note_id") ? loadFromStorage("note_id") : 0;





const buildNote = (text, time, date) => {
    note_id++;

    const note = new Note(note_id,text,time,date) 

    notes.push(note);
    buildNoteHtml(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("note_id" , note_id);
}

const buildNoteHtml = (note) => {
    const note_element = document.createElement("div"); // <div></div>
    note_element.classList.add("note"); //<div class = "note"></div>

    const note_txt = document.createElement("p");
    note_txt.classList.add("note_txt");
    note_txt.innerText += note.note_txt; 

    const note_time = document.createElement("p");
    note_time.classList.add("note_time");
    note_time.innerText += note.note_time; 

    const note_date = document.createElement("p");
    note_date.classList.add("note_date");
    note_date.innerText += note.note_date; 
    
    const close_icon = document.createElement("button");
    close_icon.classList.add("close_icon");
    close_icon.innerText = "Delete";
    close_icon.addEventListener("click", () => deleteNote(note.note_id))

    note_element.append(note_txt, note_time, note_date, close_icon);

    document.querySelector("#note_board").appendChild(note_element);

    note_txt.addEventListener("click", () => {
        const text_area = document.createElement("textarea");
        text_area.id = "text_area";
        text_area.value = note.note_txt;
        note_element.replaceChild(text_area, note_txt);

        const update_button = document.createElement("button");
        update_button.innerHTML = "Update";
        note_element.replaceChild(update_button, close_icon);
        
        update_button.addEventListener("click", () => {
            notes.find(petek => petek.note_id === note.note_id).note_txt = text_area.value;

            localStorage.setItem("notes", JSON.stringify(notes));

            document.querySelector("#note_board").innerHTML = "";

            for (let note of notes) {
                buildNoteHtml(note);
            }

        })
    })
}

const deleteNote = (id) => {

    notes = notes.filter(note => note.note_id != id);

    
    document.querySelector("#note_board").innerHTML = "";
    for (let note of notes) {
        buildNoteHtml(note);
    }
    localStorage.setItem("notes", JSON.stringify(notes));
}

for (let note of notes) {
    buildNoteHtml(note);
}

const searchNote = (val) => {

    const new_notes = notes.filter(note => note.note_txt.includes(val));

    if (val === ''){
        document.querySelector("#note_board").innerHTML = "";
        for (let note of notes) {
            buildNoteHtml(note);
        }
    }

    else if (new_notes.length == 0) {
        document.querySelector("#note_board").innerHTML = "not found";
    }

    else {
        document.querySelector("#note_board").innerHTML = "";
        for (let note of new_notes) {
            buildNoteHtml(note);
        }
    }

}



