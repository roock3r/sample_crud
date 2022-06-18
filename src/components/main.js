import React, {useEffect, useState} from 'react';

const Main = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json();
                setProducts(data);
            }
        )();
    },[]);

    const deleteMe = async (id) => {
        if(window.confirm('Are you sure you want to delete this product')){
            await fetch(`http://localhost:8000/api/products/${id}`, {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'}
            });
            const new_products = products.filter(p => p.id !== id)
            setProducts([...new_products])
        }
    }


    return (
        <main>
            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {products.map(
                            (p) => {
                                return(
                                    <div className="col" key={p.id}>
                                        <div className="card shadow-sm">
                                            <img src={p.image} height="180"/>
                                            <div className="card-body">
                                                <p className="card-text">{p.title}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                                                onClick={() => deleteMe(p.id)}>Delete me</button>
                                                    </div>
                                                    <small className="text-muted">Description: {p.description} </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Main;
