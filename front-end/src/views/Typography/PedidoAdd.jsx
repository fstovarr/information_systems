/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import webAddress from '../../helper/web'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class PedidoAdd extends React.Component {
  state = {
    suppliers: [],
    supplier: '',
    name: '',
    description: '',
    quantity: '',
    price: '',
    date: '',
    products: [],
    materia: '',
    clients: []
  }

  componentWillMount() {
    axios.get(webAddress + '/clients/show_clients')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          var data = res.data[i]
          this.setState(prevState => ({
            clients: [...prevState.clients, <MenuItem value={data.id}>{data.name}</MenuItem>]
          }))
        }

        axios.get(webAddress + '/inventories/get_full').then(
          res => {
            for (var i = 0; i < res.data.length; i++) {
              var data = res.data[i]
              this.setState(prevState => ({
                products: [...prevState.products, <MenuItem value={data.id}>{data.name}</MenuItem>]
              }))
            }
          }
        )
      })

  }

  handleAdd() {
    axios.put(webAddress + '/inventories/sell',
      {
        register: {
          client_id: this.state.client,
          inventory_id: this.state.product,
          city: this.state.city,
          address: this.state.address,
          phone: this.state.phone,
          quantity: this.state.quantity,
        }
      }).then(() => {
        this.props.history.push(`typography`)
      })
  }


  render() {
    const { classes } = this.props;
    const handleChange = name => event => {
      console.log(name)
      this.setState({ [name]: event.target.value });
    };
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Añadir Pedido</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>

                    <TextField
                      id="standard-select-currency"
                      select
                      value={this.state.client}
                      onChange={handleChange('client')}
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      fullWidth
                      helperText="Seleccione el cliente"
                      margin="normal"
                    >
                      {this.state.clients}
                    </TextField>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>

                    <TextField
                      id="standard-select-currency"
                      select
                      value={this.state.product}
                      onChange={handleChange('product')}
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      fullWidth
                      helperText="Seleccione el producto"
                      margin="normal"
                    >
                      {this.state.products}
                    </TextField>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      value={this.state.quantity}
                      onChange={handleChange('quantity')}
                      className={classes.textField}

                      label="Cantidad"
                      id="description"
                      fullWidth
                    />
                  </GridItem>

                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      value={this.state.city}
                      onChange={handleChange('city')}
                      label="Ciudad"
                      id="description"
                      fullWidth
                      className={classes.textField}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>

                    <TextField
                      value={this.state.address}
                      onChange={handleChange('address')}
                      label="Dirección"
                      id="description"
                      fullWidth
                      className={classes.textField}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>

                    <TextField
                      value={this.state.phone}
                      onChange={handleChange('phone')}
                      label="Telefono"
                      id="description"
                      fullWidth
                      className={classes.textField}
                    />
                  </GridItem>
                </GridContainer>

              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => this.handleAdd()} >Añadir Pedido</Button>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    );
  }

}

PedidoAdd.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(PedidoAdd);
