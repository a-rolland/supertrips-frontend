import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { MapContainer } from "./styles"

export class Map extends Component {
    constructor(props) {
        super(props)
        this.state={
            name: this.props.address,
            lat: this.props.lat,
            lng: this.props.lng,
            zoom: this.props.zoom,
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

        const zoom = parseInt(this.state.zoom)

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
            <MapContainer height={this.props.height} width={this.props.width}>
                <GoogleMapReact 
                    key={this.state.name}
                //   bootstrapURLKeys={ { key: 'YOURKEYHERE'} }
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={getMapOptions}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                />
            </MapContainer>
        )
    }
}

export default Map