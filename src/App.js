import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png'
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png'
  }
]

function App() {
  const [boxShadow, setBoxShadow] = useState('');
  const [choose, setChoose] = useState(0);
  const [array, setArray] = useState([{
    id: '0',
    shiftRight: 0,
    shiftDown: 0,
    spread: 0,
    blur: 0,
    opacity: 0,
    inset: null,
    backgroundColor: 'rgba(255,0,0,0)',
    color: 'rgba(0, 217, 255,1)',
    boxShadowColor: 'rgba(255,0,0,0.34)',
  }
  ])
  const [properties, setProperties] = useState({
    shiftRight: 0,
    shiftDown: 0,
    spread: 0,
    blur: 0,
    opacity: 0,
    inset: null,
    backgroundColor: 'rgba(255,0,0,0)',
    color: 'rgba(0, 217, 255,1)',
    boxShadowColor: 'rgba(255,0,0,0.34)',
  });
  const changeValue = (e) => {
    if (e.target.name !== 'inset' && e.target.name !== 'backgroundColor' && e.target.name !== 'color' && e.target.name !== 'boxShadowColor' && e.target.name !== 'opacity') {
      setProperties({
        ...properties,
        [e.target.name]: e.target.value
      })
    }
    else if (e.target.name === 'inset') {
      setProperties({
        ...properties,
        [e.target.name]: e.target.checked
      })
    }
    else if (e.target.name === 'backgroundColor') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgb(${r},${g},${b})`
      })
    }
    else if (e.target.name === 'color') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgb(${r},${g},${b})`
      })
    }
    else if (e.target.name === 'opacity') {
      const boxShadowColor = properties.boxShadowColor.split(',');
      boxShadowColor[3] = e.target.value / 100;
      setProperties({
        ...properties,
        'boxShadowColor': boxShadowColor.join(',') + ')',
        [e.target.name]: e.target.value
      })
    }
    else if (e.target.name === 'boxShadowColor') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgba(${r},${g},${b},${properties.opacity / 100})`
      })
    }
    array[choose] = {
      ...array[choose],
      ...properties
    }
    run()
  }
  const removeLayer = (id) => {
    if (array.length > 1) {
      const newArray = array.filter((item, index) => index !== id);
      setArray(newArray);
    }
  }
  const addLayer = () => {
    setArray([...array, {
      id: Math.random().toString(36).substr(2, 9),
      ...properties
    }])
  }
  const run = () => {
    let boxShadow = '';
    array.forEach((item, index) => {
      boxShadow += `${item.boxShadowColor} ${item.shiftRight}px ${item.shiftDown}px ${item.spread}px ${item.blur}px ${item.inset ? 'inset' : ''}`;
      if (index !== array.length - 1) {
        boxShadow += ', ';
      }
    }
    )
    setBoxShadow(boxShadow);
  }
  useEffect(() => { run() }, [boxShadow])
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(array);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setArray(items);
    setChoose(result.destination.index);
  }
  return (
    <div className="App">

      <div className="custom">
        <h1>Box-Shadow CSS Generator</h1>
        <div className="custom__item">
          <p>Shift right</p>
          <input type="range" min={-50} max={50} value={properties.shiftRight} name="shiftRight" onChange={changeValue} className="range" />
        </div>
        <div className="custom__item">
          <p>Shift down</p>
          <input type="range" min={-50} max={50} value={properties.shiftDown} name="shiftDown" onChange={changeValue} className="range" />
        </div>
        <div className="custom__item">
          <p>Spread</p>
          <input type="range" min={0} max={100} value={properties.spread} name="spread" onChange={changeValue} className="range" />
        </div>
        <div className="custom__item">
          <p>Blur</p>
          <input type="range" min={0} max={100} value={properties.blur} name="blur" onChange={changeValue} className="range" />
        </div>
        <div className="custom__item">
          <p>Opacity</p>
          <input type="range" min={0} max={100} value={properties.opacity} name="opacity" onChange={changeValue} className="range" />
        </div>
        <div className="custom__checkbox">
          <input type="checkbox" name='inset' onChange={changeValue} className="color" />
          <p>Inset</p>
        </div>
        <input type="color" name='boxShadowColor' onChange={changeValue} value="#ff0000" />
        <button className='button' onClick={addLayer}>Add Layer</button>

        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul className="layers" {...provided.droppableProps} ref={provided.innerRef}>
              {array.map(({ id, ...item }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="layer" key={index} >

                          <div className={choose === index ? "layer__item active" : "layer__item"} onClick={() => {
                            setChoose(index)
                            setProperties(item)
                          }}>
                            <p className='layer__item__p'>{item.shiftRight} {item.shiftDown} {item.spread} {item.blur} {item.boxShadowColor}</p>
                            <div className="remove">
                              <button className='button__remove' onClick={() => {
                                removeLayer(index)
                              }}>X</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      <div className="review">
        <div className="review-box">
          <div className="review-box__top">
            <div className="review-box__top-left">
              <h1>Preview</h1>
            </div>
            <div className="review-box__top-right">
              <div className="review-box__top-right__color">
                <input type="color" name='backgroundColor' onChange={changeValue} value="#ffffff" className="color" />
                <input type="color" name='color' onChange={changeValue} value="#00d9ff" className="color" />
              </div>
            </div>
          </div>

          <div className="review-box__bottom" style={{
            backgroundColor: properties.backgroundColor,
          }}>
            {/* absolute */}

            <div className="review-box__bottom__box" style={{
              backgroundColor: properties.color,
              boxShadow: `${boxShadow}`,
            }}>

            </div>
          </div>
        </div>
        <div className="review-box-csscode">
          <h1>CSS Code</h1>
          <p>
            {/* {`box-shadow: ${properties.boxShadowColor} ${properties.shiftRight}px ${properties.shiftDown}px ${properties.spread}px ${properties.blur}px ${properties.inset ? 'inset' : ''};`} */}
            {`box-shadow: ${boxShadow};`}
          </p>
          {/* {boxShadow} */}
        </div>
      </div>
    </div>
  );
}

export default App;
