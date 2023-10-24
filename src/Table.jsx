import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Table = () => {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({});
  
  const handleNameChange = useCallback((index, name) => {
    const updatedRows = [...rows];
    updatedRows[index].name = name;
    setRows(updatedRows);
  }, [rows]);

  const handleEmailChange = useCallback((index, email) => {
    const updatedRows = [...rows];
    updatedRows[index].email = email;
    setRows(updatedRows);
  }, [rows]);


const handlePhoneChange = useCallback((index, phone) => {
    if (/^\d*$/.test(phone)) {//number regex
      const updatedRows = [...rows];
      updatedRows[index].phone = phone;
      setRows(updatedRows);
    }
  }, [rows]);
  
  const handlePositionChange = useCallback((index, position) => {
    const updatedRows = [...rows];
    updatedRows[index].position = position;
    setRows(updatedRows);
  }, [rows]);

  const toggleEdit = useCallback((index) => {
    const updatedRows = [...rows];
    updatedRows[index].editing = !updatedRows[index].editing;
    setRows(updatedRows);
  }, [rows]);

  const addRow = useCallback(() => {
    setRows([...rows, { name: '', email: '', phone: '', position: '', editing: true }]);
  }, [rows]);

  const confirmRow = useCallback((index) => {
    const newRowData = rows[index];
    
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; //email  regex
  
    if (!newRowData.name || !newRowData.email || !newRowData.phone || !newRowData.position) {
      alert('fill all fields');
    } else if (!emailPattern.test(newRowData.email)) {
      alert('enter a valid email address');
    } else {
      const updatedRows = [...rows];
      updatedRows[index].editing = false;
      setRows(updatedRows);
      setNewRow({});
    }
  }, [rows]);

  const deleteRow = useCallback((index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
    setNewRow({});
  }, [rows]);

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th> Name </th>
            <th> Email </th>
            <th> Phone Number </th>
            <th> Position </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  disabled={!row.editing}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  disabled={!row.editing}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.phone}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  disabled={!row.editing}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.position}
                  onChange={(e) => handlePositionChange(index, e.target.value)}
                  disabled={!row.editing}
                />
              </td>
              <td>
                {row.editing ? (
                  <>
                    <button onClick={() => confirmRow(index)} className="mr-2">
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button onClick={() => toggleEdit(index)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(index)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => deleteRow(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {/* {!row.editing && (
                      <button onClick={() => sendEmail(row.email)}>
                        <FontAwesomeIcon icon={faEnvelope} /> Send Email
                      </button>
                    )} */}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
                    }  

export default Table;
