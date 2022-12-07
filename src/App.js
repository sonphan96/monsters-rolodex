import { Component } from "react";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };

    console.log("Constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onSearchChange = (e) => {
    const searchField = e.target.value.toLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    console.log("Render");

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filterdMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className='App'>
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={(e) => onSearchChange(e)}
        />
        {filterdMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
