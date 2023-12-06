import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { Element } from 'react-scroll';

import './App.scss';

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.5;
      const scrollDirection = scrollY > windowHeight ? 'down' : 'up'; // 스크롤 방향

      // 현재 섹션을 계산합니다.
      const currentSection = Math.floor(scrollY / windowHeight) + 1;

      // 스크롤 위치가 트리거 포인트를 넘었는지 확인합니다.
      if (scrollDirection === 'down' && scrollY % windowHeight > triggerPoint) {
        // 목표 스크롤 위치를 조절하세요 (원하는 대로 조절).
        const targetScrollPosition = (currentSection + 1) * windowHeight + 10;

        // 스크롤 동작을 조절하세요 ('smooth' 또는 'instant'로 조절).
        const scrollBehavior = 'smooth';

        // 다음 섹션의 맨 위로 스크롤합니다.
        window.scrollTo({
          top: targetScrollPosition,
          behavior: scrollBehavior,
        });

        // 동영상 섹션에 도달하면 동영상을 재생합니다.
        if (currentSection === 1 && videoRef.current) {
          videoRef.current.play();
        }
      } else if (scrollDirection === 'up' && scrollY % windowHeight < triggerPoint && currentSection > 1) {
        // 스크롤 위치가 트리거 포인트보다 작고 현재 섹션이 첫 번째가 아닌 경우,
        // 목표 스크롤 위치를 조절하세요 (원하는 대로 조절).
        const targetScrollPosition = (currentSection - 1) * windowHeight - 10;

        // 스크롤 동작을 조절하세요 ('smooth' 또는 'instant'로 조절).
        const scrollBehavior = 'smooth';

        // 이전 섹션의 맨 아래로 스크롤합니다.
        window.scrollTo({
          top: targetScrollPosition,
          behavior: scrollBehavior,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <ParallaxProvider>
      <div>
        

        {/* Video Section */}
        <Element name="video" className="section video-section">
          <ParallaxBanner
            layers={[
              {
                children: <video autoPlay loop muted style={{ width: '100vw', height: '100vh', objectFit: 'cover'}}>
                            <source src="/background-video.mp4" type="video/mp4" />
                          </video>,
                amount: 0.3,
              } as any,
            ]}
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </Element>

        {/* Photo Section */}
        <Element name="photo" className="section photo-section">
          <img src="/image1.jpg" alt="apple" style={{ width: '100vw', height: '100vh' }} />
          <img src="/image2.jpg" alt="banana" style={{ width: '100vw', height: '100vh' }} />
          <img src="/image3.jpg" alt="melon" style={{ width: '100vw', height: '100vh' }} />
        </Element>

        {/* Box Section */}
        <Element name="box" className="section box-section">
          <div className="box">
            <p>Your content goes here</p>
          </div>
        </Element>

        
      </div>
    </ParallaxProvider>
  );
};

export default App;