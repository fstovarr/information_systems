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
    materials: [],
    history: []
  }

  handleEdit(id){
    this.props.history.push(`materia/`+id)

  }

  handleAdd(id) {
    this.props.history.push('materia_add')
  }

  handleDelete(id) {
    axios({
      method: 'delete', url: webAddress + '/raw_materials/'+id})
      .then(()=>{
        window.location.reload();
      })

  }

  handleAdd2(){
    this.props.history.push('materia_additional')

  }

  handleAdd3() {
    this.props.history.push('materia_minus')

  }
  componentWillMount() {
    axios.get(webAddress + '/raw_materials')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          var data = res.data[i]
          console.log(data)
          this.setState(prevState => ({
            materials: [...prevState.materials, [data.id.toString(), data.name, data.description, data.quantity.toString(), <div>
              
              <Button color="secondary" onClick={() => this.handleDelete(data.id.toString())}>
                Eliminar
                </Button>
            </div>]]
          }))
        }



        axios.get(webAddress + '/raw_materials/get_history').then(res =>{
          for (var i = 0; i < res.data.length; i++) {
            var data = res.data[i]
            console.log(data)
            this.setState(prevState => ({
              history: [...prevState.history, [ data.cname, data.name, data.cost.toString(), data.arrived_at]]
            }))
          }
        })
      })
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>

            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Materia prima disponible
            </h4>

              </CardHeader>
              <CardBody>

                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Nombre", "Descripción", "Cantidad", "Opciones"]}
                  tableData={this.state.materials}
                />
              </CardBody>
            </Card>
            <Button variant="contained" color="primary" onClick={() => this.handleAdd()} className={classes.button}>
              Crear materia prima
          </Button>
            <Button style={{ marginLeft: 20 }} variant="contained" color="primary" onClick={() => this.handleAdd2()} className={classes.button}>
              Añadir materia prima
          </Button>
            <Button style={{ marginLeft: 20 }} variant="contained" color="primary" onClick={() => this.handleAdd3()} className={classes.button}>
              Reportar gasto
          </Button>
          </GridItem>
        </GridContainer>


        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>

            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Historial de transacciones
            </h4>

              </CardHeader>
              <CardBody>

                <Table
                  tableHeaderColor="primary"
                  tableHead={["Nombre proveedor", "Nombre producto", "Valor", "Fecha"]}
                  tableData={this.state.history}
                />
              </CardBody>
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
