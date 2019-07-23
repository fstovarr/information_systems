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

class MateriaPrimaAdd extends React.Component{
  state = {
    suppliers: [],
    supplier: '',
    name: '',
    description: '',
    quantity: '',
    price: '',
    date: '',
  }

  componentWillMount(){
    axios.get(webAddress + '/clients/show_suppliers')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          var data = res.data[i]
          this.setState(prevState => ({
            suppliers: [...prevState.suppliers, <MenuItem value={data.id}>{data.name}</MenuItem>]
          }))
        }
      })

  }
  
  handleAdd(){
    axios.post(webAddress+'/raw_materials',
    {raw_material: {
      name: this.state.name,
      description: this.state.description,
      quantity: 0,
    }}).then(()=>{
      this.props.history.push(`materia`)
    })
  }
  

  render(){
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
                <h4 className={classes.cardTitleWhite}>Crear Materia Prima</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.name} 
                      onChange={handleChange('name')}
                      label="Name"
                      id="name"
                      fullWidth
                      className={classes.textField}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      value={this.state.description}
                      onChange={handleChange('description')}
                      label="Descripción"
                      id="description"
                      fullWidth
                      className={classes.textField}
                    />
                  </GridItem>
                </GridContainer>
                
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => this.handleAdd()} >Crear Materia</Button>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    );
  }
  
}

MateriaPrimaAdd.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(MateriaPrimaAdd);
