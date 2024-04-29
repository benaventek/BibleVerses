document.addEventListener('DOMContentLoaded', () => {
  const getRandomVerseBtn = document.getElementById('getRandomVerseBtn');
  const verseContainer = document.getElementById('verseContainer');
  const verseDropdown = document.getElementById('verseDropdown');
  const book = document.getElementById('book');
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  getRandomVerseBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/get-random-verse', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        verseContainer.textContent = `${data.verse}`;
        book.textContent = `${data.book.name} ${data.chapterId}:${data.verseId} NIV`;
        verseDropdown.selectedIndex = 0;
      } else {
        throw new Error('Failed to fetch verse');
      }
    } catch (error) {
      console.error(error);
    }
  });
  verseDropdown.addEventListener('change', async (event) => {
    const selectedVerse = event.target.value;
    const response = await fetch('/get-verse', {
      method: 'POST',
      body: JSON.stringify({ verse: selectedVerse }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      verseContainer.textContent = `${data.verse}`;
      book.textContent = `${data.book.name} ${data.chapterId}:${data.verseId} NIV`;
    } else {
      throw new Error('Failed to fetch verse');
    }
  });

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
});
