document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestionsList = document.getElementById('suggestions-list');
  
    searchInput.addEventListener('input', async () => {
      const query = searchInput.value;
  
      if (query.length > 0) {
        const response = await fetch(`/suggestions?q=${query}`);
        const suggestions = await response.json();
  
        // 기존 추천 목록 초기화
        suggestionsList.innerHTML = '';
  
        // 검색어 추천 목록 추가
        suggestions.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          listItem.addEventListener('click', () => {
            searchInput.value = item;
            suggestionsList.innerHTML = ''; 
          });
          suggestionsList.appendChild(listItem);
        });
      } else {
        suggestionsList.innerHTML = ''; 
      }
    });
  });
  