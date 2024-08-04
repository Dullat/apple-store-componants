import React from "react"
import Carousel from "./Carousel"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Highlight = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 1,
    })
  })
  return (
    <section className="w-screen common-padding overflow-hidden bg-zinc-950 h-full min-h-10">
      <div className="screen-max-width">
        <div className="flex mb-10">
          <h1 id="title" className="section-heading">
            Highlights
          </h1>
        </div>
        <Carousel />
      </div>
    </section>
  )
}

export default Highlight
