$(document).ready(function() {
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", "scrape-new", handleArticleScrape);

  //when page is read, initPage function runs
  initPage();

  function initPage() {
    // empty the article container, run an ajax request for unsaved headlines
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(function(data) {
      // hif there are headlines they will be rendered on the page
      if (data && data.length) {
        renderArticles(data);
      } else {
        // if no headlines, a message will render with no articles
        renderEmpty();
      }
    });
  }

  // function to append html containing article data to the page
  function renderArticles(articles) {
    var articlePanels = [];

    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    // append to articlePanels container once they are stored in articlePanels array
    articleContainer.append(articlePanels);
  }

  // takes single json object for an article/headline, constructs jquery element containing all of the formatted html. uses bootstrap styling
  function createPanel(article) {
    var panel = $(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );
    // attaches articles id to the jquery element
    // this will be used when trying to figure out which artice the user wants to save
    panel.data("_id", article._id);
    //   return the constructed panel jQuery element
    return panel;
  }
//   renders html explaining that there are no articles to view. uses joined array of html string to make it easier to read/change than concatenated string
  function renderEmpty() {
    var emptyAlert = $(["<div class='alert alert-warning text-center'>",
     "<h4>Sorry, no new Articles.</h4>",
    "</div>",
    "<div class='panel panel-default'>",
    "<div class='panel-heading text-center'>",
    "<h3>What would you like to do?</h3>",
    "</div>",
    "<div class='panel-body text-center'>",
    "<h4><a class='scrape-new>Try Scraping new Articles</a></h4>",
    "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
    "</div>",
    "</div>"].join(""));
    articleContainer.append(emptyAlert)
  }
// this function is called when user wants to save an article
// when the article is rendered initially, we attached a javascript object containing the headline id
// to the element using the .data method. its retrieved here
  function handleArticleSave(){

    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;

    $.ajax({
        method: "PATCH",
        url: "/api/headlines",
        data: articleToSave

        // if succesful mongoose will send back on object containin a key of "ok" value of 1 which is true
    })
    .then(function(data){
        if(data.ok){
         // run the initPage function again. reload entire list of articles
            initPage()
        }
    });
  }

  function handleArticleScrape(){
      $.get("/api/fetch")
      .then(function(data){
        initPage();
        // if succesfully scraped articles compare the articles to those already in collection, re render the articles on the page
    alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
      })
  }
});
