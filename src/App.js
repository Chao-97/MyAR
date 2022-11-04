import React from 'react';
import 'mind-ar/dist/mindar-image.prod.js';
// import "mind-ar/src/image-target/aframe"
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
// import "mind-ar/src/image-target/index"
import './App.css';
import MindARViewer from './mindar-viewer';
import MindJiaoHu from './mindjiaohu';

// var camreass=[];
var camreass=[];
var a = 0;
const _initSourceWebcam = ()=> {
  camreass=[];
  a=a+1;
  if(a === 2){
    // console.log(a);
    camreass=[];
      navigator.mediaDevices.enumerateDevices().then(function (devices) {

      devices.forEach(function(e){
          //  console.log(e)
          if(e.kind === "videoinput")
          {
              camreass.push(e.deviceId)
          }
        })
     console.log(camreass)

   })
   a=0;
  }
  


 }
class App extends React.Component {
  constructor() {
    super();
    this.state = {started:false};
    _initSourceWebcam();
  }
  // const [started, setStarted] = useState(false);
  

render(){
  return (
    <div className="App">
      {/* <h1>Example React component with <a href="https://github.com/hiukim/mind-ar-js" target="_blank">MindAR</a></h1> */}

      <div>
	{!this.state.started && <button onClick={() => {
    // setStarted(true)
    this.setState({started : true});
    }}>Start</button>}
	{this.state.started && <button onClick={() => {
    // setStarted(false)
    this.setState({started : false});
    }}>Stop</button>}
      </div>

      {this.state.started && (
	<div className="container">
	  <MindARViewer camreass={camreass}/>
	  {/* <MindJiaoHu camreass={camreass}/> */}

	  {/* <video></video> */}
	</div>
      )}
    </div>
  );
  }
}
  

export default App;
