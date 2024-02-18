import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../Common/images/banner1.jpeg";
import banner2 from "../../../Common/images/banner2.jpeg";
import banner3 from "../../../Common/images/banner3.jpeg";
import banner4 from "../../../Common/images/banner4.jpeg";

const Banners = () => {
    const onChange = (index) => {
        console.log(`Carousel slide changed to index ${index}`);
    };

    const onClickItem = (index, item) => {
        console.log(`Clicked on item ${index}`);
    };

    const onClickThumb = (index) => {
        console.log(`Clicked on thumb ${index}`);
    };

    return (
        <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
            <div>
                <img src={banner1} alt="Slide 1" />
            </div>
            <div>
                <img src={banner2} alt="Slide 2" />
            </div>
            <div>
                <img src={banner3} alt="Slide 3" />
            </div>
            <div>
                <img src={banner4} alt="Slide 4" />
            </div>
        </Carousel>
    );
};

export default Banners;
