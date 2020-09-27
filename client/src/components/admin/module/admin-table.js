import React from "react";
import AdminDentistTable from "./admin-dentist-table";
import AdminProcedureTable from "./admin-procedure-table";

class AdminTable extends React.Component {
    render() {
        let { activeTable, dentists, procedures } = this.props;
        let table;
        if (activeTable === "Dentist") {
            table = (
                <AdminDentistTable
                    handleHideDimmer={this.handleHideDimmer}
                    handleShowDimmer={this.handleShowDimmer}
                    handleModal={this.props.handleModal}
                    dentists={dentists}
                    handleUpdateTable={this.props.handleUpdateDentistTable}
                    handleUpdateScheduleTable={
                        this.props.handleUpdateScheduleTable
                    }
                    handleUpdateUnavailableTable={
                        this.props.handleUpdateUnavailableTable
                    }
                    handleUpdateModalUsername={
                        this.props.handleUpdateModalUsername
                    }
                ></AdminDentistTable>
            );
        } else if (activeTable === "Procedure") {
            table = (
                <AdminProcedureTable
                    handleHideDimmer={this.handleHideDimmer}
                    handleShowDimmer={this.handleShowDimmer}
                    handleModal={this.props.handleModal}
                    procedures={procedures}
                    handleUpdateTable={this.props.handleUpdateProcedureTable}
                ></AdminProcedureTable>
            );
        }
        return <>{table}</>;
    }
}

export default AdminTable;
