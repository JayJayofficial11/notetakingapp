document.addEventListener('DOMContentLoaded', function() {
    // Find the input box, add button, and notes container
    const newNoteInput = document.getElementById('noteInput');
    const createNoteButton = document.getElementById('addNoteBtn');
    const notesContainer = document.getElementById('noteList');
    let noteId = 0; 

    // Load notes from local storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            const noteElement = createNoteElement(note.text, note.id);
            notesContainer.appendChild(noteElement);
            noteId = Math.max(noteId, note.id + 1);
        });
    }

    // Save notes to local storage
    function saveNotes() {
        const notes = [];
        notesContainer.querySelectorAll('.note').forEach(note => {
            const input = note.querySelector('input');
            notes.push({ id: parseInt(note.dataset.id, 10), text: input.value });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Function to create a new note element
    function createNoteElement(noteText, id) {
        // Create a new note div
        const note = document.createElement('div');
        note.classList.add('note');
        note.dataset.id = id;

        // Create an input box for the note text
        const input = document.createElement('input');
        input.type = 'text';
        input.value = noteText;
        input.disabled = true;

        // Create an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            input.disabled = !input.disabled;
            editButton.textContent = input.disabled ? 'Edit' : 'Save';
            if (input.disabled) saveNotes();
        });

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            notesContainer.removeChild(note);
            saveNotes();
        });

        // Put the input box, edit button, and delete button into the note div
        note.appendChild(input);
        note.appendChild(editButton);
        note.appendChild(deleteButton);

        return note;
    }

    // When we click the add button
    createNoteButton.addEventListener('click', function() {
        const noteText = newNoteInput.value.trim();
        if (noteText !== '') {
            // Create a new note and add it to the container
            const noteElement = createNoteElement(noteText, noteId);
            notesContainer.appendChild(noteElement);
            newNoteInput.value = ''; // Clear the input box
            noteId++; // Increment note ID for the next note
            saveNotes(); // Save the new note to local storage
        }
    });

    // Load existing notes from local storage
    loadNotes();
});
