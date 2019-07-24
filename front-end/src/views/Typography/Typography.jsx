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
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from 'axios';
import webAddress from '../../helper/web'
import Button from '@material-ui/core/Button';
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


class Dashboard extends React.Component {
  state = {
    pedidos: [],
  }

  handleEdit(id) {
    this.props.history.push(`materia/` + id)

  }

  handleAdd(id) {
    this.props.history.push('pedido_add')
  }

  handleDelete(id) {
    axios({
      method: 'delete', url: webAddress + '/raw_materials/' + id
    })
      .then(() => {
        window.location.reload();
      })

  }

  handleAdd2() {
    this.props.history.push('materia_additional')

  }

  handleAdd3() {
    this.props.history.push('materia_minus')

  }
  componentWillMount() {
    axios.get(webAddress + '/inventories/get_sell')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          var data = res.data[i]
          console.log(data)
          this.setState(prevState => ({
            pedidos: [...prevState.pedidos, [data.cname, data.name, data.quantity, data.city]]
          }))
        }



      })
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>

            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Historial de pedidos
            </h4>

              </CardHeader>
              <CardBody>

                <Table
                  tableHeaderColor="primary"
                  tableHead={["Nombre del cliente", "Nombre producto", "Cantidad", "Ciuidad"]}
                  tableData={this.state.pedidos}
                />
              </CardBody>
              <Button variant="contained" color="primary" onClick={() => this.handleAdd()} className={classes.button}>
                Crear pedido
              </Button>
            </Card>

          </GridItem>
        </GridContainer>

      </div>

    );
  }

}

Dashboard.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Dashboard);
