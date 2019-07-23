import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import PropTypes from "prop-types";
// @material-ui/core components
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
import Http from "services/RestService.js";

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

class InventoryAdd extends React.Component {
    state = {
        name: "",
        quantity: 0,
        retailer_cost: 0,
        wholesale_cost: 0
    }

    constructor(props) {
        super(props);
        this.addToInventory = this.addToInventory.bind(this);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    addToInventory() {
        Http.post("/inventories", this.state).then(res => console.log(res)).catch(err => console.log("ERROR " + err));
    }

    render() {
        const {classes} = this.props;

        return <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Añadir producto a inventario</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    // value={this.state.name}
                    onChange={this.handleChange('name')}
                    label="Nombre del producto"
                    id="name"
                    fullWidth
                    className={classes.textField}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    // value={this.state.phone}
                    onChange={this.handleChange('quantity')}
                    label="Cantidad"
                    id="quantity"
                    fullWidth
                    className={classes.textField}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    // value={this.state.address}
                    onChange={this.handleChange('retailer_cost')}
                    label="Costo minorista"
                    id="retailer"
                    fullWidth
                    className={classes.textField}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    // value={this.state.address}
                    onChange={this.handleChange('wholesale_cost')}
                    label="Costo mayorista"
                    id="wholesale"
                    fullWidth
                    className={classes.textField}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.addToInventory}>Añadir a inventario</Button>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>;
    }
}

export default withStyles(styles)(InventoryAdd);