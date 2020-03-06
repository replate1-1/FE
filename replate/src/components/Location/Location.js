/* global google */
import React, { Component, createRef } from 'react';
import {compose, withProps, withState, lifecycle} from 'recompose';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, } from 'react-google-maps';
import {Car} from '../../imgs/Car.png';
import PickUp from '../../imgs/Pickup.png';

const dest = {
    lat: 42.883620, 
    lng: -77.277944 
}

const mapStyles= [ 
        {elementType: 'geometry', stylers: [{color: '#2E2F33'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#8B8E97'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#8B8E97'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]

const MyMapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wJdNOQ1i66CdqV60zF-NxSo4xNnAuMs&callback=initMap",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `800px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap,
        lifecycle({
            componentDidMount(){
                console.log(this.props);
                const DirectionsService = new google.maps.DirectionsService();
                DirectionsService.route({
                    origin: isNaN(this.props.state.lat) ? this.props.state[0] : new google.maps.LatLng(this.props.state[0]),
                    destination: new google.maps.LatLng(dest),
                    travelMode: google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if(status === google.maps.DirectionsStatus.OK){
                        console.log(result);
                        /*var leg = response.routes[0].legs[0];
                        makeMarker(leg.start_location, Car, "title", map);
                        makeMarker(leg.end_location, PickUp, 'title', map);*/
                        this.props.setState(result.routes[0].overview_path)
                        this.setState({
                          directions: result,
                          center: result.routes[0].overview_path[0]
                        });
                      } else {
                        console.error(`error fetching directions ${result}`);
                      }
                    });
                  }
            })
        )(props =>
        <div>
            <GoogleMap
                defaultZoom={10}
                defaultCenter={props.center}
                options={{ styles: mapStyles, disableDefaultUI: true }}
            >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>
        </div> 
)

class myMap extends React.Component {
    state = {
        isMarkerShown: false,
        center: this.props.points[0],
        points: [],
        time: Date.now(),
        prev: ''
    }

    delayedShowMarker = () => {
      setTimeout(() => {
        this.setState({ isMarkerShown: true })
      }, 3000)
    }
  
    handleMarkerClick = () => {
      this.setState({ isMarkerShown: false })
      this.delayedShowMarker()
    }
    
      render() {
        return (
          <>
          <MyMapComponent
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            state={this.props.points}
            setState={this.props.setPoints.bind(this)}
          />
          </>
        )
      }
}

export default myMap;


    /*
    state = {
        center: {
            lat: 42.897252,
            lng: -77.274405
        },
        zoom: 16
    };
    
    componentDidMount(){
        const googleScript = document.createElement('script')
        googleScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wJdNOQ1i66CdqV60zF-NxSo4xNnAuMs&callback=initMap'
        window.document.body.appendChild(googleScript);
        googleScript.addEventListener('load', () => {
            this.googleMap = this.createGoogleMap();
            this.marker = this.createMarker();
            //this.directionsRenderer = new window.google.maps.DirectionsService();
            //this.directionsService = new window.google.maps.DirectionsRenderer();
            //console.log(this.directionsRenderer);
            this.start = new window.google.maps.LatLng(this.state.center.lat, this.state.center.lng);
            this.end = new window.google.maps.LatLng(43.216964, -77.954672)
            console.log(this.start);
            console.log(this.end);
        })
        //this.initDirections(this.directionsService, this.directionsRenderer, this.googleMap);
    }

    initDirections = (directionsService, directionsRenderer, map) =>{
        console.log(directionsRenderer);
        directionsRenderer.setMap(map);
        this.calculateAndDisplayRoute(directionsService, directionsRenderer);
    }

    calculateAndDisplayRoute(directionsService, directionsRenderer) {
        console.log('hey');
        directionsService.route(
            {
              origin: this.start,
              destination: this.end,
              travelMode: 'DRIVING'
            },
            function(response, status) {
              if (status === 'OK') {
                directionsRenderer.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
      }


    createGoogleMap = () => 
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: this.state.zoom,
      center: this.state.center,
      disableDefaultUI: true,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#7e90ab'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#7e90ab'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });

    createMarker = () =>
    new window.google.maps.Marker({
      position: this.state.center,
      map: this.googleMap,
    })


    render() {
        return (
            <div 
                id='google-map'
                ref={this.googleMapRef}
                style={{width: '100%', height: '76vh'}}
            />
        );
    }*/