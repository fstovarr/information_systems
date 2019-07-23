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
import React, { useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Http from "services/RestService.js";
import Button from "components/CustomButtons/Button.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends React.Component {
  vari = [
    ["1", "Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
    ["2", "Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
    ["3","Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
    ["4","Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
    ["5","Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
    ["6","Mason Porter", "Chile", "Gloucester", "$78,615"]
  ];

  state = { inventory:[] }

  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    this.props.history.push('inventory/add');
  }

  makeInventoryRequest(setInventory) {
    Http.get("/inventories").then(res => {
      var arr = [];
  
      Object.keys(res["data"]).forEach(key => {
        var tmp = [];
        if(res["data"][key] != null){
          Object.keys(res["data"][key]).forEach(key2 => {
            if(res["data"][key][key2] == null)
              tmp.push("No disponible");
            else
              tmp.push(res["data"][key][key2]);
          });
        }
        arr.push(tmp);
      });
  
      this.setState({
        inventory: arr
      });
    }).catch(err => console.log("ERROR " + err));
  }

  render() {
    const { classes } = this.props;

    if(this.state.inventory == null || this.state.inventory == undefined || this.state.inventory == 0){
      this.makeInventoryRequest();
    }

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Inventario</h4>
              <p className={classes.cardCategoryWhite}>
                Aquí encontrará el inventario en bodega que ha sido registrado.
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["id", "Producto", "Cantidad", "Costo minorista", "Costo"]}
                tableData={this.state.inventory}
              />
            </CardBody>
          </Card>
          <Button color="primary" onClick={this.handleAdd}>Agregar inventario</Button>
        </GridItem>
        </GridContainer>
    );
  }
}

TableList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(TableList);
