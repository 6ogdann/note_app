const shuffleButton = document.querySelector(".shuffle");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const repeatButton = document.querySelector(".repeat");

const notesButton = document.getElementById("notes");
const tasksButton = document.getElementById("tasks");
const booksButton = document.getElementById("books");
const notes = document.querySelector(".notes-form");
const tasks = document.querySelector(".tasks-form");
const books = document.querySelector(".books-form");

const taskForm = document.getElementById("task-form");
const noteForm = document.getElementById("note-form");
const bookForm = document.getElementById("book-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("add-tasks");
const openNoteFormBtn = document.getElementById("add-notes");
const openBookFormBtn = document.getElementById("add-books");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const closeNoteFormBtn = document.getElementById("close-note-form-btn");
const closeBookFormBtn = document.getElementById("close-book-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const addOrUpdateNoteBtn = document.getElementById("add-or-update-note-btn");
const addOrUpdateBookBtn = document.getElementById("add-or-update-book-btn");

const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");

const tasksContainer = document.getElementById("tasks-container");
const notesContainer = document.getElementById("notes-container");
const booksContainer = document.getElementById("books-container");
const titleInput = document.getElementById("title-input-tasks");
const titleInputNotes = document.getElementById("title-input-notes");
const titleInputBooks = document.getElementById("title-input-books");
const dateInput = document.getElementById("date-input-tasks");
const dateInputNotes = document.getElementById("date-input-notes");
const dateInputBooks = document.getElementById("date-input-books");
const descriptionInput = document.getElementById("description-input-tasks");
const descriptionInputNotes = document.getElementById("description-input-notes");
const descriptionInputBooks = document.getElementById("description-input-books");
const bookPlan = document.getElementById("book-option");

const logoutSidebar = document.getElementById("select-logout");


let shuffleOn = false;
let repeatOn = false;
let playOn = false;
let pauseOn = false;

let eEgg = 0;

let disableTasks = 0;
let disableBooks = 0;

let accountIs;

function updateTime(){
const currentTime = document.getElementById("time");
const date = new Date();
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const formattedTime = `${hours}:${minutes}`;
currentTime.textContent = formattedTime;
}

updateTime();

setInterval(updateTime, 1000);

window.addEventListener("DOMContentLoaded", () => {
    const accountStatus = localStorage.getItem("AccountIs");

    if (accountStatus !== "true") {
        window.location.replace("login.html");
    }
});

window.onload = () => {
    let changeActivate = localStorage.getItem("changeActivate") === "true";
    if(changeActivate){
        let hdrColor = localStorage.getItem("hdrColor");
        let bgColor = localStorage.getItem("bgColor");
        document.querySelector("header").style.backgroundColor = hdrColor;
        document.body.style.backgroundColor = bgColor;
        setTimeout(() => {
            changeActivate = false;
        }, 1000);
    }
    eEgg = parseInt(localStorage.getItem("Egg")) || 0;
    if(eEgg === 1){
        let newSong ={
            id: 10,
            title: "Porodicno Blago",
            artist: "Kornelije Kovac",
            duration: "1:18",
            src: "../static/music/Porodicno Blago.mp3",
        };
    
        allSongs.push(newSong);
        userData.songs.push(newSong);
        renderSongs(userData.songs);
    };

    disableTasks = parseInt(localStorage.getItem("disableTasksOn")) || 0;
    disableBooks = parseInt(localStorage.getItem("disableBooksOn")) || 0;

    if(disableTasks === 1 && disableBooks === 1) {
            notes.style.display = "flex";
            tasks.style.display = "none";
            tasksButton.style.display = "none";
            books.style.display = "none";
            booksButton.style.display = "none";
        }
    else if(disableTasks === 1){
        notes.style.display = "flex";
        tasks.style.display = "none";
        tasksButton.style.display = "none";
    }
    else if(disableBooks === 1){
        notes.style.display = "flex";
        books.style.display = "none";
        booksButton.style.display = "none";
    }
    
    else {
        notes.style.display = "flex";
        booksButton.style.display = "flex";
        tasksButton.style.display = "flex";
    }
};

notesButton.addEventListener("click", () => {
    notes.style.display = "flex";
    tasks.style.display = "none";
    books.style.display = "none";
});

tasksButton.addEventListener("click", () => {
    notes.style.display = "none";
    tasks.style.display = "flex";
    books.style.display = "none";
});

booksButton.addEventListener("click", () => {
    notes.style.display = "none";
    tasks.style.display = "none";
    books.style.display = "flex";
});

const taskData = JSON.parse(localStorage.getItem("data")) || [];
const noteData = JSON.parse(localStorage.getItem("notesData")) || [];
const bookData = JSON.parse(localStorage.getItem("bookData")) || [];

let currentTask = {};
let currentNote = {};
let currentBook = {};

const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '')
}

const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  const taskObj = {
    id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: removeSpecialChars(titleInput.value),
    date: dateInput.value,
    description: removeSpecialChars(descriptionInput.value),
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer()
  reset()
};

const addOrUpdateNote = () => {
    const dataArrIndex = noteData.findIndex((item) => item.id === currentNote.id);
    const noteObj = {
        id: `${removeSpecialChars(titleInputNotes.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: removeSpecialChars(titleInputNotes.value),
        date: dateInputNotes.value,
        description: removeSpecialChars(descriptionInputNotes.value),
    };

    if (dataArrIndex === -1) {
        noteData.unshift(noteObj);
    } else {
        noteData[dataArrIndex] = noteObj;
    }

    localStorage.setItem("notesData", JSON.stringify(noteData));
    updateNotesContainer();
    resetNoteForm();
};

const addOrUpdateBook = () => {
    const dataArrIndex = bookData.findIndex((item) => item.id === currentBook.id);
    const bookObj = {
        id: `${removeSpecialChars(titleInputBooks.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: removeSpecialChars(titleInputBooks.value),
        date: dateInputBooks.value,
        description: removeSpecialChars(descriptionInputBooks.value),
        bookState: removeSpecialChars(bookPlan.value)
    };

    if (dataArrIndex === -1) {
        bookData.unshift(bookObj);
    } else {
        bookData[dataArrIndex] = bookObj;
    }

    localStorage.setItem("bookData", JSON.stringify(bookData));
    updateBooksContainer();
    resetBookForm();
};

const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";
  
    taskData.forEach(
      ({ id, title, date, description }) => {
          tasksContainer.innerHTML += `
          <div class="task" id="${id}">
            <p class="task-title"><strong>Title:</strong> ${title}</p>
            <p class="task-date"><strong>Date:</strong> ${date}</p>
            <p class="task-description" style="word-wrap: break-word;"><strong>Description:</strong><br> <span style="font-size: 15px;">${description}</span></p>
            <button onclick="editTask(this)" type="button" class="btn">Edit</button>
            <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
          </div>
        `;
      }
    );
};
  
const updateNotesContainer = () => {
    notesContainer.innerHTML = "";
    noteData.forEach(({ id, title, date, description }) => {
        notesContainer.innerHTML += `
            <div class="note" id="${id}">
                <p class="note-title"><strong>Title:</strong> ${title}</p>
                <p class="note-date"><strong>Date:</strong> ${date}</p>
                <p class="note-description"><strong>Description:</strong><br> <span style="font-size: 15px;">${description}</span></p>
                <button onclick="editNote(this)" type="button" class="btn">Edit</button>
                <button onclick="deleteNote(this)" type="button" class="btn">Delete</button> 
            </div>
        `;
    });
};

const updateBooksContainer = () => {
    booksContainer.innerHTML = "";
    bookData.forEach(({ id, title, date, description, bookState }) => {
        booksContainer.innerHTML += `
            <div class="book" id="${id}">
                <p class="book-title"><strong>Title:</strong> ${title}</p>
                <p class="book-date"><strong>Date:</strong> ${date}</p>
                <p class="book-description"><strong>Description:</strong><br> <span style="font-size: 15px;">${description}</span></p>
                <p class="book-plan"><strong>${bookState}</strong></p>
                <button onclick="editBook(this)" type="button" class="btn">Edit</button>
                <button onclick="deleteBook(this)" type="button" class="btn">Delete</button> 
            </div>
        `;
    });
};

const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
};

const deleteNote = (buttonEl) => {
    const dataArrIndex = noteData.findIndex((item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    noteData.splice(dataArrIndex, 1);
    localStorage.setItem("notesData", JSON.stringify(noteData));
};

const deleteBook = (buttonEl) => {
    const dataArrIndex = bookData.findIndex((item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    bookData.splice(dataArrIndex, 1);
    localStorage.setItem("bookData", JSON.stringify(bookData));
};

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");  
};

const editNote = (buttonEl) => {
    const dataArrIndex = noteData.findIndex((item) => item.id === buttonEl.parentElement.id);
    
    currentNote = noteData[dataArrIndex];

    titleInputNotes.value = currentNote.title;
    dateInputNotes.value = currentNote.date;
    descriptionInputNotes.value = currentNote.description;

    addOrUpdateNoteBtn.innerText = "Update Note";

    noteForm.classList.toggle("hidden");
};

const editBook = (buttonEl) => {
    const dataArrIndex = bookData.findIndex((item) => item.id === buttonEl.parentElement.id);
    
    currentBook = bookData[dataArrIndex];

    titleInputBooks.value = currentBook.title;
    dateInputBooks.value = currentBook.date;
    descriptionInputBooks.value = currentBook.description;

    addOrUpdateBookBtn.innerText = "Update Book";

    bookForm.classList.toggle("hidden");
};

const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

const resetNoteForm = () => {
    addOrUpdateNoteBtn.innerText = "Add Note";
    titleInputNotes.value = "";
    dateInputNotes.value = "";
    descriptionInputNotes.value = "";
    noteForm.classList.toggle("hidden");
    currentNote = {};
};

const resetBookForm = () => {
    addOrUpdateBookBtn.innerText = "Add Book";
    titleInputBooks.value = "";
    dateInputBooks.value = "";
    descriptionInputBooks.value = "";
    bookForm.classList.toggle("hidden");
    currentBook = {};
};

if (taskData.length) {
  updateTaskContainer();
};

openTaskFormBtn.addEventListener("click", () => taskForm.classList.toggle("hidden"));
openNoteFormBtn.addEventListener("click", () => noteForm.classList.toggle("hidden"));
openBookFormBtn.addEventListener("click", () => bookForm.classList.toggle("hidden"));


closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

closeNoteFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;
  
    if (formInputsContainValues && formInputValuesUpdated) {
      confirmCloseDialog.showModal();
    } else {
      resetNoteForm();
    }
});

closeBookFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;
  
    if (formInputsContainValues && formInputValuesUpdated) {
      confirmCloseDialog.showModal();
    } else {
      resetBookForm();
    }
});  

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());
discardBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

if (noteData.length) updateNotesContainer();
if (bookData.length) updateBooksContainer();

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateNote();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateBook();
});

const allSongs = [
    {
      id: 0,
      title: "Fletcher's Song In Club",
      artist: "Justin Hurwitz",
      duration: "1:29",
      src: "../static/music/Fletcher's Song In Club.mp3",
    },
    {
      id: 1,
      title: "Give Me The Night",
      artist: "George Benson",
      duration: "5.01",
      src: "../static/music/Give Me The Night.mp3",
    },
    {
      id: 2,
      title: "Just The Two Of Us",
      artist: "Grover Washington, Jr. · Bill Withers",
      duration: "7:18",
      src: "../static/music/Just the Two of Us (feat. Bill Withers).mp3",
    },
    {
      id: 3,
      title: "La vie en rose",
      artist: "Zaz",
      duration: "3:51",
      src: "../static/music/La vie en rose.mp3",
    },
    {
      id: 4,
      title: "In the Air Tonight",
      artist: "Phil Collins",
      duration: "5:35",
      src: "../static/music/In the Air Tonight (2015 Remaster).mp3",
    },
    {
      id: 5,
      title: "Another Day in Paradise",
      artist: "Phil Collins",
      duration: "5:23",
      src: "../static/music/Another Day in Paradise (2016 Remaster).mp3",
    },
    {
      id: 6,
      title: "The Rhythm of the Night",
      artist: "Corona",
      duration: "3:25",
      src: "../static/music/Corona - The Rhythm of the Night (Official Music Video).mp3",
    },
    {
      id: 7,
      title: "Love Tonight",
      artist: "Shouse",
      duration: "2:51",
      src: "../static/music/SHOUSE - Love Tonight (Official Radio Edit).mp3",
    },
    {
      id: 8,
      title: "Tom's Diner (Cover)",
      artist: "AnnenMayKantereit x Giant Rooks",
      duration: "4:33",
      src: "../static/music/Tom's Diner (Cover) - AnnenMayKantereit x Giant Rooks.mp3",
    },
    {
      id: 9,
      title: "Hold The Line",
      artist: "Toto",
      duration: "3:58",
      src: "../static/music/Toto - Hold The Line (Official Video).mp3",
    },
  ];

const audio = new Audio();

let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

const playSong = (id) => {
    const song = userData.songs.find(song => song.id === id);
    if (!song) return;

    audio.src = song.src;
    audio.title = song.title;

    if (userData.currentSong === null || userData.currentSong.id !== song.id) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData.songCurrentTime;
    }

    userData.currentSong = song;
    setDisplay();
    if(playOn && pauseOn === false){
        audio.play();
    };
};

const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    audio.pause();
};

const previousSong = () => {
    if(userData?.currentSong === null) return;
    else if(playOn && pauseOn === false)
    {
        const currentSongIndex = getCurrentSongIndex();
        let previoussong = userData?.songs[currentSongIndex - 1];
        if(previoussong){
            playSong(previoussong.id);
            audio.play();
        }
        else if(!previoussong){
            previoussong = userData.songs.find(song => song.id === allSongs.length - 1);
            playSong(previoussong.id);
            audio.play();
        }
    }
    else if(pauseOn && playOn === false){
        const currentSongIndex = getCurrentSongIndex();
        let previoussong = userData?.songs[currentSongIndex - 1];
        playButton.style.display = "none";
        pauseButton.style.display = "flex";
        pauseOn = false;
        playOn = true;
        playSong(previoussong.id);
        audio.play();
    }
};

const nextSong = () => {
    if(userData?.currentSong === null) return;
    else if(playOn && pauseOn === false)
    {
        const currentSongIndex = getCurrentSongIndex();
        let nextsong = userData?.songs[currentSongIndex + 1];
        if (nextsong) {
            playSong(nextsong.id);
            audio.play();
        }
        else if(!nextsong){
            nextsong = userData.songs.find(song => song.id === 0);
            playSong(nextsong.id);
            audio.play();
        }
    }
    else if(pauseOn && playOn === false){
        const currentSongIndex = getCurrentSongIndex();
        let nextsong = userData?.songs[currentSongIndex - 1];
        playButton.style.display = "none";
        pauseButton.style.display = "flex";
        pauseOn = false;
        playOn = true;
        playSong(nextsong.id);
        audio.play();
    }
};

const shuffle = () => {
    const shuffledSongs = [...userData.songs];
    shuffledSongs.sort(() => Math.random() - 0.5);

    shuffledSongs.forEach((song, index) => {
        song.id = index;
    });

    userData.songs = shuffledSongs;
    renderSongs(userData.songs);
    pauseSong();
    userData.currentSong = null;
    if(playOn && pauseOn === false){
      playSong(userData.songs[0].id);  
      audio.play();
    };  
};

const repeat = () => {
    const currentSongIndex = getCurrentSongIndex();
    const repeat = () => {
        repeatOn = !repeatOn;
        repeatButton.classList.toggle("active", repeatOn);
    };
};

const renderSongs = (songs) => {
    const songList = document.querySelector(".song-list"); 
    if (!songList) return;

    songList.innerHTML = "";

    songs.forEach((song) => {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");
        songItem.textContent = `${song.title} - ${song.artist}`;

        if (userData.currentSong && userData.currentSong.id === song.id) {
            songItem.classList.add("playing");
        }

        songItem.addEventListener("click", () => playSong(song.id));

        songList.appendChild(songItem);
    });
};

const setDisplay = () => {
    const playingSong = document.querySelector(".song-name");
    const songTime = document.querySelector(".song-time");
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;

    playingSong.textContent = currentTitle || "Song name";

    if (audio.duration) {
        const currentTime = audio.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        songTime.textContent = formattedTime;
    }
};

const getCurrentSongIndex = () => {
    return userData?.songs.findIndex((song) => song.id === userData?.currentSong?.id);
};

function playNextSong() {
    const currentSongIndex = getCurrentSongIndex();
    let nextsong1 = userData?.songs[currentSongIndex + 1];
    if(playOn && pauseOn === false){
        playSong(nextsong1.id);
        audio.play();
    };
    
}

playButton.addEventListener("click", () => {
    playButton.style.display = "none";
    pauseButton.style.display = "flex";
    if (userData.currentSong) {
        playSong(userData.currentSong.id);
        audio.play()
    } else {
        playSong(userData.songs[0].id);
        audio.play();
    }
    playOn = true;
    pauseOn = false;
});

pauseButton.addEventListener("click", function () {
    userData.songCurrentTime = audio.currentTime;
    audio.pause();
    pauseButton.style.display = "none";
    playButton.style.display = "flex";
    playOn = false;
    pauseOn = true;
});

shuffleButton.addEventListener("click", function () {
    shuffleButton.classList.toggle("active"); 
    shuffleOn = !shuffleOn; 
    shuffle();
});

repeatButton.addEventListener("click", function () {
    repeatButton.classList.toggle("active"); 
    repeatOn = !repeatOn; 
    repeat;
});



previousButton.addEventListener("click", previousSong);
nextButton.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", () => {
    setDisplay();
});

audio.addEventListener("ended", () => {
    let currentSongIndex = getCurrentSongIndex();
    if (repeatOn) {
        playSong(userData.currentSong.id);
        audio.currentTime = 0
        audio.play();
    } 
    else if(shuffleOn) {
        shuffle();
        if (currentSongIndex === userData.songs.length - 1) {
            playSong(userData.songs[0].id);
            audio.play();
        } else {
            playNextSong();
        }
    } 
    else if(playOn && pauseOn === false && currentSongIndex.id < allSongs.length && currentSongIndex.id >= 0){
        playNextSong();
    }
    else {
        if (currentSongIndex === userData.songs.length - 1) {
            playSong(userData.songs[0].id);
            audio.play();
        } else {
            playNextSong();
        }
    }
});

const sortSongs = () => {
    userData.songs.sort((a, b) => a.title.localeCompare(b.title));
    userData.songs.forEach((song, index) => {
        song.id = index;
    });

    return userData.songs;
};

document.addEventListener("DOMContentLoaded", function () {
    if (shuffleOn) {
        shuffle();
        playNextSong();
    } else {
        sortSongs();
    }
    if(repeatOn && playOn && pauseOn === false){
        repeat();
        playNextSong();
    }
    else {
        audio.pause();
    }

    setDisplay();
});

logoutSidebar.addEventListener("click", () => {
    window.location.replace("login.html");
    let rememberMe = localStorage.getItem("RememberMe");
    if(rememberMe === 0) {
        localStorage.setItem("AccountIs", "false");
    }
});