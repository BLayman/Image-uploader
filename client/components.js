class ImageBox extends React.Component {

componentWillMount(){
  this._fetchImages();
}

constructor() {
  super();
  this.state = {
    images: []
  };
}


render(){
  const images = this._getImages() || [];
  return (
  <div className="image-box">
<h1>Images</h1>
  {images}
  </div>
);
}

_fetchImages() {
  $.ajax({
    method: 'GET',
    url: '/uploads',
    success: (imageUrls) => {
      console.log("got urls:",imageUrls);
      this.setState({images:imageUrls});
    }
  });
}

_getImages() {
  return this.state.images.map((image) =>{
return (
<Image
url= {image.url} key= {image.id}
/>
)
});
}

}



class Image extends React.Component {
render(){
return (
  <div>
  <img className="image" className="col-sm-4" src= {this.props.url}/>
  </div>
);
}

}

  ReactDOM.render(
    <ImageBox />,
    document.getElementById('image-box')
  );
