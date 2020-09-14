import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input, PlaceSuggestion } from "./styles";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ address: address, ...latLng });
        this.props.setPlace(this.state);
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <React.Fragment>
            <Input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <FontAwesomeIconComponent chosenIcon={"faSpinner"} size="2x" />}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <PlaceSuggestion
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.index}
                  >
                    <span>{suggestion.description}</span>
                  </PlaceSuggestion>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;

// Copyright (c) 2016-present, Ken Hibino
// See https://kenny-hibino.github.io/react-places-autocomplete
