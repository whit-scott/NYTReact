
var React = require("react");
var test = "test";
var helpers = require('../utils/helpers');

var Saved = React.createClass({

  getInitialState: function() {
    return {
      savedArticles: []
    }
  },
  delete: function(result, event){
    event.preventDefault();
    helpers.deleteSaved(result.title, result.date, result.url).then(function() {
      helpers.getSaved().then(function(articleData) {
        this.setState({ savedArticles: articleData.data });
        console.log("saved results", articleData.data);
      }.bind(this));
    }.bind(this));
  },

  componentWillReceiveProps: function(nextProps) {
    var myResults = nextProps.savedArticles.map(function(search, i){
      return (
       <div className="list-group-item" key={i}><a href={search.url} target="_blank">{search.title}</a><br />{search.date.toString()}<br /><button type="button" className="btn btn-success" style={{'float': 'right', 'marginTop': '-39px'}} onClick={this.delete.bind(this, search)}>Delete</button></div>
      )
    }.bind(this));

    this.setState({savedArticles: myResults});
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">
        <br />
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
          </div>
          <div className="panel-body" id="well-section">
          {this.state.savedArticles}
          </div>
        </div>
        </div>
      </div>
    )
  }
});

module.exports = Saved;