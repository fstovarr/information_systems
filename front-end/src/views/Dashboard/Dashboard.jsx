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
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import webAddress from "../../helper/web"
import axios from "axios"
import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0,
    expenses: [],
    raw_materials: [],
    raw_materials_label: [],
    expenses_label: [],
  };


  componentWillMount(){
    axios.get(webAddress + '/raw_materials/get_expenses')
          .then(res => {
            for (var i = 0; i < res.data.length; i++) {
              var data = res.data[i]
              this.setState(prevState => ({
                expenses: [...prevState.expenses, data.cost],
                expenses_label: [...prevState.expenses_label, data.date]
              }))
            }

            axios.get(webAddress + '/raw_materials')
            .then(res => {
              for (var i = 0; i < res.data.length; i++) {
              var data = res.data[i]
              this.setState(prevState => ({
                raw_materials: [...prevState.raw_materials, data.quantity],
                raw_materials_label: [...prevState.raw_materials_label, data.name]
              }))
            }
            })
          });
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    const expenses_data = {
      labels: this.state.expenses_label,
      series: [this.state.expenses]
    }
    const raw_materials_data = {
      labels: this.state.raw_materials_label,
      series: [this.state.raw_materials]
    }
    return (
      <div>
        
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Ventas</h4>
                
              </CardBody>
              <CardFooter chart>
                
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={expenses_data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Gastos</h4>
                
              </CardBody>
              <CardFooter chart>
                
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={raw_materials_data}
                  type="Bar"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Materia prima</h4>
                
              </CardBody>
              <CardFooter chart>
                
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
