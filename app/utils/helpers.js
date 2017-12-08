var axios = require("axios");

var helper = {
//
  runQuery: function(topic, start, end) {
    console.log(" START YR " + start);
    var apiKey = "b4e9aabafb0342b4861101c50951d35b";
    var searchTopic = topic.trim();
    var startYear = start.trim() + "0101";
    var endYear = end.trim() + "1231";

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + searchTopic + "&begin_date=" + startYear + "&end_date=" + endYear;
          console.log(" QEUR URL " + queryURL)

    return axios.get(queryURL, {
    }).then(function(response) {
      return response.data.response.docs;
    });
  },

  getSaved: function() {
    return axios.get("/api/saved")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },

  postSaved: function(title, date, url) {
    var newArticle = {title: title, date: date, url: url};
    return axios.post('/api/saved', newArticle)
      .then(function(results) {
        console.log("MongoDB saved");
        return results._id;
      });
  },

  deleteSaved: function(title, datd, url) {
    return axios.delete("/api/saved", {
      params: {
        "title": title,
        "datd": datd,
        "url": url
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  }

};

module.exports = helper;