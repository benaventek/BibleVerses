document.addEventListener('DOMContentLoaded', () => {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('results');
  const resultsFor = document.getElementById('results-for');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    document.querySelector('.verses-container').style.display = 'block';
    const keyword = searchInput.value;
    resultsFor.innerHTML = `<h2>Results for "${keyword}": </h2>`;
    try {
      const response = await fetch('/get-search-results', {
        method: 'POST',
        body: JSON.stringify({ keyword: keyword }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        resultsDiv.innerHTML = '';
        if (data.items && data.items.length) {
          data.items.forEach((result) => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('searchresult');

            const resultTitle = document.createElement('b');
            const resultVerse = document.createElement('p');
            const resultTestament = document.createElement('i');

            resultTitle.innerHTML = `<a href="/chapters?book=${encodeURIComponent(
              result.book.name
            )}&chapter=${result.chapterId}&verse=${result.verseId}">${
              result.book.name
            } ${result.chapterId}:${result.verseId}`;
            resultTestament.textContent = result.book.testament;
            resultVerse.innerHTML = result.verse;

            resultDiv.appendChild(resultTitle);
            resultDiv.appendChild(document.createTextNode(' - '));
            resultDiv.appendChild(resultTestament);
            resultDiv.appendChild(document.createElement('br'));
            resultDiv.appendChild(resultVerse);

            resultsDiv.appendChild(resultDiv);
          });
        } else {
          resultsDiv.textContent = 'No results found';
        }
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      console.error(error);
      resultsDiv.textContent = 'Error fetching results';
    }
  });
});
