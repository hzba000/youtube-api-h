const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  
    const query = {
    key: "AIzaSyDugJKdQUUz5eiD3aWn9_5pL8ybtaKDPno",
    part: "snippet",
    q: `${searchTerm} in:name`,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div class="result-container">

        <div class="pic-container">
            <p> <a href = "https://www.youtube.com/watch?v=${result.id.videoId}"><img src= "${result.snippet.thumbnails.medium.url}"></a> </p>
        </div>

        <div class="description-container">
            <p class="result-title"><a href = "https://www.youtube.com/watch?v=${result.id.videoId}"> ${result.snippet.title}</a> </p>
            <p class="result-description"> ${result.snippet.description} </p>
            <p> Looking for more? Check out this <a href = "https://www.youtube.com/channel/${result.snippet.channelId}">channel</a> 
        </div>
    </div>`
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);

  });
}

// function nextButton(){
//     $('.next-button').on('click', function(){
//         $('.js-search-results').html('');
//     })
// }

$(watchSubmit);
