import React from "react";
import AdminSidebar from "../module/admin-sidebar";
import AdminTable from "../module/admin-table";
import AdminCreateModal from "../module/admin-create-modal";
import AdminCreateScheduleModal from "../module/admin-create-schedule-modal";
import AdminAddDentistModal from "../module/admin-add-dentist-modal";
import AdminAddProcedureModal from "../module/admin-add-procedure-modal";
import AdminResetSecretaryModal from "../module/admin-reset-secretary-modal";
import AdminResetPasswordModal from "../module/admin-reset-password-modal";
import AdminFreeMemoryModal from "../module/admin-free-memory-modal";
import AdminEditProcedureModal from "../module/admin-edit-procedure-modal";
import "../../../css/admin.css";
import { Grid, Dimmer } from "semantic-ui-react";
import "semantic-ui-css/components/reset.min.css";
import "semantic-ui-css/components/site.min.css";
import "semantic-ui-css/components/container.min.css";
import "semantic-ui-css/components/icon.min.css";
import "semantic-ui-css/components/message.min.css";
import "semantic-ui-css/components/header.min.css";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import AdminDeleteProcedureModal from "../module/admin-delete-procedure-modal";
import AdminEditDentistModal from "../module/admin-edit-dentist-modal";
import AdminDeleteDentistModal from "../module/admin-delete-dentist-modal";
import AdminEditScheduleModal from "../module/admin-edit-schedule-modal";
import axios from "axios";
import AdminViewScheduleModal from "../module/admin-view-schedule-modal";
import AdminAddUnavailableModal from "../module/admin-add-unavailable-modal";
import AdminDeleteUnavailableModal from "../module/admin-delete-unavailable-modal";
import AdminDeleteScheduleModal from "../module/admin-delete-schedule-modal";
class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.handleItem = this.handleItem.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleTable = this.handleTable.bind(this);
        this.handleUpdateDentistTable = this.handleUpdateDentistTable.bind(
            this
        );
        this.handleUpdateProcedureTable = this.handleUpdateProcedureTable.bind(
            this
        );
        this.handleUpdateScheduleTable = this.handleUpdateScheduleTable.bind(
            this
        );
        this.handleUpdateUnavailableTable = this.handleUpdateUnavailableTable.bind(
            this
        );
        this.handleUpdateModalUsername = this.handleUpdateModalUsername.bind(
            this
        );
        this.handleShowDimmer = this.handleShowDimmer.bind(this);
        this.handleHideDimmer = this.handleHideDimmer.bind(this);
        this.state = {
            activeItem: "Dentist",
            activeModal: "none",
            activeTable: "Dentist",
            dentists: [],
            procedures: [],
            schedule: [],
            unavailable: [],
            activeDimmer: false,
            activeScheduleDimmer: false,
            activeEditDentistDimmer: false,
            username: "",
        };

        this.handleUpdateDentistTable();
        this.handleUpdateProcedureTable();
    }

    handleItem(name) {
        this.setState({
            activeItem: name,
        });
    }

    handleModal(name, data) {
        if (data != undefined) {
            this.setState({
                activeModal: name,
                data: data,
            });
        } else {
            this.setState({
                activeModal: name,
            });
        }
    }

    handleTable(name) {
        this.setState({
            activeTable: name,
        });
    }

    handleUpdateDentistTable() {
        this.handleShowDimmer();
        axios.get("admin/getAllDentists").then((response) => {
            this.setState({
                dentists: [
                    ...response.data.dentists.map((dentist) => {
                        return {
                            key: dentist._id,
                            firstname: dentist.firstname,
                            lastname: dentist.lastname,
                            status: dentist.status,
                            lastLogin: dentist.lastLogin,
                            username: dentist.username,
                        };
                    }),
                ],
            });
            this.handleHideDimmer();
        });
    }

    handleUpdateProcedureTable() {
        this.handleShowDimmer();
        axios.get("admin/getAllProcedures").then((response) => {
            this.setState({
                procedures: [
                    ...response.data.procedures.map((procedure) => {
                        return {
                            key: procedure._id,
                            processname: procedure.processname,
                        };
                    }),
                ],
            });
            this.handleHideDimmer();
        });
    }

    handleUpdateScheduleTable(datakey) {
        this.handleShowScheduleDimmer();
        axios
            .post("admin/getDentistSchedule", { doctorID: datakey })
            .then((res) => {
                this.setState({
                    schedule: res.data.sched,
                });
                this.handleHideScheduleDimmer();
            });
        axios.post("admin/getDoctorSchedule", {doctorID: datakey})
            .then((res)=>{
                this.setState({
                    editSchedule: res.data.docSched,
                    editBreaktime: res.data.breakTime,
                })
            })
    }

    handleUpdateUnavailableTable(datakey) {
        this.handleShowScheduleDimmer();
        axios
            .post("admin/getAllUnavailableDates", { doctorID: datakey })
            .then((res) => {
                this.setState({
                    unavailable: res.data.sched,
                });
                this.handleHideScheduleDimmer();
            });
    }

    handleUpdateModalUsername(datakey) {
        this.handleShowEditDentistDimmer();
        axios.post("admin/getUser", { doctorID: datakey }).then((res) => {
            this.setState({ username: res.data.user.username });
            this.handleHideEditDentistDimmer();
        });
    }

    handleShowDimmer = () => this.setState({ activeDimmer: true });
    handleHideDimmer = () => this.setState({ activeDimmer: false });

    handleShowScheduleDimmer = () =>
        this.setState({ activeScheduleDimmer: true });
    handleHideScheduleDimmer = () =>
        this.setState({ activeScheduleDimmer: false });

    handleShowEditDentistDimmer = () =>
        this.setState({ activeEditDentistDimmer: true });
    handleHideEditDentistDimmer = () =>
        this.setState({ activeEditDentistDimmer: false });

    render() {
        return (
            <>
                <SemanticToastContainer position="top-center"></SemanticToastContainer>
                <Grid
                    columns={2}
                    id="container"
                    style={{ padding: 0 + "px", margin: 0 + "px" }}
                >
                    <AdminSidebar
                        handleItem={this.handleItem}
                        handleTable={this.handleTable}
                        handleModal={this.handleModal}
                        activeItem={this.state.activeItem}
                    />
                    <Grid.Column
                        style={{
                            width: "85%",
                            overflowY: "scroll",
                            maxHeight: "100vh",
                        }}
                    >
                        <Dimmer
                            active={this.state.activeDimmer}
                            inverted
                            id="list-dimmer"
                            style={{ maxHeight: "100%" }}
                        >
                            <div className="ui elastic huge green loader"></div>
                        </Dimmer>
                        <AdminTable
                            activeTable={this.state.activeTable}
                            handleModal={this.handleModal}
                            dentists={this.state.dentists}
                            procedures={this.state.procedures}
                            handleUpdateDentistTable={
                                this.handleUpdateDentistTable
                            }
                            handleUpdateProcedureTable={
                                this.handleUpdateProcedureTable
                            }
                            handleUpdateScheduleTable={
                                this.handleUpdateScheduleTable
                            }
                            handleUpdateUnavailableTable={
                                this.handleUpdateUnavailableTable
                            }
                            handleUpdateModalUsername={
                                this.handleUpdateModalUsername
                            }
                        />
                    </Grid.Column>
                </Grid>
                <AdminCreateModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                ></AdminCreateModal>
                <AdminAddDentistModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    handleUpdateTable={this.handleUpdateDentistTable}
                ></AdminAddDentistModal>
                <AdminCreateScheduleModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateScheduleTable={this.handleUpdateScheduleTable}
                ></AdminCreateScheduleModal>
                <AdminAddProcedureModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    handleUpdateTable={this.handleUpdateProcedureTable}
                ></AdminAddProcedureModal>
                <AdminAddUnavailableModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={
                        this.handleUpdateUnavailableTable
                    }
                ></AdminAddUnavailableModal>
                <AdminResetSecretaryModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                ></AdminResetSecretaryModal>
                <AdminResetPasswordModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                ></AdminResetPasswordModal>
                <AdminFreeMemoryModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                ></AdminFreeMemoryModal>
                <AdminEditProcedureModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={this.handleUpdateProcedureTable}
                ></AdminEditProcedureModal>
                <AdminEditDentistModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={this.handleUpdateDentistTable}
                    username={this.state.username}
                    activeDimmer={this.state.activeEditDentistDimmer}
                ></AdminEditDentistModal>
                <AdminEditScheduleModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={this.handleUpdateScheduleTable}
                    schedule={this.state.editSchedule}
                    breaktime={this.state.editBreaktime}
                ></AdminEditScheduleModal>
                <AdminDeleteProcedureModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={this.handleUpdateProcedureTable}
                ></AdminDeleteProcedureModal>
                <AdminDeleteDentistModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={this.handleUpdateDentistTable}
                ></AdminDeleteDentistModal>
                <AdminDeleteUnavailableModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={this.handleUpdateUnavailableTable}
                ></AdminDeleteUnavailableModal>
                <AdminViewScheduleModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={this.handleUpdateDentistTable}
                    schedule={this.state.schedule}
                    unavailable={this.state.unavailable}
                    activeDimmer={this.state.activeScheduleDimmer}
                ></AdminViewScheduleModal>
                <AdminDeleteScheduleModal
                    handleModal={this.handleModal}
                    activeModal={this.state.activeModal}
                    data={this.state.data}
                    handleUpdateTable={this.handleUpdateScheduleTable}
                    sched_time={this.state.schedule}
                    schedule={this.state.editSchedule}
                    breaktime={this.state.editBreaktime}
                ></AdminDeleteScheduleModal>
            </>
        );
    }
}

export default Admin;
