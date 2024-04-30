document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const bookName = urlParams.get('book');
  const chapterNumber = urlParams.get('chapter');
  const verseNumber = urlParams.get('verse');
  const bookSelect = document.getElementById('book-select');
  const chapterSelect = document.getElementById('chapter-select');
  const translationSelect1 = document.getElementById('translation-select1');
  const translationSelect2 = document.getElementById('translation-select2');
  const versesContainer1 = document.getElementById('verses-container1');
  const versesContainer2 = document.getElementById('verses-container2');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  const chaptersPerBook = {
    Genesis: 50,
    Exodus: 40,
    Leviticus: 27,
    Numbers: 36,
    Deuteronomy: 34,
    Joshua: 24,
    Judges: 21,
    Ruth: 4,
    '1 Samuel': 31,
    '2 Samuel': 24,
    '1 Kings': 22,
    '2 Kings': 25,
    '1 Chronicles': 29,
    '2 Chronicles': 36,
    Ezra: 10,
    Nehemiah: 13,
    Esther: 10,
    Job: 42,
    Psalms: 150,
    Proverbs: 31,
    Ecclesiastes: 12,
    'Song of Solomon': 8,
    Isaiah: 66,
    Jeremiah: 52,
    Lamentations: 5,
    Ezekiel: 48,
    Daniel: 12,
    Hosea: 14,
    Joel: 3,
    Amos: 9,
    Obadiah: 1,
    Jonah: 4,
    Micah: 7,
    Nahum: 3,
    Habakkuk: 3,
    Zephaniah: 3,
    Haggai: 2,
    Zechariah: 14,
    Malachi: 4,
    Matthew: 28,
    Mark: 16,
    Luke: 24,
    John: 21,
    Acts: 28,
    Romans: 16,
    '1 Corinthians': 16,
    '2 Corinthians': 13,
    Galatians: 6,
    Ephesians: 6,
    Philippians: 4,
    Colossians: 4,
    '1 Thessalonians': 5,
    '2 Thessalonians': 3,
    '1 Timothy': 6,
    '2 Timothy': 4,
    Titus: 3,
    Philemon: 1,
    Hebrews: 13,
    James: 5,
    '1 Peter': 5,
    '2 Peter': 3,
    '1 John': 5,
    '2 John': 1,
    '3 John': 1,
    Jude: 1,
    Revelation: 22,
  };

  Object.keys(chaptersPerBook).forEach((book) => {
    const option = document.createElement('option');
    option.value = book;
    option.textContent = book;
    bookSelect.appendChild(option);
  });

  const oldTestamentLabel = document.createElement('optgroup');
  oldTestamentLabel.label = 'Old Testament';
  bookSelect.insertBefore(oldTestamentLabel, bookSelect.firstChild);

  const newTestamentLabel = document.createElement('optgroup');
  newTestamentLabel.label = 'New Testament';
  bookSelect.insertBefore(newTestamentLabel, bookSelect.children[40]);

  function updateChapters() {
    const selectedBook = bookSelect.value;
    const chapters = chaptersPerBook[selectedBook];
    chapterSelect.innerHTML = '';
    for (let i = 1; i <= chapters; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      chapterSelect.appendChild(option);
    }
    loadVerses();
  }

  bookSelect.addEventListener('change', updateChapters);
  chapterSelect.addEventListener('change', loadVerses);
  translationSelect1.addEventListener('change', loadVerses);
  translationSelect2.addEventListener('change', loadVerses);

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  if (bookName && chapterNumber) {
    bookSelect.value = bookName;
    updateChapters();
    chapterSelect.value = chapterNumber;
    translationSelect2.value = 'KJV';
    loadVerses();
  } else {
    bookSelect.value = 'Genesis';
    translationSelect2.value = 'KJV';
    updateChapters();
    loadVerses();
  }

  if (verseNumber) {
    const verseElement1 = document.querySelector(`.verse-${verseNumber}`);
    const verseElement2 = document.querySelector(`.verse-${verseNumber}`);
    if (verseElement1) {
      verseElement1.scrollIntoView({ behavior: 'smooth' });
    }
    if (verseElement2) {
      verseElement2.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

async function loadVerses() {
  const bookSelect = document.getElementById('book-select');
  const chapterSelect = document.getElementById('chapter-select');
  const translationSelect1 = document.getElementById('translation-select1');
  const translationSelect2 = document.getElementById('translation-select2');
  const versesContainer1 = document.getElementById('verses-container1');
  const versesContainer2 = document.getElementById('verses-container2');

  fetchAndDisplayVerses(
    bookSelect.value,
    chapterSelect.value,
    translationSelect1.value,
    versesContainer1
  );
  fetchAndDisplayVerses(
    bookSelect.value,
    chapterSelect.value,
    translationSelect2.value,
    versesContainer2
  );
}

async function fetchAndDisplayVerses(
  book,
  chapter,
  translation,
  versesContainer
) {
  try {
    const response = await fetch('/get-chapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookName: book,
        chapter: chapter,
        translation: translation,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      versesContainer.innerHTML = `<h2>${translation}</h2>`;
      data.forEach((verse, index) => {
        const verseElement = document.createElement('div');
        verseElement.classList.add(`verse-${index + 1}`);
        verseElement.innerHTML = `<p class="verse-text"><b style="color:#4caf50">${chapter}:${
          index + 1
        }</b> ${verse}</p>`;
        versesContainer.appendChild(verseElement);
      });
    } else {
      throw new Error('Failed to fetch verses');
    }
  } catch (error) {
    console.error(error);
    versesContainer.innerHTML = '<p>Error loading verses.</p>';
  }
}

function changeChapter(step) {
  const chapterSelect = document.getElementById('chapter-select');
  const currentChapter = parseInt(chapterSelect.value);
  const totalChapters = chapterSelect.options.length;
  const newChapter = currentChapter + step;

  if (newChapter >= 1 && newChapter <= totalChapters) {
    chapterSelect.value = newChapter;
    loadVerses();
  }
}
