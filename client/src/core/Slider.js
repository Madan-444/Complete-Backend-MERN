import React, {Fragment} from 'react'
import Layout from './Layout'
import image1 from './img_mountains_wide3.jpg'
import image2 from './img_nature_wide2.jpg'
import image3 from './img_snow_wide1.jpg'

function Slider() {
    return (
        <>
        <Layout>

        
<div class="slideshow-container">

<div class="mySlides fade">
  <div class="numbertext">1 / 3</div>
  <img src={image1} style={{width:'100%'}}/>
  <div class="text">Caption Text</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">2 / 3</div>
  <img src= {image2} style={{width:'100%'}}/>
  <div class="text">Caption Two</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">3 / 3</div>
  <img src= {image3} style={{width:'100%'}}/>
  <div class="text">Caption Three</div>
</div>

<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>

</div>
<br/>

<div style={{textAlign:'center'}}>
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span> 
</div>
</Layout>


        </>
    )
}

export default Slider
