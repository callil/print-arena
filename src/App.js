import React, { useState, useEffect } from 'react'
import Arena from 'are.na'
import './App.css'

import ImageLayout from './components/ImageLayout'
import TextLayout from './components/TextLayout'
import LinkLayout from './components/LinkLayout'

const arena = new Arena({
  accessToken: process.env.TOKEN,
})

function App() {
  const [channelData, setChannelData] = useState([''])

  useEffect(() => {
    arena
      .channel('dark-matters-dictionary')
      .contents({ page: 2, per: 400 })

      //   .get()
      .then((contents) => {
        setChannelData(
          contents.sort((a, b) =>
            a.generated_title
              .replace(/\s/g, '')
              .localeCompare(b.generated_title.replace(/\s/g, ''))
          )
        )
      })
      .catch((err) => console.log(err))
  }, [setChannelData])

  const makePage = (item, i) => {
    switch (item.class) {
      case 'Image':
        return (
          <ImageLayout
            url={item.image.original.url}
            id={item.id}
            title={item.generated_title}
            author={item.connected_by_username}
            key={i}
          />
        )
      // case 'Attachment': return <ImageLayout url={item.image.original.url ? item.image.original.url : ""} id={item.id} title={item.generated_title} key={i} style={{transform: `rotate3d(1, 1, 1, ${this.getRandomArbitrary()}deg)` }}/>
      case 'Text':
        return (
          <TextLayout
            content={item.content_html}
            id={item.id}
            title={item.generated_title}
            author={item.connected_by_username}
            key={i}
          />
        )
      case 'Link':
        return (
          <LinkLayout
            url={item.source.url}
            id={item.id}
            title={item.generated_title}
            image={item.image.original.url}
            author={item.connected_by_username}
            key={i}
          />
        )
      default:
        console.log('...')
    }
  }

  return (
    <div className="App">
      <div className="layout">
        <section className="page">
          <div className="text">
            <p>Dark Matters Dictionary</p>
            <small>SFPC 2020</small>
          </div>
        </section>
        {channelData &&
          channelData
            .filter((item) => item.generated_title !== 'Untitled')
            .map((item, i) => {
              return (
                <section key={i} className="page">
                  {makePage(item, i)}
                  <div className="counter"></div>
                </section>
              )
            })}
      </div>
    </div>
  )
}

export default App
