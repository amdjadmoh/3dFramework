import React from 'react'
import './index1.css'
import vector from './vector1.png'
import vector1 from './Vector.png'

function selection() {
  return (
   <div className='selectioncontainer'>
     <div className='selection'>  
    <header>
        <p>Add New Hotspot</p>
    </header>
    <div className="images" id>
        <button>
            <div className="scenename">
                scene name
            </div>
        </button>
        <button>
            <div className="scenename">
                scene name
            </div>
        </button>
        <button>
            <div className="scenename">
                scene name
            </div>
        </button>
        <button>
            <div className="scenename">
                scene name
            </div>
        </button>
        <button>
            <div className="scenename">
                scene name
            </div>
        </button>
    </div>
    <footer className='ft'>
        <button className="Discard">
            <img src={vector1} alt="" />
            <p>Discard</p>
        </button>
        <button className="submit">
            <img src={vector} alt="" />
            <p>Submit</p>
        </button>
    </footer>

    </div>
   </div>
  )
}

export default selection