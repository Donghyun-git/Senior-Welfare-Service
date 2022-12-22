let news = [];
let page = 1;
let total_pages = 0;
let url;
let keyword = "노인";


const getNews = async () => {
  try {
    let header = new Headers({
      'x-api-key': 'Qkappbw2g6rNrOFicEIPF28pv874hV1X6BW3B-oRwe0'
    });

    url.searchParams.set('page', page); 

    let response = await fetch(url, {
      headers: header
    }) 
    let data = await response.json()
    console.log(response)
    console.log(data)
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("No match new here!")
      }
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;
      console.log(news)
      render();
      pagination();
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.log(error.message);
    errorRender(error.message);
  }
}

const getLatestNews = async () => { 

    url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}' &countries=KR&page_size=10`
  );
  getNews();
};

getLatestNews();


const getNewsByTopic = async (event) => {
  console.log("클릭됨", event.target.textContent);
  let topic = event.target.textContent.toLowerCase();
  url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);
  getNews();
};


const render = () => {
  let resultHTML = '';

  resultHTML = news.map((item) => {

    return `<div class="row news">
                <div class="col-lg-4">
                <img src="${item.media == null || item.media == "" ? "img/none-img.jpg" : item.media}">
                </div>
                <div class="col-lg-8">
                    <a href="${item.link}"><h2>${item.title}</h2></a>
                    <p>
                    ${item.summary == null || item.summary == "" ? "내용없음" : item.summary > 200 ? item.summary.substring(0,200) + "..." : item.summary}
                    </p>
                    <div>
                    <span>출처 -</span> <strong>${item.rights == null || item.rights == "" ? "no source" : item.rights}</strong> <br>
                    ${item.published_date || "no source"} <br>
                    ${moment(item.published_date).fromNow()}
                    </div>
                </div>
                </div>`;
  }).join('');

  document.getElementById("section").innerHTML = resultHTML;
};

const errorRender = (message) => {
  let errorHTML = '';
  errorHTML = `<div class="alert alert-danger" role="alert">
    ${message}
</div>`
  document.getElementById("section").innerHTML = errorHTML;
}

const pagination = () => {
    let paginationHTML = `<li>
    <a href="#" onclick="movePage(${page-1})" aria-label="Previous">
      <span aria-hidden="true">&lt;</span>
    </a>
</li>`;

    
    let pageGroup = Math.ceil(page/5);

   
    let last = pageGroup * 5;

 
    let first = last - 4;


  

    for(let i=first; i<=last; i++){
      paginationHTML += `
      <li class="page-item ${page==i?"active": ""}"><a class="page-link" onclick="movePage(${i})">${i}</a></li>`
    }

      paginationHTML += `<li>
      <a href="#" onclick="movePage(${page+1})" aria-label="Next">
        <span aria-hidden="true">&gt;</span>
      </a>
  </li>`;

    document.querySelector(".pagination").innerHTML = paginationHTML;

};

const movePage = (pageNum) => {
  page = pageNum;
  
  getNews();
}


