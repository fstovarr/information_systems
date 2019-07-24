import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import PropTypes from "prop-types";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
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

class InventoryUpdate extends React.Component {
    

    constructor(props) {
        super(props);

        var st = props.location.state;
        this.state = {
          id: st[1],
          quantity: st[2],
          retailer_cost: st[3],
          wholesale_cost: st[4]
        };

        this.addToInventory = this.addToInventory.bind(this);
        this.deleteToInventory = this.deleteToInventory.bind(this);
    }
    x
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    addToInventory() {
      Http.patch("/inventories/" + this.state.id, this.state).then(res => this.props.history.push("/admin/table")).catch(err => console.log("ERROR " + err));
    }

    deleteToInventory() {
      Http.delete("/inventories/" + this.state.id, this.state).then(res => this.props.history.push("/admin/table")).catch(err => console.log("ERROR " + err));
    }

    render() {
        const {classes} = this.props;

        return <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Actualizar producto</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    value={this.state.quantity}
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
                    value={this.state.retailer_cost}
                    onChange={this.handleChange('retailer_cost')}
                    label="Costo minorista"
                    id="retailer"
                    fullWidth
                    className={classes.textField}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    value={this.state.wholesale_cost}
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
              <Button color="primary" onClick={this.addToInventory}>Actualizar inventario</Button>
              <Button color="primary" onClick={this.deleteToInventory}>Eliminar de inventario</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>;
    }
}

export default withStyles(styles)(InventoryUpdate);