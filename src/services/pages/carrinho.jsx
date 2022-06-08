import React from 'react';
import PropTypes from 'prop-types';

class Carrinho extends React.Component {
  render() {
    const { elements, increaseQtd, decreaseQtd } = this.props;
    // console.log(elements.qtdx);
    // const { qtd } = this.state;

    return (
      <div>
        {/* https://www.delftstack.com/pt/howto/javascript/javascript-remove-duplicates-from-an-array/
        Removendo itens adicionados repedtidos */}
        {elements ? (
          elements
            .filter((ele, pos) => elements.indexOf(ele) === pos)
            .map((item) => (
              <div key={ item.title }>
                <p data-testid="shopping-cart-product-name">{item.title}</p>
                <img src={ item.thumbnail } alt="imagem" />

                <p>{item.price}</p>
                <div className="buttonsCar">
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => decreaseQtd(item) }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">{item.qtdx}</p>
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
        )}
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
