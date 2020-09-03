// Copyright (c) 2016-present, Ken Hibino
// See https://kenny-hibino.github.io/react-places-autocomplete
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Input, PlaceSuggestion } from "./styles";

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
        console.log("Success", latLng);
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
              { loading && <FontAwesomeIcon icon={faSpinner} size="2x" /> }
              { suggestions.map((suggestion) => {
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
                      style
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
