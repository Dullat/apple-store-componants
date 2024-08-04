import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

const Carousel = () => {
  const videoRef = useRef([])
  const spanDivRef = useRef([])
  const spanFillRef = useRef([])

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isPlaying: false,
    isLast: false,
  })

  const [loadedData, setLoadedData] = useState([])

  const { isEnd, startPlay, videoId, isPlaying, isLast } = video

  const handleLoadedData = (i, e) => setLoadedData((pre) => [...pre, e])

  useEffect(() => {
    if (!isPlaying) {
      videoRef.current[videoId].pause()
    } else {
      startPlay && videoRef.current[videoId].play()
    }
  }, [startPlay, videoId, isPlaying, loadedData])

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    })
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }))
      },
    })
  }, [isEnd, videoId])

  const handleProcess = (value, i) => {
    switch (value) {
      case "play-next":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }))
        break

      default:
        break
    }
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((el, i) => (
          <div key={el.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  ref={(el) => (videoRef.current[i] = el)}
                  playsInline
                  muted
                  preload="auto"
                  onLoadedMetadata={(e) => handleLoadedData(i, e)}
                  onEnded={() =>
                    i < 3
                      ? handleProcess("play-next", i)
                      : handleProcess("last-video")
                  }
                >
                  <source src={el.video} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center relative mt-10 gap-4">
        <div className="flex gap-4 rounded-full px-4 py-4 bg-slate-900 ">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (spanDivRef.current[i] = el)}
              className="flex w-3 h-3 bg-slate-400 rounded-full cursor-pointer overflow-hidden"
            >
              <span
                ref={(el) => (spanFillRef.current[i] = el)}
                className="flex w-1 h-3 bg-white rounded-full"
              />
            </span>
          ))}
        </div>
        <button className="w-11 h-11 rounded-full bg-slate-900"></button>
      </div>
    </>
  )
}

export default Carousel
