import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

export class Map extends Component {
    constructor(props) {
        super(props)
        this.state={
            name: this.props.address,
            lat: this.props.lat,
            lng: this.props.lng,
            showMap: false
        }
    }

    // toggleMap = () => {
    //     this.setState(state => ({
    //         ...state,
    //         showMap: !this.state.showMap
    //     }))
    // }

    render() {

        const center = {
            lat: this.state.lat,
            lng: this.state.lng
        }

        const zoom = 14

        const getMapOptions = (maps) => {
            return {
                disableDefaultUI: false,
                mapTypeControl: true,
                streetViewControl: true,
                styles: [{ featureType: 'poi', 
                    elementType: 'labels', 
                    stylers: [{ visibility: 'on' }] }],
                }
        }

        const renderMarkers = (map, maps) => {

            const position = {
                lat: this.state.lat,
                lng: this.state.lng
            }

            let marker = new maps.Marker({
                position: position,
                map,
            })
        }

        return (
            <div>
              <div className="mapa mx-auto" style={this.props.detailsStyle || {height:"200px",width:"300px"}}>
                  <GoogleMapReact 
                      key={this.state.name}
                      bootstrapURLKeys={ { key: 'AIzaSyC5R2OYlhvGRMmpofdkJ0jL60Tsa7dtZUY'} }
                      defaultCenter={center}
                      defaultZoom={zoom}
                      options={getMapOptions}
                      yesIWantToUseGoogleMapApiInternals
                      onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                  />
              </div>
            </div>    
        )
    }
}

export default Map