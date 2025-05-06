import { useState } from "react";
import styles from "../styles/InputPanel.module.css";

function InputPanel() {
  const [userMessage, setUserMessage] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { scores, rewrite } = parseScores(aiResult);

  async function handleSubmit() {
    if (!userMessage.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      const fakeAiResponse = `
Clarity: 8/10
Emotional Relevance: 7/10
Buzzword Density: 3/10
Persona Fit: 9/10

Suggested Rewrite:
"Cut through the noise. Discover complete asset visibility, fast."
      `.trim();

      setAiResult(fakeAiResponse);
      setIsLoading(false);
    }, 1500);
  }

  function handleReset() {
    setUserMessage("");
    setSelectedPersona("");
    setSelectedIndustry("");
    setSelectedLevel("");
    setAiResult("");
    setIsLoading(false);
  }

  function handleCopy() {
    if (rewrite) {
      navigator.clipboard.writeText(rewrite).then(() => {
        alert("✂️ Suggested Rewrite copied to clipboard!");
      });
    }
  }

  function parseScores(aiResult) {
    if (!aiResult) return { scores: [], rewrite: "" };

    const lines = aiResult.split("\n").map((line) => line.trim());
    const scores = [];
    let rewrite = "";

    for (const line of lines) {
      if (line.includes(":") && line.includes("/10")) {
        const [category, score] = line.split(":");
        scores.push({ category: category.trim(), score: score.trim() });
      }
      if (line.startsWith('"') || line.startsWith("'")) {
        rewrite = line.replace(/['"]+/g, "");
      }
    }

    return { scores, rewrite };
  }

  function getScoreColor(score) {
    const num = parseInt(score.split("/")[0]);
    if (num >= 9) return styles.green;
    if (num >= 7) return styles.blue;
    if (num >= 5) return styles.orange;
    return styles.red;
  }

  return (
    <div className={styles.pageBackground}>
      <div className={styles.contentWrapper}>
        {aiResult && (
          <div className={styles.resultsLayout}>
            <div className={styles.copyArea}>
  <div className={`${styles.card} ${styles.fadeIn}`}>
    <h3>📄 Your Original Message:</h3>
    <div className={styles.originalDetails}>
      {selectedPersona && `❤️ ${selectedPersona}`} |{" "}
      {selectedLevel && `📝 ${selectedLevel}`} |{" "}
      {selectedIndustry && `🖥️ ${selectedIndustry}`}
    </div>
    <div className={styles.originalText}>{userMessage}</div>
  </div>

  <div className={`${styles.card} ${styles.fadeIn}`} style={{ animationDelay: "0.2s" }}>
    <h3>✍️ Suggested Rewrite:</h3>
    <div className={styles.rewriteText}>{rewrite}</div>
    <button onClick={handleCopy} className={styles.copyButton}>
      Copy Rewrite
    </button>
  </div>
</div>


            <div className={styles.scoreArea}>
  {scores.map((item, index) => (
    <div
      key={index}
      className={`${styles.scoreCard} ${styles.fadeIn}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className={styles.scoreCategory}>{item.category}</div>
      <div
        className={`${styles.scoreValue} ${getScoreColor(
          item.score
        )}`}
      >
        {item.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <div className={styles.footerWrapper}>
        <textarea
          className={styles.inputBox}
          placeholder="Paste your headline, email, or pitch..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />

        <div className={styles.selectContainer}>
          <select
            value={selectedPersona}
            onChange={(e) => setSelectedPersona(e.target.value)}
          >
            <option value="">Target Persona</option>
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
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">Target Level</option>
            <option value="Individual Contributor">
              Individual Contributor
            </option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="Vice President">Vice President</option>
            <option value="C-Suite Executive">C-Suite Executive</option>
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option value="">Target Industry</option>
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
          </select>
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={handleSubmit}
            className={styles.scoreButton}
            disabled={isLoading}
          >
            {isLoading ? "Scoring..." : "Score My Message"}
          </button>
          <button onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputPanel;
