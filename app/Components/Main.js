var React = require("react");
var helpers = require('../utils/helpers');
var axios = require('axios');

var Search = require('./Search');
var Query = require('./Query');
var Saved = require('./Saved');

var Main = React.createClass({

	getInitialState: function() {
		return { 
			topic: "", 
			start: "", 
			end: "", 
			results: [], 
			savedArticles: []
		}
	},

	setParent: function(topic, start, end) {
		this.setState({
			topic: topic,
			start: start,
			end: end
		});
	},

	saveArticle: function(title, date, url) {
		helpers.postArticle(title, date, url);
		this.getArticle();
	},

	deleteArticle: function(id){
		console.log("DEL ART METHOD " + id);
		axios.delete('/api/saved/' + id)
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));

		this.getArticle();
	},

	getArticle: function(){
		axios.get('/api/saved')
			.then(function(response) {
				this.setState({ savedArticles: response.data});

			}.bind(this));
	},

	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.topic != prevState.topic) {
		helpers.runQuery(this.state.topic, this.state.start, this.state.end)
      		.then(function(data) {
        		this.setState({ results: data});
      }.bind(this));
      }
	},

	componentDidMount: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},
	
	render: function() {
		return(
			<div className="container">
				<div className="container">
					<div className="jumbotron">
						<h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i>  NYT (an exercise in React)</strong></h1>
					</div>
				</div>
				<Search setParent={this.setParent} />
				<Query results={this.state.results} savedArticle={this.savedArticle}/>
				<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
			</div>
			
			
		)
	}
});
module.exports = Main;