import React from 'react'

interface PlasmaProps {
  color?: string
  speed?: number
  direction?: 'forward' | 'reverse' | 'pingpong'
  scale?: number
  opacity?: number
  mouseInteractive?: boolean
}

export const Plasma: React.FC<PlasmaProps> = ({ opacity = 1 }) => {
  return (
    <div
      className="plasma-bg w-full h-full absolute inset-0 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="plasma-blob-3" />
    </div>
  )
}

export default Plasma
