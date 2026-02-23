import React from "react";
import { Card } from "react-bootstrap";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <>
      <Card className="border-0 shadow-sm rounded-3 h-100 overflow-hidden">
        <Card.Body className="p-3 d-flex align-items-center">
          {/* Icon Container with dynamic background opacity */}
          <div 
            className={`stat-icon-wrapper bg-${color} bg-opacity-10 text-${color} d-flex align-items-center justify-content-center me-3`}
            style={{ width: "42px", height: "42px", borderRadius: "10px" }}
          >
            {React.cloneElement(icon, { size: 18 })}
          </div>

          <div>
            <div 
              className="text-muted fw-bold text-uppercase mb-1" 
              style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
            >
              {title}
            </div>
            <h5 className="fw-bold mb-0 text-dark" style={{ lineHeight: 1.2 }}>
              {value}
            </h5>
          </div>
        </Card.Body>
      </Card>

      <style>
        {`
          .stat-icon-wrapper {
            transition: transform 0.2s ease-in-out;
          }
          .border-0:hover .stat-icon-wrapper {
            transform: scale(1.05);
          }
        `}
      </style>
    </>
  );
};

export default StatCard;