import { useEffect, useState } from 'react';
import './CheckoutComponent.styles.css';
import { useShoppingCart } from '../../types/context/ShoppingCartContext';
import { StoreProductsProps } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';



export function CheckoutComponent() {
    const [step, setStep] = useState(1);
    const { cartProducts, getProductDetails } = useShoppingCart();
    const [productDetails, setProductDetails] = useState<StoreProductsProps[] | undefined>();
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostCode] = useState('');
    const [phone, setPhone] = useState('');
    const [fullnameError, setFullnameError] = useState<string | boolean>(false);
    const [addressError, setAddressError] = useState<string | boolean>(false);
    const [postcodeError, setPostcodeError] = useState<string | boolean>(false);
    const [phoneError, setPhoneError] = useState<string | boolean>(false);

    const onValidate = () => {
        let isValid = true;
        const fullnameIsEmpty = fullname.trim() === '';
        const addressIsEmpty = address.trim() === '';
        const phoneIsEmpty = phone.trim() === '';
        const postcodeIsEmpty = postcode.trim() === '';

        setFullnameError(fullnameIsEmpty ? 'All fields are required.' : false);
        setAddressError(addressIsEmpty ? 'All fields are required.' : false);
        setPostcodeError(postcodeIsEmpty ? 'All fields are required.' : false);
        setPhoneError(phoneIsEmpty ? 'All fields are required.' : false);

        if (fullnameIsEmpty || addressIsEmpty || phoneIsEmpty || postcodeIsEmpty) {
            isValid = false;
        } else {
            setFullnameError(false);
            setAddressError(false);
            setPostcodeError(false);
            setPhoneError(false);
        }

        return isValid;
    }

    const nextStep = () => {
        setStep(step + 1);
    };

    const backStep = () => {
        setStep(step - 1);
    };

    function handleButtonClick() {
        if (onValidate() && step < 2) {
            nextStep();
        }
    }

    const handleCheckoutButoon = () => {
        localStorage.removeItem("shopping-cart");
        Swal.fire({
            title: 'Thank You for Your Purchase!',
            text: 'Your support means a lot to us.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then((result: SweetAlertResult) => {
            if (result.isConfirmed) {
                window.location.href = '/home';
            }
        });
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetailsPromises = cartProducts.map((item) => getProductDetails(item.id));
            const resolvedProductDetails = await Promise.all(productDetailsPromises);
            const productDetailsArray = resolvedProductDetails.filter((item) => item !== undefined) as StoreProductsProps[];

            setProductDetails(productDetailsArray);
        };

        fetchProductDetails();
    }, [cartProducts, getProductDetails]);

    useEffect(() => {
        if (productDetails) {
            let total = 0;
            for (let i = 0; i < cartProducts.length; i++) {
                if (productDetails[i]) {
                    total += (productDetails[i].price || 0) * cartProducts[i].quantity;
                }
            }
            setTotalPrice(total);
        }
    }, [cartProducts, productDetails]);

    return (
        <div className='checkout-container'>
            <form className='form-container'>
                <Link to="/">
                    <img src="/icono_page.png" alt="Icon" width="80" height="70" style={{ borderRadius: '50%', margin: '0' }} />
                </Link>
                <h2 className='checkout-title'>Checkout</h2>
                {step === 1 && (
                    <>
                        <input className="checkout-input" type="text" id="fullName" placeholder='Full Name' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        <input className="checkout-input" type="text" id="address" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        <input className="checkout-input" type="text" id="postalCode" placeholder='Postal Code' value={postcode} onChange={(e) => setPostCode(e.target.value)} />
                        <input className="checkout-input" type="tel" id="phone" name="phone" placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <div className='error-container'>
                            {fullnameError && <p className='form-error'>{fullnameError}</p>}
                            {addressError && <p className='form-error'>{addressError}</p>}
                            {postcodeError && <p className='form-error'>{postcodeError}</p>}
                            {phoneError && <p className='form-error'>{phoneError}</p>}
                        </div>
                        <div className='btn-checkout-container'>
                            <Link to="/store">
                                <button className='btn-big checkout-btn'>Back</button>
                            </Link>
                            <button type="button" onClick={handleButtonClick} className='btn-big checkout-btn'>Next</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <section>
                        <h4>Cart summary</h4>
                        {productDetails && productDetails.length > 0 ? (
                            <div>
                                <Swiper
                                    effect={'cards'}
                                    grabCursor={true}
                                    modules={[EffectCards]}
                                    className="checkout-swiper"
                                >
                                    {cartProducts.map((item) => {
                                        const productDetail = productDetails.find((detail) => detail?.id === item.id);
                                        if (productDetail && typeof item.id === 'number' && typeof item.quantity === 'number') {
                                            return (
                                                <SwiperSlide key={item.id} className='checkout-swiper-slide'>
                                                    <img src={productDetail.imgUrl} alt={productDetail.name} style={{ width: "75px", height: "75px", objectFit: "contain" }} />
                                                    <div className='checkout-product-info'>
                                                        <p>{productDetail.name}</p>
                                                        <p>Unit Price: {productDetail.price}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                        <div className="checkout-product-total" style={{ fontSize: "1.5rem" }}>
                                                            <p>Subtotal: {formatCurrency(productDetail.price * item.quantity)}</p>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        }
                                        return null;
                                    })}
                                </Swiper>
                            </div>
                        ) : (
                            <div className="text-center">Loading...</div>
                        )}
                        <div className="ms-auto fw-bold fs-3">
                            <p>Total: {formatCurrency(totalPrice || 0)}</p>
                        </div>
                        <div className='btn-checkout-container'>
                            <button onClick={backStep} className='btn-big checkout-btn'>Back</button>
                            <button onClick={nextStep} className='btn-big checkout-btn'>Next</button>
                        </div>
                    </section>
                )}{step === 3 && (
                    <section>
                        <h4>Payment Information</h4>
                        <div className="card-container">
                            <div className="credit-card">
                                <div className='image-container'>
                                    <img src="/src/components/CheckoutComponent/imgs/visa.jpg" alt="visa-icon" className="logo-card" />
                                    <img src="/src/components/CheckoutComponent/imgs/aiticono.jpg" alt="ait-icon" className="logo-card ait-logo" />
                                </div>
                                <label className='creditcard-label'>Card number:</label>
                                <input id="user" type="text" className="creditcard-input cardnumber" placeholder="1234 5678 9101 1121" />
                                <div className="input-container">
                                    <label className='creditcard-label'>Name:</label>
                                    <input className="creditcard-input name" placeholder="Assembler Institute" />
                                </div>
                                <div className="input-container">
                                    <label className="creditcard-label toleft">CCV:</label>
                                    <input className="creditcard-input toleft ccv" placeholder="321" />
                                </div>

                            </div>
                        </div>
                        <div className='btn-checkout-container'>
                            <button type="button" className='btn-big checkout-btn' onClick={handleCheckoutButoon}>
                                Place order!
                            </button>
                        </div>
                    </section>
                )}
            </form>
        </div>
    )
}
