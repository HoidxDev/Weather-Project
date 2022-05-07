import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react'
import { SlowMo } from "gsap/EasePack";
gsap.registerPlugin(SlowMo);

const AnimatedPage = ({click}) => {
    const overlayPath = useRef()
    const overlay = useRef()
     
    useEffect(() => {
        gsap.timeline({})
        .set(overlayPath.current, {
            attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        .to(overlayPath.current, { 
            duration: 1,
            ease: 'power4.in',
            attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' }
        }, 0)
        .to(overlayPath.current, { 
            duration: 0.5,
            ease: 'power2',
            attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
        })
        .set(overlayPath.current, { 
            attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
        })
        .to(overlayPath.current, { 
            duration: 0.5,
            ease: 'power2.in',
            attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
        })
        .to(overlayPath.current, { 
            duration: 1,
            ease: 'power4',
            attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
        })
    }
    ,[])
  
    useEffect(() => {
         if (click) return;
            gsap.timeline()
              .set(overlayPath.current, {
                  attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
              })
              .to(overlayPath.current, { 
                  duration: 1,
                  ease: 'power4.in',
                  attr: { d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z' }
              })
              .to(overlayPath.current, {
                  duration: 0.5,
                  ease: 'power2',
                  attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
              })
              .set(overlayPath.current, { 
                  attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' }
              })
              .to(overlayPath.current, { 
                  duration: 0.5,
                  ease: 'power2.in',
                  attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' }
              })
              .to(overlayPath.current, { 
                  duration: 1,
                  ease: 'power4',
                  attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
              })
    }, [click])


  return (
      <svg
        className="overlay absolute 2xl:w-[800px] xl:h-full xl:right-0 xl:w-[45%] sm:h-[40vh] sm:w-full sm:bottom-0"
        ref={overlay}
        viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <path
          className="overlay__path "
          ref={overlayPath}
          fill='white'
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"/>
      </svg>
  );
}

export default React.memo(AnimatedPage)