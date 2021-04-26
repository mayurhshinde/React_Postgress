import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';




export default class EmployeesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);

        this.state = {
            columnDefs: [
                { headerName: "First Name", field: "firstname" },
                { headerName: "Last Name", field: "lastname" },
                { headerName: "Address", field: "address" },
                { headerName: "Email", field: "email" },
                { headerName: "DOB", field: "dob" }
            ],
            Employee: [],
            currentEmployee: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveEmployee();
    }

    retrieveEmployee() {
        EmployeeDataService.getAll()
            .then(response => {
                this.setState({
                    Employee: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (

            <div
                className="ag-theme-balham"
                style={{ height: '200px', width: '600px' }}>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.Employee}>
                </AgGridReact>
            </div>
        );
    }
}