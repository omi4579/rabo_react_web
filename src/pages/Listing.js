import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Listing = () => {
  const [tasks,setTasks] = useState([]);
  const [searchtext, setSearchtext] = useState('');
  const fetchTasks = (query = '') => {
    fetch(`http://localhost:5000/api/tasks${query ? '?title=' + query : ''}`)
      .then(res => res.json())
      .then(result => setTasks(result))
      .catch(err => console.error(err));
  };
  useEffect(() => {
    fetchTasks();
  },[]);
  const handleSeach = (e) => {
    setSearchtext(e.target.value);
    fetchTasks(e.target.value);
  }
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "x-admin-key": "secret123"  // ✅ custom header
      }
    })
    .then(res => res.json())
    .then(result => {
      alert("Task deleted successfully!");
      fetchTasks(searchtext);
    })
    .catch(err => alert(err.message || "Error deleting task"));
  }
  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", color: "#333", marginBottom: "10px" }}>Tasks List</h1>
        <Link 
          to="/create" 
          style={{ 
            display: "inline-block", 
            marginBottom: "10px", 
            textDecoration: "none", 
            color: "white", 
            backgroundColor: "#4CAF50", 
            padding: "8px 15px", 
            borderRadius: "5px" 
          }}
        >Go to Create Task</Link>
        <br/>
        <input 
          name = "searchtext"
          value = { searchtext }
          placeholder= "Enter Title here...!" 
          style={{
            padding: "8px 12px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            marginTop: "10px"
          }}
          onChange={ handleSeach }
        />
      </div>
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Id</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Title</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Description</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Priority</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map((data,index) => (
                <tr key={index} style={index % 2 === 0 ? {} : { backgroundColor: "#f9f9f9" }}>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>{data.id}</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>{data.title}</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>{data.description}</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>{data.priority}</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>{data.status}</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                    <button
                      onClick={() => handleDelete(data.id)}
                      style={{
                        padding: "5px 10px",
                        color: "white",
                        backgroundColor: "#f44336",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Listing;
