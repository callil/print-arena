import React, { Component } from 'react';
import config from './config'
import './App.css';
import {configureUrlQuery, addUrlProps, replaceUrlQuery, UrlQueryParamTypes } from 'react-url-query'
import createHistory from 'history/createBrowserHistory';

import ImageLayout from './components/ImageLayout'
import TextLayout from './components/TextLayout'
import LinkLayout from './components/LinkLayout'

const urlPropsQueryConfig = {
  URICurrentChannel: { type: UrlQueryParamTypes.string, queryParam: 'ch' },
}

const history = createHistory();
 
configureUrlQuery({ history });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: !this.props.URICurrentChannel ? 'screen-spaces-_-print' : this.props.URICurrentChannel,
      loaded: false,
      value: '',
      pageContent: {},
      page: 1,
      per: 100
    }
  }
  
  componentWillMount(){

  }

  componentDidMount(){
    if(!this.state.loaded){
      this.getChannelData(this.state.channel)
    }
    replaceUrlQuery({'ch': this.state.channel })
    history.listen(() => this.forceUpdate());

  }

  getChannelData = (channel) => {
    let getChannels = fetch(`${config.apiBase}/channels/${channel}/contents?page=${this.state.page}&per=${this.state.per}`, {headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer c7af988841615059cabff98536a3670d4eefb37881631c2bfaf0ed5d7d0ba0d2'}})
    getChannels.then(resp => resp.json()).then(response => {
      console.log("Got main chan")
      response.contents.map((item,i) => {
        if(item.class === "Channel"){
            console.log(item.slug)
            this.getSubChannels(item.slug)
        } else if(item.class === "Attachement"){
          console.log(item.image.original.url)
        }
      })
      this.setState({arenaContent: response.contents})
      this.makePage()
    }).catch(error => {
      this.getChannelData('screen-spaces-_-print')

    })
  }

  getSubChannels = (channel) => {
    let getChannels = fetch(`${config.apiBase}/channels/${channel}/contents?page=${this.state.page}&per=${this.state.per}`, {headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer c7af988841615059cabff98536a3670d4eefb37881631c2bfaf0ed5d7d0ba0d2'}})
    getChannels.then(resp => resp.json()).then(response => {
      // console.log(response.contents)
      let added = this.state.arenaContent.concat(response.contents)
      this.setState({arenaContent: added})
      // this.makePage()
    }).catch(error => {
      console.log('error')
    })
  }

  makePage = () => {
    let usedNums = []
    let pageArray = []
    let count = 16

    for(var i =0; i < count; i++){
      let randomVal = Math.floor(Math.random()*this.state.arenaContent.length)
      if (usedNums.indexOf(randomVal) >= 0) {
        console.log('exists');
      } else {
        console.log('does not');
      }

      pageArray[i] = this.state.arenaContent[randomVal]
      usedNums.push(randomVal)
    }

    this.setState({pageContent: {
      front: pageArray.slice(0, 4),
      back: pageArray.slice(4, 8),
      left: pageArray.slice(8, 12),
      right: pageArray.slice(12, 16),
    }, loaded: true})
  }

  getRandomArbitrary = () => {
    return Math.random() * ((20) - (-20)) + (-20);
  }

  makeSpread = (item, i) =>{
    // console.log(item)
    switch (item.class) {
      // case 'Channel': this.getSubChannels(item.slug) 
      //   break;
      case 'Image': return <ImageLayout url={item.image.original.url} id={item.id} title={item.generated_title} key={i} style={{transform: `rotate3d(1, 1, 1, ${this.getRandomArbitrary()}deg)` }}/>
      // case 'Attachment': return <ImageLayout url={item.image.original.url ? item.image.original.url : ""} id={item.id} title={item.generated_title} key={i} style={{transform: `rotate3d(1, 1, 1, ${this.getRandomArbitrary()}deg)` }}/>
      case 'Text': return <TextLayout content={item.content} id={item.id} title={item.generated_title} key={i} style={{transform: `rotate3d(1, 1, 1, ${this.getRandomArbitrary()}deg)` }}/>
      case 'Link': return <LinkLayout url={item.source.url} id={item.id} title={item.generated_title} image={item.image.original.url} key={i} style={{transform: `rotate3d(1, 1, 1, ${this.getRandomArbitrary()}deg)` }}/>
      default: console.log('...');
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.value !== this.state.url) {
      let strUrl = this.state.value;
      let path = strUrl.replace(/^https?:\/\//, '').split('/');
      this.setState({channel: path[2], loaded: false, arenaContent: []});
      console.log(path[2])
      this.getChannelData(path[2]);
      replaceUrlQuery({'ch': path[2]})
    }
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <form onSubmit={this.handleSubmit}>
              <label>
                <span className='formTitle'></span>
                <input
                  className='formBox'
                  type="text"
                  placeholder={this.state.channel}
                  value={this.state.value}
                  onChange={this.handleChange} />
              </label>
              {/* <input className='formButton' type="submit" value="Submit" /> */}
          </form>
          {this.state.arenaContent ? <button onClick={(e) => this.makePage()}>Generate New Page 
            {/* <span class="dim">⌘r</span> */}
          </button> : "Loading..."}
          <button class="print" onClick={(e) =>  window.print()}>Print</button> 
        </div>
        <section className="layout" >
          <section className="page front">
            {this.state.loaded ? this.state.pageContent.front.map((item,i) => this.makeSpread(item, i)) : "Loading..."}
          </section>
          <section className="page back">
            {this.state.loaded ? this.state.pageContent.back.map((item,i) => this.makeSpread(item, i)) : "Loading..."}
          </section>
        </section>
        <section className="layout" >
          <section className="page front">
            {this.state.loaded ? this.state.pageContent.left.map((item,i) => this.makeSpread(item, i)) : "Loading..."}
          </section>
          <section className="page back">
            {this.state.loaded ? this.state.pageContent.right.map((item,i) => this.makeSpread(item, i)) : "Loading..."}
          </section>
        </section>
      </div>
    );
  }
}

export default addUrlProps({ urlPropsQueryConfig })(App);
