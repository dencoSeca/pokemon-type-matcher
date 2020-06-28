import React from 'react';
import PokemonStats from './PokemonStats';

export default class SearchField extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      buttonText: '',
      pokemon: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const url = `https://pokeapi.co/api/v2/pokemon/${this.state.query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        pokemon: data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  handleChange(e) {
    if (e.target.value) {
      const term = e.target.value;
      const capitalizedTerm = term[0].toUpperCase() + term.slice(1);

      this.setState({
        query: term,
        buttonText: capitalizedTerm,
      });
    } else {
      this.setState({
        query: '',
        buttonText: '',
      });
    }
  }

  render() {
    return (
      <div className="pokemon-column">
        <form className="search-field" onSubmit={this.handleSubmit}>
          <label className="search-field--label" htmlFor="searchField">
            Pick a Pokemon
          </label>
          <input
            className="search-field--input"
            type="text"
            name="query"
            placeholder="e.g. Scyther"
            value={this.state.query}
            onChange={this.handleChange}
          ></input>
          <button className="search-field--button" type="submit">
            {this.state.buttonText}
            {this.state.buttonText === '' ? '' : '...'} I Choose You!
          </button>
        </form>
        <PokemonStats pokemon={this.state.pokemon} />
      </div>
    );
  }
}
