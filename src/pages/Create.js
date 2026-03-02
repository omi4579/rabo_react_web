import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Create = () => {
  const navigate = useNavigate();
  const [data,setData] = useState({
    title : "",
    description : "",
    priority : "",
    status : ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev, 
      [name] : value 
    }))
  }
  const submitTask = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/tasks`,
      {
        method : "POST",
        headers : { "Content-Type": "application/json" },
        body : JSON.stringify(data)
      }
    )
    .then(res => res.json())
    .then(result => {
      setData({ title: "", description: "", priority: "", status: "" });
      alert("Task Created Successfully!");
      navigate("/");
    })
    .catch(err => { 
      alert(err)
    });
  }

  const containerStyle = { padding: "20px", fontFamily: "Arial, sans-serif" };
  const headingStyle = { marginBottom: "15px", color: "#333" };
  const linkStyle = {
    display: "inline-block",
    marginBottom: "15px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#2196F3",
    padding: "6px 12px",
    borderRadius: "5px"
  };
  const inputStyle = {
    display: "block",
    width: "300px",
    padding: "8px 12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none"
  };
  const selectStyle = { ...inputStyle };
  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Create Task</h1>
      <Link to="/" style={linkStyle}>Back to Tasks List</Link>
      <form onSubmit={ submitTask }>
      <input
        placeholder="Enter Title Here...!"
        name = "title"
        onChange = {handleChange}
        value={ data.title }
        style={inputStyle}
        required
      />
      <input
        placeholder="Enter Description Here...!"
        name = "description"
        onChange = {handleChange}
        value={ data.description }
        style={inputStyle}
        required
      />
      <select
        placeholder="Select Priority Here...!"
        name = "priority"
        onChange = {handleChange}
        value={ data.priority }
        style={selectStyle}
        required
      >
        <option value ="">Select Priority</option>
        <option value ="low">Low</option>
        <option value ="medium">Medium</option>
        <option value ="high">High</option>
      </select>
      <select
        placeholder="Select Status Here...!"
        name = "status"
        onChange = {handleChange}
        value={ data.status }
        style={selectStyle}
        required
      >
        <option value ="">Select Status</option>
        <option value ="pending">Pending</option>
        <option value ="accepted">Accepted</option>
        <option value ="rejected">Rejected</option>
      </select>
      <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
}

export default Create;
