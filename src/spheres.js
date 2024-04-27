import React , { useRef } from 'react'

function Spheres({coords, handler}) {

  console.log('coords is: '+coords)

  const firstrender = useRef(true)

  let spheres = coords.map( item => (
      <a-sphere
        key={item.x}
        geometry="primitive: sphere"
        id={item._id}
        radius={0}
        hoverable
        clickable
        color='white'
        material="shader: flat; color: white"
        position={`${item.x} ${item.y} ${item.z}`}
        look-controls
        onClick={() => {
          firstrender.current = false
          handler(item)
        }
        }
        animation={`property: radius; from : 0; to: 8; dur: 700; easing: linear; loop: false; delay:${firstrender.current ? 100 : 1000}`}
      />
  )

  )

  return (
    <>
    {spheres}
    </>
  );
}

export default Spheres