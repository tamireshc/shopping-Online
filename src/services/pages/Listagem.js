import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../App.css';
import Card from '../../components/Card';
import { getProductsFromQuery, getCategories, getProductsFromCategory } from '../api';
import car from './image/car.png';

class Listagem extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      products: '',
      categorys: '',
      productsFromCategory: '',

    };
  }

  componentDidMount() {
    this.getCategoriesfunction();
  }

  searchProduct = async (query) => {
    const { products } = this.state;
    const productsget = await getProductsFromQuery(query);
    console.log(productsget.results);

    this.setState({
      products: productsget.results,
      productsFromCategory: '',

    });
    return products.results;
  }

  getProductsFromCategoryFunction = async (id) => {
    const productsCategory = await getProductsFromCategory(id);
    this.setState({
      productsFromCategory: productsCategory.results,
      products: '',
    });
  }

  getCategoriesfunction = async () => {
    const categoriaGet = await getCategories();
    console.log(categoriaGet);
    this.setState({
      categorys: categoriaGet,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { inputValue, products, categorys, productsFromCategory } = this.state;
    const { addToCard } = this.props;
    return (
      <div className="App">
        <div className="categorias">
          <p> Escolha uma categoria</p>
          { categorys && categorys.map((item) => (
            <button
              type="button"
              data-testid="category"
              key={ item.id }
              onClick={ () => this.getProductsFromCategoryFunction(item.id) }
            >
              { item.name }
            </button>)) }

        </div>

        <div>
          <header>
            <img src={ car } alt="carrinho" />
            <h1>Shopping Online</h1>
          </header>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <div className="search">
            <input
              type="text"
              name="inputValue"
              data-testid="query-input"
              onChange={ this.handleChange }
              value={ inputValue }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ () => this.searchProduct(inputValue) }
            >
              Pesquisar
            </button>
            <Link data-testid="shopping-cart-button" to="/Carrinho">
              <button type="button" className="button-car">
                <img
                  src={ car }
                  alt="carrinhoIMG"
                />
                <p>Ir para o Carrinho</p>
              </button>
            </Link>
          </div>
          { products && !products[0] && <p>Nenhum produto foi encontrado</p> }

          <section className="products-list">

            { products ? products.map((item) => (
              <div key={ item.id } className="products">
                <Card
                  name={ item.title }
                  image={ item.thumbnail }
                  price={ item.price }
                  id={ item.id }
                />
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => addToCard(item) }
                >
                  Adicionar ao carrinho
                </button>
              </div>))
              : '' }
          </section>

          <section className="products-list">

            { productsFromCategory && productsFromCategory.map((item) => (
              <div key={ item.permalink } className="products">
                <Card
                  name={ item.title }
                  image={ item.thumbnail }
                  price={ item.price }
                  id={ item.id }
                />
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => addToCard(item) }
                >
                  Adicionar ao carrinho
                </button>
              </div>)) }

          </section>

        </div>
      </div>
    );
  }
}
Listagem.propTypes = {
  addToCard: PropTypes.func.isRequired,
};
export default Listagem;
