import { Navigation, Keyboard, Scrollbar } from 'swiper/modules';
import { useEffect, useState } from "react";
import { StoreProductsProps } from "../../types/product";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import './StoreComponent.styles.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';
import { StoreProduct } from '../StoreProduct/StoreProduct';

export function StoreComponent() {
    const [products, setProducts] = useState<StoreProductsProps[]>([]);
    const [productDetails, setProductDetails] = useState<StoreProductsProps[]>([]);

    function shuffleArray(array: StoreProductsProps[]) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const randomProducts = shuffleArray(products.filter((product) => !product.topSale));

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((data: StoreProductsProps[]) => {
                setProducts(data);
                setProductDetails(data);
                console.log("Product details:", data);
            })
            .catch((error) => {
                console.error("Error getting products:", error);
            });
    }, []);


    return (
        <Container className="mb-4 mt-4">
            <h2 className="title-store">Top Sales</h2>
            <div className='container-swiper'>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    centeredSlides={false}
                    slidesPerGroupSkip={1}
                    grabCursor={false}
                    spaceBetween={30}
                    keyboard={{
                        enabled: true,
                    }}
                    breakpoints={{
                        769: {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                        },
                    }}
                    scrollbar={false}
                    navigation={true}
                    modules={[Keyboard, Scrollbar, Navigation]}
                    className="mySwiper"
                >
                    {products.filter((product) => product.topSale === true).map((product) => (
                        <SwiperSlide key={product.id}>
                            <StoreProduct {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            <h2 className="title-store">More Products</h2>
            <Row md={2} xs={1} lg={3} className="g-3">
                {randomProducts.filter((product) => product.topSale !== true).map((product) => (
                    <Col key={product.id}>
                        <StoreProduct {...product} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}



