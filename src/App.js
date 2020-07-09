import React, { useState, useEffect } from 'react'
import Arena from 'are.na'
import './App.css'

import ImageLayout from './components/ImageLayout'
import TextLayout from './components/TextLayout'
import LinkLayout from './components/LinkLayout'

const arena = new Arena({
  accessToken: process.env.REACT_APP_TOKEN,
})
function App() {
  const [channelData, setChannelData] = useState([{ ok: 'hi' }])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    arena
      .channel('dark-matters-dictionary')
      .thumb()
      .then((contents) => {
        setTotalPages(Math.ceil((contents.length - 1) / 25))
      })
  }, [])

  useEffect(() => {
    let allData = []

    Array(totalPages)
      .fill()
      .map((_, i) =>
        arena
          .channel('dark-matters-dictionary')
          .contents({ page: i + 1, per: 25 })
          .then((contents) => {
            allData = [...allData, ...contents]
            console.log(contents)
            console.log(allData)
          })
          .then(() => {
            setChannelData(
              allData.sort((a, b) =>
                a.generated_title
                  .replace(/\s/g, '')
                  .localeCompare(b.generated_title.replace(/\s/g, ''))
              )
            )
          })
          .catch((err) => console.log(err))
      )
  }, [setChannelData, totalPages])

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
        console.log(item)
    }
  }

  return (
    <div className="App">
      <div className="controls">
        {channelData ? (
          <span>{channelData.length}</span>
        ) : (
          <span>Loading...</span>
        )}
        <button className="print" onClick={(e) => window.print()}>
          Print
        </button>
      </div>

      <div className="layout">
        <section className="page">
          <div className="text">
            <p>Dark Matters Dictionary</p>
            <small>SFPC 2020</small>
          </div>
        </section>
        {channelData &&
          channelData
            .filter(
              (item) =>
                item.generated_title !== 'Untitled' &&
                item.class !== 'Attachment'
            )
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
