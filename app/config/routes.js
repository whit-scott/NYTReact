var React = require("react");

var router = require("react-router");

var Route = router.Route;

var Router = router.Router;

var hashHistory = router.hashHistory;

var IndexRoute = router.IndexRoute;

var Main = require("../Components/Main");
var Saved = require("../Components/Saved");
var Search = require("../Components/Search");

module.exports = (
<Router>
    <Route path="/" component={Main}>
    	<Route path="/saved" component={Saved} />
    	<Route path="/search" component={Search} />
    	</Route>
</Router>
);
