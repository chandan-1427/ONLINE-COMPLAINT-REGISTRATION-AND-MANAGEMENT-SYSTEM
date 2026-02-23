import { Card, InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchUtility = ({ placeholder, value, onChange }) => (
  <Card className="border-0 shadow-sm mb-4 rounded-3">
    <Card.Body className="p-2">
      <InputGroup size="sm">
        <InputGroup.Text className="bg-white border-end-0 text-muted ps-3">
          <FaSearch size={14} />
        </InputGroup.Text>
        <Form.Control
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-start-0 shadow-none py-2"
        />
      </InputGroup>
    </Card.Body>
  </Card>
);

export default SearchUtility;