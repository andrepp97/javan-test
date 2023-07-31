import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FaHeart, FaTrash, FaChevronDown } from 'react-icons/fa';
import { increaseQty, decreaseQty, removeItem } from '../redux/reducer';

const mapStateToProps = (state) => {
    return {
        products: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increaseQty: (index) => dispatch(increaseQty(index)),
        decreaseQty: (index) => dispatch(decreaseQty(index)),
        removeItem: (id) => dispatch(removeItem(id)),
    };
};

const Cart = (props) => {
    const { products, increaseQty, decreaseQty, removeItem } = props;
    const [open, setOpen] = useState(false);
    const [discount, setDiscount] = useState('');

    const calculateTotal = useCallback((type) => {
        let total = 0;
        products.forEach(product => {
            const subTotal = product.qty * product.price;
            total += subTotal;
        });
        if (type === 'discount') return (total * .2).toFixed(2);
        if (discount.toLowerCase() === 'disc20' && type === 'discounted') total = total * .8;
        return total.toFixed(2);
    }, [discount, products])

    useEffect(() => {
        if (discount) {
            let debounceFunction = setTimeout(async () => {
                calculateTotal()
            }, 1000)

            return () => clearTimeout(debounceFunction)
        }
    }, [calculateTotal, discount])

    return (
        <div className="container py-4">
            <div className="row gap-4 gap-lg-0">
                <div className="col-lg-8">
                    <div className="card shadow p-4">
                        <h5 className="mb-5">Cart {products.length ? `(${products.length} items)` : ''}</h5>
                        {products.length
                            ? products.map((product, idx) => (
                                <div key={product.id}>
                                    <div className="row">
                                        <div className="col-md-3 mb-2 mb-md-0">
                                            <img
                                                alt={product.name}
                                                src={product.image}
                                                className="img-fluid shadow-sm rounded-3"
                                            />
                                        </div>
                                        <div className="col-md-6 d-flex flex-column justify-content-between mb-2 mb-md-0">
                                            <div>
                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <h5 className="m-0">{product.name}</h5>
                                                    <b className="text-end d-md-none">${product.price}</b>
                                                </div>
                                                <p className="text-uppercase">{product.category}</p>
                                                <p className="text-uppercase">Color : {product.color}</p>
                                                <p className="text-uppercase">Size : {product.size}</p>
                                            </div>
                                            <div className="d-flex gap-4">
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`Delete ${product.name} ?`) === true) removeItem(product.id);
                                                    }}
                                                    style={{ fontSize: '14px' }}
                                                    className="btn d-flex align-items-center gap-1 p-0"
                                                >
                                                    <FaTrash className="opacity-75" />
                                                    <p className="text-uppercase m-0">
                                                        Remove Item
                                                    </p>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`Move ${product.name} to Wishlist ?`) === true) removeItem(product.id);
                                                    }}
                                                    className="btn d-flex align-items-center gap-1 p-0"
                                                    style={{ fontSize: '14px' }}
                                                >
                                                    <FaHeart className="opacity-75" />
                                                    <p className="text-uppercase m-0">
                                                        Move to wishlist
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex flex-column justify-content-between">
                                            <div>
                                                <div className="d-flex justify-content-end w-100 mb-1">
                                                    <button
                                                        onClick={() => decreaseQty(idx)}
                                                        className=" btn btn-outline-dark rounded-0 py-0 px-3"
                                                        style={{ fontSize: '25px' }}
                                                        disabled={product.qty < 2}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        readOnly
                                                        type="tel"
                                                        value={product.qty}
                                                        style={{ width: '100%', outline: 'none' }}
                                                        className=" border-left-0 border-right-0 text-center"
                                                    />
                                                    <button
                                                        onClick={() => increaseQty(idx)}
                                                        className=" btn btn-outline-dark rounded-0 py-0 px-3"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                {product.note && <div className="text-center">(Note: {product.note})</div>}
                                            </div>
                                            <b className="text-end d-none d-md-block">${product.price}</b>
                                        </div>
                                    </div>
                                    {idx < products.length - 1 && <hr className="my-4" />}
                                </div>
                            ))
                            : <p>No Items</p>}
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow p-4">
                        <h5 className="mb-4">The total amount of</h5>
                        <div className="d-flex gap-1 justify-content-between">
                            <p className="text-black-50 mb-1">Temporary amount</p>
                            <p className="text-black-50 mb-1">${calculateTotal('')}</p>
                        </div>
                        <div className="d-flex gap-1 justify-content-between">
                            <p className="text-black-50 mb-1">Shipping</p>
                            <p className="text-black-50 mb-1">Free</p>
                        </div>
                        {discount.toLowerCase() === 'disc20' && (
                            <div className="d-flex gap-1 justify-content-between">
                                <p className="text-black-50 mb-1">Discount</p>
                                <p className="text-black-50 mb-1">- ${calculateTotal('discount')}</p>
                            </div>
                        )}
                        <hr />
                        <div className="d-flex gap-2 justify-content-between ">
                            <b className="mb-1">
                                The total amount of<br/>(including VAT)
                            </b>
                            <b className="mb-1">${calculateTotal('discounted')}</b>
                        </div>
                        <button className="btn btn-primary text-uppercase mt-4 py-3">
                            Go To Checkout
                        </button>
                    </div>
                    <div className="card shadow p-4 mt-4">
                        <div className="accordion">
                            <div className="accordion-item border-0">
                                <p className="accordion-header">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="btn d-flex align-items-center justify-content-between bg-transparent w-100 p-0"
                                    >
                                        Add a discount code (optional)
                                        <FaChevronDown />
                                    </button>
                                </p>
                                <div className={`accordion-collapse collapse mt-4 ${open ? 'show' : ''}`}>
                                    <div className="accordion-body p-0">
                                        <input
                                            type="text"
                                            placeholder="Ex: DISC20"
                                            className="form-control"
                                            value={discount}
                                            onChange={e => setDiscount(e.target.value)}
                                        />
                                        {discount.toLowerCase() === 'disc20' && <small className="text-success">Discount Applied</small>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);