import React, { useEffect, useRef } from 'react';
import  'aframe';

export default (props) => {
  const sceneRef = useRef(null);
  const elRef = useRef(null);

  const camreass = props.camreass;
//   const AFRAME = window.AFRAME;
  useEffect(() => {

      const length = camreass.length;
      const sceneEl = sceneRef.current;
      const arSystem = sceneEl.systems["mindar-image-system"];
      sceneEl.addEventListener('renderstart', () => {
        arSystem.start(camreass[length-1]); // start AR 
        console.log(length);
      });

      return () => {
        arSystem.stop();
      }

  }, []);
  useEffect(()=>{
    // const element = document.getElementById("mytarget");
    const element = elRef.current;
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
      console.log("target found");
    });
            
    // showAvatar(() => {
    //   setTimeout(() => {
    //     showPortfolio(() => {
    //       setTimeout(() => {
    //         showInfo();
    //       }, 300);
    //     });
    //   }, 300);
    // });
  },[])
  const showInfo = () => {
    let y = 0;
    const profileButton = document.querySelector("#profile-button");
    const webButton = document.querySelector("#web-button");
    const emailButton = document.querySelector("#email-button");
    const locationButton = document.querySelector("#location-button");
    const text = document.querySelector("#text");

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


//     AFRAME.registerComponent('mytarget', {
//     init: function () {
//       this.el.addEventListener('targetFound', event => {
//         console.log("target found");
//         showAvatar(() => {
//           setTimeout(() => {
//             showPortfolio(() => {
//               setTimeout(() => {
//                 showInfo();
//               }, 300);
//             });
//           }, 300);
//         });
//       });
//       this.el.addEventListener('targetLost', event => {
//         console.log("target found");
//       });
//       //this.el.emit('targetFound');
//     }
//   });



  return (
   
    
    <div class="example-container">
        <div id="example-scanning-overlay" class="hidden">
            <div class="inner">
                <img src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/card.png"/>
                <div class="scanline"></div>
            </div>
        </div>

      <a-scene ref={sceneRef} mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/examples/image-tracking/assets/card-example/card.mind; showStats: false; uiScanning: #example-scanning-overlay;" embedded color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
        <a-assets>
          <img id="card" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/card.png" />
          <img id="icon-web" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/icons/web.png" />
          <img id="icon-location" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/icons/location.png" />
          <img id="icon-profile" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/icons/profile.png" />
          <img id="icon-phone" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/icons/phone.png" />
          <img id="icon-email" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/icons/email.png" />
          <img id="icon-play" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/icons/play.png" />
          <img id="icon-left" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/icons/left.png" />
          <img id="icon-right" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/icons/right.png" />
          <img id="paintandquest-preview" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/portfolio/paintandquest-preview.png" />
          <video id="paintandquest-video-mp4" autoplay="false" loop="true" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/portfolio/paintandquest.mp4"></video>
          <video id="paintandquest-video-webm" autoplay="false" loop="true" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/portfolio/paintandquest.webm"></video>
          <img id="coffeemachine-preview" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/portfolio/coffeemachine-preview.png" />
          <img id="peak-preview" src="https://hiukim.github.io/mind-ar-js-doc/samples/assets/card-example/portfolio/peak-preview.png" />
          
          <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;" raycaster="far: 10000; objects: .clickable">
        </a-camera>

        <a-entity id="mytarget"  ref={elRef}  mytarget mindar-image-target="targetIndex: 0">
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

          <a-image visible={false} id="profile-button" class="clickable" src="#icon-profile" position="-0.42 -0.5 0" height="0.15" width="0.15"
            animation="property: scale; to: 1.2 1.2 1.2; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-image>

          <a-image visible={false} id="web-button" class="clickable" src="#icon-web" alpha-test="0.5" position="-0.14 -0.5 0" height="0.15" width="0.15"
            animation="property: scale; to: 1.2 1.2 1.2; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-image>

          <a-image visible={false} id="email-button" class="clickable" src="#icon-email"  position="0.14 -0.5 0" height="0.15" width="0.15"
            animation="property: scale; to: 1.2 1.2 1.2; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-image>

          <a-image visible={false} id="location-button" class="clickable" src="#icon-location" position="0.42 -0.5 0" height="0.15" width="0.15"
            animation="property: scale; to: 1.2 1.2 1.2; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-image>

          <a-gltf-model id="avatar" rotation="0 0 0" position="0 -0.25 0" scale="0.004 0.004 0.004" src="#avatarModel"></a-gltf-model>
          <a-text id="text" class="clickable" value="" color="black" align="center" width="2" position="0 -1 0" geometry="primitive:plane; height: 0.1; width: 2;" material="opacity: 0.5"></a-text>

        </a-entity>
      </a-scene>
    </div>
  )
}
