import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filterMonsters, setFilterMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilterdMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilterdMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLowerCase();

    setSearchField(searchFieldString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monster'
      />

      <CardList monsters={filterMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => res.json())
//   .then((users) =>
//     this.setState(
//       () => {
//         return { monsters: users };
//       },
//       () => {
//         // console.log(this.state);
//       }
//     )
//   );
//   }

// onSearchChange = (e) => {
//   const searchField = e.target.value.toLowerCase();

//   this.setState(() => {
//     return { searchField };
//   });
// };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

// const filterdMonsters = monsters.filter((monster) => {
//   return monster.name.toLowerCase().includes(searchField);
// });

//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>

//         <SearchBox
//           className='monsters-search-box'
//           onChangeHandler={onSearchChange}
//           placeholder='search monster'
//         />

//         <CardList monsters={filterdMonsters} />
//       </div>
//     );
//   }
// }

export default App;
