var React = require("react");
var helpers = require('../utils/helpers');

var Query = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      date: "",
      url: "",
      results: [],
      savedArticles: []
    }
  },

  save: function(result, event) {
    event.preventDefault();
    helpers.postSaved(result.headline.main, result.pub_date, result.web_url)
      .then(function(data) {
      }.bind(this));
    console.log(" SAVE BUTTON " + result.headline.main, result.pub_date, result.web_url);
  },

  componentWillReceiveProps: function(nextProps){
    var myResults = nextProps.results.map(function(search, i){
      return (
       <div className="list-group-item" key={i}><a href={search.web_url} target="_blank">{search.headline.main}</a><br />{search.pub_date}<br /><button type="button" className="btn btn-warning" style={{'float': 'right', 'marginTop': '-39px'}} onClick={this.save.bind(this, search)}>Save</button></div>
    )
    }.bind(this));

    this.setState({results: myResults});
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">
        <br />
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Search Results</strong></h3>
          </div>
          <div className="panel-body" id="well-section">
          {this.state.results}
          </div>
        </div>
        </div>
      </div>
    );
  }
});

module.exports = Query;