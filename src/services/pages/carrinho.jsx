import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import car from './image/car.png';

class Carrinho extends React.Component {
  render() {
    const { elements, increaseQtd, decreaseQtd } = this.props;
    // console.log(elements.qtdx);
    // const { qtd } = this.state;

    return (
      <div className="list-on-car">
        <Link to="/">
          <header className="header-car">
            <img src={ car } alt="carrinho" />
            <h1>Shopping Online</h1>
          </header>
        </Link>
        {/* https://www.delftstack.com/pt/howto/javascript/javascript-remove-duplicates-from-an-array/
        Removendo itens adicionados repedtidos */}
        <section className="car-item-container">
          <div>
            { elements ? (
              elements
                .filter((ele, pos) => elements.indexOf(ele) === pos)
                .map((item) => (
                  <div key={ item.title } className="car-item">
                    <p data-testid="shopping-cart-product-name">{ item.title }</p>
                    <img src={ item.thumbnail } alt="imagem" /> <br />

                    <p>{ item.price.toFixed(2) }</p><br />
                    <div className="buttonsCar">
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        onClick={ () => decreaseQtd(item) }
                      >
                        -
                      </button>
                      <p data-testid="shopping-cart-product-quantity">
                        { item.qtdx }
                      </p>
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        onClick={ () => increaseQtd(item) }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <h1 data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </h1>
            ) }
          </div>
          <div>
            <p>Subtotal</p>
          </div>
        </section>
      </div>
    );
  }
}

Carrinho.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object).isRequired,
  increaseQtd: PropTypes.func.isRequired,
  decreaseQtd: PropTypes.func.isRequired,
};

export default Carrinho;
