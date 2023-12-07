import React, { useEffect, useRef } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Element, Events, scrollSpy } from 'react-scroll';
import "./FullpageWrapper.scss"

interface FullpageWrapperProps {
  fullpageOptions?: any;
}

const FullpageWrapper: React.FC<FullpageWrapperProps> = ({ fullpageOptions }) => {
  const fullpageApi = useRef<any>(null); // Fullpage API를 저장할 ref

  useEffect(() => {
    if (fullpageApi.current) {
      console.log('Fullpage API:', fullpageApi.current);
      // 여기에서 Fullpage API를 사용할 수 있습니다.
    }
  }, [fullpageApi.current]); // fullpageApi가 변경될 때마다 useEffect 실행

  useEffect(() => {
    // scrollSpy 활성화
    scrollSpy.update();

    // 스크롤 이벤트 등록
    Events.scrollEvent.register('scroll', () => {
      console.log('Scrolled!');

      // 현재 스크롤 위치를 가져옵니다.
      const scrollY = window.scrollY;

      // 특정 스크롤 위치를 설정하여 해당 위치 이상으로 스크롤되면 박스 섹션을 고정합니다.
      const triggerPoint = 500;

      // 만약 스크롤 위치가 트리거 위치 이상이면
      if (scrollY > triggerPoint) {
        // 여기에서 고정되는 동작을 수행합니다.
        // 예를 들어, 박스 섹션에 fixed 스타일을 추가하거나 원하는 동작을 수행합니다.
      }
    });

    // 컴포넌트가 언마운트될 때 이벤트 정리
    return () => {
      Events.scrollEvent.remove('scroll');
    };
  }, []);

  return (
    <ReactFullpage
      {...fullpageOptions}
      // fullpageApi를 ref에 저장
      render={({ state, fullpageApi: api }) => {
        fullpageApi.current = api;
        return (
          <div id="fullpage-wrapper">
            <div className="section">
              <div className="video-section">
                <video autoPlay loop muted style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}>
                  <source src="/background-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="section photo-section">
            <img src="/image1.jpg" alt="apple" />
            </div>
            <div className="section photo-section">
            <img src="/image2.jpg" alt="banana" />
            </div>
            <div className="section photo-section">
            <img src="/image3.jpg" alt="melon" />
            </div>
            <div className="section">
              <div className="box-section">
                <div className="box">
                  <p>Your content goes here</p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default FullpageWrapper;
