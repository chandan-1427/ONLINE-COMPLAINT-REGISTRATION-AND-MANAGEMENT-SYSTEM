import { Container, Alert, Spinner } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

import ManagementHeader from "./common/ManagementHeader";
import SearchUtility from "./common/SearchUtility";
import DeleteConfirmationModal from "./common/DeleteConfirmationModal";
import DataGrid from "./common/DataGrid";
import EditUserModal from "./common/EditUserModal";

// Import Custom Hook
import { useUserManagement } from "./hooks/useUserManagement";

const UserInfo = () => {
  const { state, actions } = useUserManagement("ordinary");

  if (state.loading) return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner animation="grow" variant="primary" size="sm" />
    </div>
  );

  return (
    <Container fluid className="py-3 bg-light min-vh-100">
      <ManagementHeader 
        title="User Management" 
        subtitle="Manage customer accounts" 
        count={state.total} 
      />

      {state.error && <Alert variant="danger" dismissible onClose={() => actions.setError("")}>{state.error}</Alert>}
      {state.success && <Alert variant="success" dismissible onClose={() => actions.setSuccess("")}>{state.success}</Alert>}

      <SearchUtility 
        placeholder="Search users..." 
        value={state.search} 
        onChange={(e) => actions.setSearch(e.target.value)} 
      />

      <DataGrid 
        data={state.filteredData}
        columns={[{ label: "User Name" }, { label: "Contact" }, { label: "Status" }]}
        badgeText="Ordinary"
        renderIcon={<FaUser className="text-primary me-2" />}
        onEdit={(user) => { 
          actions.setSelectedItem(user); 
          actions.setEditData(user); 
          actions.setModals(p => ({ ...p, edit: true })); 
        }}
        onDelete={(user) => { 
          actions.setSelectedItem(user); 
          actions.setModals(p => ({ ...p, delete: true })); 
        }}
      />

      <EditUserModal 
        show={state.modals.edit} 
        onHide={() => actions.setModals(p => ({ ...p, edit: false }))} 
        data={state.editData}
        title="Edit User Details"
        onChange={(e) => actions.setEditData({...state.editData, [e.target.name]: e.target.value})}
        onSave={actions.handleUpdate}
        processing={state.processing}
      />

      <DeleteConfirmationModal 
        show={state.modals.delete} 
        onHide={() => actions.setModals(p => ({ ...p, delete: false }))} 
        onConfirm={actions.handleDelete} 
        itemName={state.selectedItem?.name} 
        processing={state.processing} 
      />
    </Container>
  );
};

export default UserInfo;