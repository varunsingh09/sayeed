import React, { Component } from "react";
import Gallery from 'react-amazon-gallery';

class Dashboard extends Component {

    

    render() {
        let images = [
            'https://www.gstatic.com/webp/gallery/2.jpg',
            'https://www.gstatic.com/webp/gallery/3.jpg',
            'https://www.gstatic.com/webp/gallery/5.jpg',
            'https://www.gstatic.com/webp/gallery/4.jpg',
            
          ]

        return (
            <div className="container">
              <Gallery images={images} />
               </div>
        );  
    }
}

export default Dashboard;
