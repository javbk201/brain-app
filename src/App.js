
import React, { Component } from 'react';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import SingIn from './Components/SingIn/SingIn';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles:{
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
}

const initialState = {
  input: '',
  imagURL: '',
  box: {},
  route: 'singin',
  isSingedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
      console.log(data);
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        topRow: clarifaiFace.top_row * height,
        leftCol: clarifaiFace.left_col * width,
        bottomRow: height - (clarifaiFace.bottom_row * height),
        rightCol: width - (clarifaiFace.right_col * width)
      }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onButtonSumit = () => {
  this.setState({imagURL: this.state.input});
    fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })

      }
      console.log(response);
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}

  onRouteChange = (route) => {
    if (route === 'singout') {
      this.setState(initialState)
    }else if (route === 'home') {
      this.setState({isSingedIn: true})
    }
      this.setState({route: route});
  }

  render(){
    const { isSingedIn, imagURL, route, box } = this.state
    return (
      <div className="App">
        <Particles className='particles'
                  params={particlesOptions}
        />
      <Navigation isSingedIn={ isSingedIn } onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange = {this.onInputChange}
                onButtonSumit = {this.onButtonSumit}
              />
              <FaceRecognition box={box} imagURL={imagURL} />
            </div>
          : (
            route === 'singin'
            ? <SingIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}></SingIn>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
      }
      </div>
    );
  }
}

export default App;
