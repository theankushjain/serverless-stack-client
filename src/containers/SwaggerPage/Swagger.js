import React, { Component } from 'react';
import './Swagger.css'
import SwaggerUI from 'swagger-ui';

import Config from './organization_config.json';

import Sidebar from './Sidebar.js'
import '../../../node_modules/swagger-ui/dist/swagger-ui.css'

//import './resources/swagger.json.js'

export default class Swagger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      organizationConfig: null,
      definitionList: null,
      definitionLink: "https://petstore.swagger.io/v2/swagger.json"
      //definitionLink: "https://devportalassets.s3.amazonaws.com/wildrydes.json"
    }
    this.swaggerhub = this.swaggerhub.bind(this)
    this.getOrganizationData = this.getOrganizationData.bind(this)
    this.updateDefinitionLink = this.updateDefinitionLink.bind(this)
  }

  componentDidUpdate() {
    SwaggerUI({
      domNode: document.getElementById("api-data"),
      url: this.state.definitionLink
    })
  }

  componentWillMount() {
    this.setState({
      organizationConfig:  Config.orgData, //all 4 keys are coming here from config file
    })
  }

  swaggerhub(inputMethod, inputResource, inputParams) {
    let url = ""
    if (inputParams) {
      url = "https://api.swaggerhub.com/apis/" + inputResource + "?" + inputParams
    } else {
      url = "https://api.swaggerhub.com/apis/" + inputResource
    }
    
    return fetch(url, {
        method: inputMethod
    }).then(response => {
      if (response.ok) {
        return response.json()
      } throw new Error('There was an issue requesting the API')
    }).then(json => {
      return json
    })
  }

  getOrganizationData(organization) {
    let inputParams = "page=0&limit=20&sort=NAME&order=ASC"
    let inputResource = organization;
  
    this.swaggerhub('GET', inputResource, inputParams).then(response => {
      this.setState({
        definitionList: response.apis
      })
    })
  }

  updateDefinitionLink(newLink) {
    this.setState({
      definitionLink: newLink
    })
  }

  render() {
    return (
      <div className="Swagger">
        <Sidebar 
          organizationConfig={this.state.organizationConfig}
          definitionList={this.state.definitionList}
          updateDefinitionLink={this.updateDefinitionLink} 
          getOrganizationData={this.getOrganizationData}
        />
        <div id="api-data" />
      </div>
    );
  }
}