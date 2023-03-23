import React, { createContext, Component } from "react";
import axios from "axios";

export const NewsContext = createContext();

export class NewsContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      searchQuery: "Apple",
    };
    this.apiKey = "d3a68d3a93a54948a016a1553bc4d20c";
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchData();
    }
  }

  fetchData = () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${this.state.searchQuery}&from=2023-02-28&sortBy=popularity&apiKey=${this.apiKey}`
      )
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => console.log(error));
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <NewsContext.Provider
        value={{ data: this.state.data, handleSearch: this.handleSearch }}
      >
        {this.props.children}
      </NewsContext.Provider>
    );
  }
}

export default NewsContextProvider;