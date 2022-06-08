import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        <p data-testid="product-detail-name">{ details.title }</p>
        <img src={ details.thumbnail } alt="preco" />
        <p>{ details.price }</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addToCard(details) }
        >
          Adicionar ao carrinho
        </button>
        <button type="button">
          <Link data-testid="shopping-cart-button" to="/Carrinho">Carrinho</Link>
        </button>

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
