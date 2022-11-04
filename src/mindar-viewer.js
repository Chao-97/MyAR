import React, { useEffect, useRef } from 'react';
import 'aframe';
//  import {BMap} from 'react-bmapgl';


// 获取定位数据
var getLocation = function (successFunc, errorFunc) { //successFunc获取定位成功回调函数，errorFunc获取定位失败回调
 
  //首先设置默认城市
  var defCity = {
      id: '000001',
      name: '北京市',
      date: new Date()//获取当前时间方法
  };
  //默认城市
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          //var map = new BMap.Map("container");   // 创建Map实例
          var point = new BMap.Point(lon, lat); // 创建点坐标
          var gc = new BMap.Geocoder();
          gc.getLocation(point, function (rs) {
              var addComp = rs.addressComponents;
              var curCity = {
                  id: '',
                  name: addComp.province,
                  date: new Date()
              };
              //当前定位城市
              console.log("curCity:",curCity);

              // $.cookie('VP_MOBILE_CURRENTCITY', JSON.stringify(curCity), { expires: 7, path: '/' });
              //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street);
              if (successFunc != undefined)
                  successFunc(addComp);
          });
      },
      function (error) {
          switch (error.code) {
              case 1:
                  alert("位置服务被拒绝。");
                  break;
              case 2:
                  alert("暂时获取不到位置信息。");
                  break;
              case 3:
                  alert("获取位置信息超时。");
                  break;
              default:
                  alert("未知错误。");
                  break;
          }
          var curCity = {
              id: '000001',
              name: '北京市',
              date: new Date()
          };
          //默认城市
           console.log("curCity:",curCity);

          // $.cookie('VP_MOBILE_DEFAULTCITY', JSON.stringify(curCity), { expires: 1, path: '/' });
          if (errorFunc != undefined)
              errorFunc(error);
      }, { timeout: 5000, enableHighAccuracy: true });
  } else {
      alert("你的浏览器不支持获取地理位置信息。");
      if (errorFunc != undefined)
          errorFunc("你的浏览器不支持获取地理位置信息。");
  }
};
// 显示地图位置
var showPosition = function (position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  //var map = new BMap.Map("container");   // 创建Map实例
  var point = new BMap.Point(lon, lat); // 创建点坐标
  var gc = new BMap.Geocoder();
  gc.getLocation(point, function (rs) {
      var addComp = rs.addressComponents;
      var curCity = {
          id: '',
          name: addComp.province,
          date: new Date()
      };
      console.log("curCity:",curCity);
      //当前定位城市
      // $.cookie('VP_MOBILE_CURRENTCITY', JSON.stringify(curCity), { expires: 7, path: '/' });
      //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street);
  });
};
// 显示定位错误
var showPositionError = function (error) {
  switch (error.code) {
      case 1:
          alert("位置服务被拒绝。");
          break;
      case 2:
          alert("暂时获取不到位置信息。");
          break;
      case 3:
          alert("获取位置信息超时。");
          break;
      default:
          alert("未知错误。");
          break;
  }
  var curCity = {
      id: '000001',
      name: '北京市',
      date: new Date()
  };
  //默认城市
    console.log("curCity:",curCity);

  // $.cookie('VP_MOBILE_DEFAULTCITY', JSON.stringify(curCity), { expires: 1, path: '/' });
};


export default (props) => {
  const sceneRef = useRef(null);
  const elRef = useRef(null);
  const proBt = useRef(null);
  const webBt = useRef(null);
  const emailBt = useRef(null);
  const locBt = useRef(null);
  const textRef = useRef(null);

  const camreass = props.camreass;
  useEffect(() => {
      const element = elRef.current;
      const length = camreass.length;
      const sceneEl = sceneRef.current;
      const arSystem = sceneEl.systems["mindar-image-system"];
      sceneEl.addEventListener('renderstart', () => {
        arSystem.start(camreass[length-1]); // start AR 
        console.log(length);
      });
      element.addEventListener('targetFound', event => {
        console.log("target found");
        showAvatar(() => {
          setTimeout(() => {
            showPortfolio(() => {
              setTimeout(() => {
                showInfo();
              }, 300);
            });
          }, 300);
        });
      });
      element.addEventListener('targetLost', event => {
        console.log("target Lost");
      });
      return () => {
        arSystem.stop();
      }
  }, []);

  const showInfo = () => {
    let y = 0;
    const profileButton = proBt.current
    const webButton = webBt.current
    const emailButton = emailBt.current
    const locationButton = locBt.current
    const text = textRef.current;
  
    profileButton.setAttribute("visible", true);
    setTimeout(() => {
      webButton.setAttribute("visible", true);
    }, 300);
    setTimeout(() => {
      emailButton.setAttribute("visible", true);
    }, 600);
    setTimeout(() => {
      locationButton.setAttribute("visible", true);
    }, 900);
  
    let currentTab = '';
    webButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "https://softmind.tech");
      currentTab = 'web';
    });
    emailButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "hello@softmind.tech");
      currentTab = 'email';
    });
    profileButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "AR, VR solutions and consultation");
      currentTab = 'profile';
    });
    locationButton.addEventListener('click', function (evt) {
      console.log("loc");
      getLocation(showPosition, showPositionError);
      text.setAttribute("value", "Vancouver, Canada | Hong Kong");
      currentTab = 'location';
    });
  
    text.addEventListener('click', function (evt) {
      if (currentTab === 'web') {
        window.location.href="https://softmind.tech";
      }
    });
  }
  
  const showPortfolio = (done) => {
    const portfolio = document.querySelector("#portfolio-panel");
    const portfolioLeftButton = document.querySelector("#portfolio-left-button");
    const portfolioRightButton = document.querySelector("#portfolio-right-button");
    const paintandquestPreviewButton = document.querySelector("#paintandquest-preview-button");
  
    let y = 0;
    let currentItem = 0;
  
    portfolio.setAttribute("visible", true);
  
    const showPortfolioItem = (item) => {
      for (let i = 0; i <= 2; i++) {
        document.querySelector("#portfolio-item" + i).setAttribute("visible", i === item);
      }
    }
    const id = setInterval(() => {
      y += 0.008;
      if (y >= 0.6) {
        clearInterval(id);
        portfolioLeftButton.setAttribute("visible", true);
        portfolioRightButton.setAttribute("visible", true);
        portfolioLeftButton.addEventListener('click', () => {
          currentItem = (currentItem + 1) % 3;
          showPortfolioItem(currentItem);
        });
        portfolioRightButton.addEventListener('click', () => {
          currentItem = (currentItem - 1 + 3) % 3;
          showPortfolioItem(currentItem);
        });
  
        paintandquestPreviewButton.addEventListener('click', () => {
          paintandquestPreviewButton.setAttribute("visible", false);
          const testVideo = document.createElement( "video" );
          const canplayWebm = testVideo.canPlayType( 'video/webm; codecs="vp8, vorbis"' );
          if (canplayWebm == "") {
            document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-mp4");
            document.querySelector("#paintandquest-video-mp4").play();
          } else {
            document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-webm");
            document.querySelector("#paintandquest-video-webm").play();
          }
        });
  
        setTimeout(() => {
          done();
        }, 500);
      }
      portfolio.setAttribute("position", "0 " + y + " -0.01");
    }, 10);
  }
  
  const showAvatar = (onDone) => {
    const avatar = document.querySelector("#avatar");
    let z = -0.3;
    const id = setInterval(() => {
      z += 0.008;
      if (z >= 0.3) {
        clearInterval(id);
        onDone();
      }
      avatar.setAttribute("position", "0 -0.25 " + z);
    }, 10);
  }

  return (
   
    <div className="example-container">
    <div id="example-scanning-overlay" className="hidden">
        <div className="inner">
            <img src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/card.png"/>
            <div className="scanline"></div>
        </div>
    </div>
    <a-scene 
        ref={sceneRef}
        inspector="url: https://cdn.jsdelivr.net/gh/aframevr/aframe-inspector@master/dist/aframe-inspector.min.js"
        mindar-image="imageTargetSrc: ./card-example/card.mind; autoStart: false;showStats: false; uiScanning: #example-scanning-overlay;" 
        embedded color-space="sRGB" 
        renderer="colorManagement: true, physicallyCorrectLights" 
        vr-mode-ui="enabled: false" 
        device-orientation-permission-ui="enabled: false" 
    >

    {/* <a-scene ref={sceneRef} mindar-image="imageTargetSrc: ./card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"> */}

      <a-assets>
          <img id="icon-web" src="./card-example/icons/web.png" />
          <img id="icon-location" src="./card-example/icons/location.png" />
          <img id="icon-profile" src="./card-example/icons/profile.png" />
          <img id="icon-phone" src="./card-example/icons/phone.png" />
          <img id="icon-email" src="./card-example/icons/email.png" />
          <img id="icon-play" src="./card-example/icons/play.png" />
          <img id="icon-left" src="./card-example/icons/left.png" />
          <img id="icon-right" src="./card-example/icons/right.png" />
          <img id="paintandquest-preview" src="./card-example/portfolio/paintandquest-preview.png" />
          <video id="paintandquest-video-mp4" autoPlay={false} loop={false} src="./card-example/portfolio/paintandquest.mp4"></video>
          <video id="paintandquest-video-webm" autoPlay={false} loop={false} src="./card-example/portfolio/paintandquest.webm"></video>
          <img id="coffeemachine-preview" src="./card-example/portfolio/coffeemachine-preview.png" />
          <img id="peak-preview" src="./card-example/portfolio/peak-preview.png" />
          
          <img id="card" src="./card-example/card.png" />
          <a-asset-item id="avatarModel" src="./card-example/softmind/scene.gltf"></a-asset-item>
	     
        {/* <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.png" /> */}
	      {/* <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item> */}
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;" raycaster="far: 10000; objects: .clickable">
      </a-camera>


      <a-entity id="mytarget"  ref={elRef}  mindar-image-target="targetIndex: 0">
	      <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
        <a-entity visible={false} id="portfolio-panel" position="0 0 -0.01">
          <a-text value="Portfolio" color="black" align="center" width="2" position="0 0.4 0"></a-text>
          <a-entity id="portfolio-item0">
                <a-video id="paintandquest-video-link" webkit-playsinline playsinline width="1" height="0.552" position="0 0 0"></a-video>
                <a-image id="paintandquest-preview-button" class="clickable" src="#paintandquest-preview" alpha-test="0.5" position="0 0 0" height="0.552" width="1">
                </a-image>
          </a-entity>
          <a-entity id="portfolio-item1" visible={false}>
              <a-image class="clickable" src="#coffeemachine-preview" alpha-test="0.5" position="0 0 0" height="0.552" width="1">
              </a-image>
          </a-entity>
          <a-entity id="portfolio-item2" visible={false}>
              <a-image class="clickable" src="#peak-preview" alpha-test="0.5" position="0 0 0" height="0.552" width="1">
              </a-image>
          </a-entity>
          <a-image visible={false} id="portfolio-left-button" class="clickable" src="#icon-left" position="-0.7 0 0" height="0.15" width="0.15"></a-image>
          <a-image visible={false} id="portfolio-right-button" class="clickable" src="#icon-right" position="0.7 0 0" height="0.15" width="0.15"></a-image>

        </a-entity>
        <a-image visible={false} id="profile-button" ref={proBt} class="clickable" src="#icon-profile" position="-0.42 -0.5 0" height="0.15" width="0.15"
            animation="property: scale; to: 1.2 1.2 1.2; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-image>

        <a-image visible={false} id="web-button" ref={webBt} class="clickable" src="#icon-web" alpha-test="0.5" position="-0.14 -0.5 0" height="0.15" width="0.15"
            animation="property: scale; to: 1.2 1.2 1.2; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-image>

        <a-image visible={false} id="email-button" ref={emailBt} class="clickable" src="#icon-email"  position="0.14 -0.5 0" height="0.15" width="0.15"
            animation="property: scale; to: 1.2 1.2 1.2; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-image>

        <a-image visible={false} id="location-button" ref={locBt} class="clickable" src="#icon-location" position="0.42 -0.5 0" height="0.15" width="0.15"
            animation="property: scale; to: 1.2 1.2 1.2; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-image>

	      <a-gltf-model 
            id="avatar" 
            rotation="0 0 0 " 
            position="0 0 0.2" 
            scale="0.005 0.005 0.005" 
            src="#avatarModel" 
            animation="property: position; to: 0 0 0; dur:1000 ; easing: easeInOutQuad; loop: false; dir: alternate"
        ></a-gltf-model>
        <a-text id="text" class="clickable" ref={textRef} value="" color="black" align="center" width="2" position="0 -1 0" geometry="primitive:plane; height: 0.1; width: 2;" material="opacity: 0.5"></a-text>

      </a-entity>
    </a-scene>
    </div>
  )
}
