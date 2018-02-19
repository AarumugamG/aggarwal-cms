import React from "react";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Header from '../header';

function checkStatus(cell, row) {
  return <span>{row.status === "SHOW"?"Active":"Inactive"}</span>;
}


class LevelTwoSubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      indCountSize:0
    };
  }
  componentDidMount() {
    axios.get('http://35.200.158.71:8080/v1.0/category')
      .then(response => {
        const category = [];
        response.data.categories.filter(el => {
          el.subCategoryList1.filter(elem => {
            elem.subCategoryList2.filter(elem2 => {
              elem2.subCategoryList3.filter(elem3 => {
                elem3.main = el.name;
                elem3.subMain = elem.name;
                elem3.subMain2 = elem2.name;
                category.push(elem3);
              });
            });
          });
        });
        this.setState({
          data:category
        });
      });  
  }
  serialNumber() {
    this.state.indCountSize += 1;
    return <span>{this.state.indCountSize}</span>;
  }
  productIcon(cell, row) {
    return <img src={row.image} alt="" />;
  }
  render() {
    const { data } = this.state;
    return (<div>
    	<Header />
        <div className="ui container">
          <h1>Category Management</h1>
          <h4>2 level Sub Category</h4>
          <BootstrapTable 
            data={data}
            search
            pagination>
            <TableHeaderColumn isKey={true} dataField='id' width="70" dataFormat={this.serialNumber.bind(this)}>S.NO.</TableHeaderColumn>
            <TableHeaderColumn dataField='image' width="80" dataFormat={this.productIcon.bind(this)}>Icon</TableHeaderColumn>
            <TableHeaderColumn dataField='name' width="250">Name</TableHeaderColumn>
            <TableHeaderColumn dataField='main' width="150">Main Category</TableHeaderColumn>
            <TableHeaderColumn dataField='subMain'>Sub Category</TableHeaderColumn>
            <TableHeaderColumn dataField='subMain2'>2 level Sub Category</TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataFormat={checkStatus}>Status</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>);
  }
}

export default LevelTwoSubCategory;