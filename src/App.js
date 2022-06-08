import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Listagem from './services/pages/Listagem';
import Carrinho from './services/pages/carrinho';
import ProductDetails from './services/pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      elementsOnCar: '',
    };
  }

  increaseQtd = (item) => {
    const { elementsOnCar } = this.state;
    const indexItem = elementsOnCar.indexOf(item);
    item.qtdx += 1;
    elementsOnCar[indexItem] = item;
    this.setState({
      elementsOnCar,
    });
  }

  decreaseQtd = (item) => {
    const { elementsOnCar } = this.state;
    const indexItem = elementsOnCar.indexOf(item);
    if (item.qtdx > 1) {
      item.qtdx -= 1;
    }
    elementsOnCar[indexItem] = item;
    this.setState({
      elementsOnCar,
    });
  };

  addToCard = (item) => {
    const { elementsOnCar } = this.state;
    this.setState({
      elementsOnCar: [...elementsOnCar, { ...item, qtdx: 1 }],
    });
  }

  render() {
    const { elementsOnCar } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => <Listagem addToCard={ this.addToCard } /> }
          />
          <Route
            path="/carrinho"
            render={ () => (<Carrinho
              elements={ elementsOnCar }
              increaseQtd={ this.increaseQtd }
              decreaseQtd={ this.decreaseQtd }
            />) }
          />
          <Route
            path="/product-details/:id"
            render={ (routerProps) => (
              <ProductDetails { ...routerProps } addToCard={ this.addToCard } />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
