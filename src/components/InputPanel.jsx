function InputPanel() {
  return (
    <div>
      {/* Main Heading */}
      <h2>Paste Your Message Below 👇</h2>

      {/* Message Textarea */}
      <textarea
        placeholder="Paste your headline, email, website copy, or pitch here..."
        rows="8"
        cols="60"
        style={{
          padding: "10px",
          fontSize: "16px",
          marginTop: "10px",
          width: "100%",
        }}
      />

      {/* Target Persona Dropdown */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="persona">Target Persona: </label>
        <select
          id="persona"
          name="persona"
          style={{ padding: "8px", fontSize: "16px", marginLeft: "10px" }}
        >
          <option value="">Select Persona</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Talent Acquisition">Talent Acquisition</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Product Management">Product Management</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="RevOps">RevOps</option>
          <option value="Customer Success">Customer Success</option>
          <option value="Legal/Compliance">Legal/Compliance</option>
          <option value="Finance/Procurement">Finance/Procurement</option>
          <option value="Executive Leadership">Executive Leadership</option>
          <option value="Other">Other (Specify)</option>
        </select>
      </div>

      {/* Target Level Dropdown */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="level">Target Level: </label>
        <select
          id="level"
          name="level"
          style={{ padding: "8px", fontSize: "16px", marginLeft: "10px" }}
        >
          <option value="">Select Level</option>
          <option value="Individual Contributor">
            Individual Contributor (IC)
          </option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="Vice President">Vice President (VP)</option>
          <option value="C-Suite Executive">C-Suite Executive</option>
        </select>
      </div>
      {/* Target Industry Dropdown */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="industry">Target Industry: </label>
        <select
          id="industry"
          name="industry"
          style={{ padding: "8px", fontSize: "16px", marginLeft: "10px" }}
        >
          <option value="">Select Industry</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Software Development">Software Development</option>
          <option value="Automotive">Automotive</option>
          <option value="Legal Services">Legal Services</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="E-Commerce">E-Commerce</option>
          <option value="Education">Education</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Retail">Retail</option>
          <option value="Other">Other (Specify)</option>
        </select>
      </div>

      {/* Final Div */}
    </div>
  );
}

export default InputPanel;
