import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';
import {Card} from 'react-bootstrap';

class Slide extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="slider-body">
          <div className="slidewrap">          
            <Slider {...settings}>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo1.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo2.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo3.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo4.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo5.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo6.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo7.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo1.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo2.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo3.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo4.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo5.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo6.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
                <Card className="border-0 rounded-0 text-center">
                      <figure className="img-thumbnail lg">
                          <img src={require('../assest/images/logo7.png')} className="img-fluid" alt="logo" />
                      </figure>
                      <p className="f-12">Sed tincidunt nec quam quis gravida</p>
                </Card>
            </Slider>
        </div>
      </div>
    );
  }
}

export default Slide