import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../Image-Results/ImageResults';

const items = [
  <MenuItem key={5} value={5} primaryText="5" />,
  <MenuItem key={10} value={10} primaryText="10" />,
  <MenuItem key={15} value={15} primaryText="15" />,
  <MenuItem key={30} value={30} primaryText="30" />,
  <MenuItem key={50} value={50} primaryText="50" />,
];

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      amount: 15,
      apiURL: 'https://pixabay.com/api',
      apiKey: '8920792-ba9909a37bec97f2c531e23d2',
      images: [],
    };
  }

  onTextChange = e => {
    const val = e.target.value;
    this.setState(
      {
        [e.target.name]: val,
      },
      () => {
        const { apiURL, apiKey, searchText, amount } = this.state;
        if (val === '') {
          this.setState({ images: [] });
        } else {
          axios
            .get(`${apiURL}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`)
            .then(res => this.setState({ images: res.data.hits }))
            .catch(err => console.log(err));
        }
      }
    );
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };

  render() {
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth
        />
        <br />
        <SelectField
          name="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
          floatingLabelText="Amount"
          floatingLabelFixed
        >
          {items}
        </SelectField>
        <br />
        {this.state.images.length > 0 ? <ImageResults images={this.state.images} /> : null}
      </div>
    );
  }
}

export default Search;
