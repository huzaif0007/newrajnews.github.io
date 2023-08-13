import React, { Component } from 'react'
import Newsier from './Newsier'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',

  }
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("hello im constructer");
    this.state = {

      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,


    }
    document.title = `${this.capitalizeFirstletter(this.props.category)}- newsBABA`;
  }

  async updateNews() {
    this.props.setprogress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d22f3d285354d789e0b8ccd3002c912&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setprogress(30);
    let parsedData = await data.json()
    this.props.setprogress(80);
    console.log("parsedData");
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,

    })
    this.props.setprogress(100);

  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    //  console.log("preview")
    //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d22f3d285354d789e0b8ccd3002c912&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading : true}) ;
    //  let data = await fetch(url);
    // let parsedData = await data.json()
    //  console.log("parsedData");
    //  this.setState({
    //    page:this.state.page - 1,
    //    articles : parsedData.articles , loading:false
    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }

  handleNextClick = async () => {
    console.log("next");
    // if(!(this.state.page+ 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d22f3d285354d789e0b8ccd3002c912&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading : true});
    // let data = await fetch(url);
    //let parsedData = await data.json()
    // console.log("parsedData");

    // this.setState({
    //   page:this.state.page+ 1, 
    //   articles : parsedData.articles ,loading:false
    // })
    //  }  
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d22f3d285354d789e0b8ccd3002c912&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log("parsedData");
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,


    })


  };

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: '35px 0px' }}> newsMonkey- top headlines for {this.capitalizeFirstletter(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <Newsier title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url}
                    author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

      </div>
    )
  }
}

export default News
