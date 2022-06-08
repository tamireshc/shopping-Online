import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import car from './image/car.png';
import { getProductsDetails } from '../api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      details: '',
    };
  }

  componentDidMount() {
    this.getProductsDetailsFunction();
  }

  getProductsDetailsFunction = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProductsDetails(id);

    this.setState({
      details: product,
    });
  }

  render() {
    const { details } = this.state;
    const { addToCard } = this.props;

    return (
      <div>
        <Link to="/">
          <header className="header-car">
            <img src={ car } alt="carrinho" />
            <h1>Shopping Online</h1>
          </header>
        </Link>
        <div className="product-details-container">
          <div className="product-detaisl-img-container">
            <img src={ details.thumbnail } alt="preco" />
            <div className="product-detail-title">
              <p data-testid="product-detail-name">{ details.title }</p>
              <p className="price-product-detais">
                R$:
                { details.price }
              </p>
            </div>
          </div>

          <div className="container-button-details">
            <p className="buttons-title">Chegará grátis entre os dias 20 e 23 jun.</p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => addToCard(details) }
            >
              Adicionar ao carrinho
            </button>
            <button type="button" className="second-button-car">
              <Link data-testid="shopping-cart-button" to="/Carrinho">Carrinho</Link>
            </button>
            <p>
              <strong>Devolução grátis.</strong>
              Você tem 7 dias a partir da data de recebimento.
            </p>
            <p>
              <strong> Compra Garantida.</strong>
              Receba o produto que está esperando ou devolvemos o dinheiro.
            </p>
            <p>12 meses de garantia de fábrica.</p>
          </div>
        </div>

      </div>

    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  addToCard: PropTypes.func.isRequired,

};

export default ProductDetails;
