import { Container, Alert, Spinner } from "react-bootstrap";
import { FaUserShield } from "react-icons/fa";

// Reusable UI Components
import ManagementHeader from "./common/ManagementHeader";
import SearchUtility from "./common/SearchUtility";
import DeleteConfirmationModal from "./common/DeleteConfirmationModal";
import DataGrid from "./common/DataGrid";
import EditUserModal from "./common/EditUserModal";

// Reusable Logic Hook
import { useUserManagement } from "./hooks/useUserManagement";

const AgentInfo = () => {
  // We pass "agent" to the hook to target the correct API endpoints
  const { state, actions } = useUserManagement("agent");

  if (state.loading) return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-white">
      <Spinner animation="grow" variant="primary" size="sm" />
    </div>
  );

  return (
    <Container fluid className="py-3 bg-light min-vh-100">
      <ManagementHeader 
        title="Agent Management" 
        subtitle="Monitor and manage service agent accounts" 
        count={state.total} 
      />

      {state.error && (
        <Alert variant="danger" dismissible onClose={() => actions.setError("")} className="small py-2 border-0 shadow-sm">
          {state.error}
        </Alert>
      )}
      
      {state.success && (
        <Alert variant="success" dismissible onClose={() => actions.setSuccess("")} className="small py-2 border-0 shadow-sm">
          {state.success}
        </Alert>
      )}

      <SearchUtility 
        placeholder="Search by agent name or email..." 
        value={state.search} 
        onChange={(e) => actions.setSearch(e.target.value)} 
      />

      <DataGrid 
        data={state.filteredData}
        columns={[{ label: "Agent Name" }, { label: "Contact Info" }, { label: "Status" }]}
        badgeText="Agent"
        renderIcon={<FaUserShield className="text-primary me-2" size={14} />}
        onEdit={(agent) => { 
          actions.setSelectedItem(agent); 
          actions.setEditData(agent); 
          actions.setModals(p => ({ ...p, edit: true })); 
        }}
        onDelete={(agent) => { 
          actions.setSelectedItem(agent); 
          actions.setModals(p => ({ ...p, delete: true })); 
        }}
      />

      <EditUserModal 
        show={state.modals.edit} 
        onHide={() => actions.setModals(p => ({ ...p, edit: false }))} 
        data={state.editData}
        title="Edit Agent Details"
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
        itemType="Agent"
      />
    </Container>
  );
};

export default AgentInfo;