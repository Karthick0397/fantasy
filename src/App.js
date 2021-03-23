import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from'react-router-dom'
import { MatchList, TeamSelect } from './Components/TeamSelection'
import About from './about'
import Nav from './nav'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={MatchList} />
            <Route path="/Squad/:id" exact component={TeamSelect} />
            <Route path="/about" component={About} />
          </Switch>
        </div>  
      </Router>
      {/* <Fantasy /> */}
    </div>
  );
}

export default App;
