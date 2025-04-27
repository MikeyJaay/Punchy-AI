import { useState } from "react";
import "../styles/spinner.css";
import styles from "../styles/InputPanel.module.css";
import { getPunchyScores } from "../openai";

function InputPanel() {
  const [userMessage, setUserMessage] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { scores, rewrite } = parseScores(aiResult);

  async function handleSubmit() {
    const prompt = buildPrompt({
      message: userMessage,
      persona: selectedPersona,
      level: selectedLevel,
      industry: selectedIndustry,
    });

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
    }, 2000);
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

  function buildPrompt({ message, persona, level, industry }) {
    let personaText = persona || "a general professional audience";
    let levelText = level || "a general seniority level";
    let industryText = industry || "a general industry";

    return `
You are a senior product marketer specializing in messaging optimization.

Analyze the following piece of product messaging for:
- Clarity
- Emotional relevance
- Buzzword density
- Persona fit

Target Audience:
- Persona: ${personaText}
- Level: ${levelText}
- Industry: ${industryText}

Then:
- Score each category from 1–10
- Explain why each score was given
- Provide a rewrite suggestion that improves the lowest-scoring category

Here is the message to evaluate:

"${message}"
    `.trim();
  }

  function getScoreColor(score) {
    const num = parseInt(score.split("/")[0]);
    if (num >= 9) return "#2ecc71"; // Green
    if (num >= 7) return "#3498db"; // Blue
    if (num >= 5) return "#f1c40f"; // Yellow
    return "#e74c3c"; // Red
  }

  return (
    <div className={styles.pageBackground}>
      <div className={styles.contentArea}>
        {/* Left side */}
        <div className={styles.leftSide}>
          {/* Show outputs only after scoring */}
          {aiResult && (
            <>
              {/* Suggested Rewrite Box */}
              <div className={styles.rewriteBox}>
                <h3>✍️ Suggested Rewrite:</h3>
                <p>{rewrite}</p>
                <button onClick={handleCopy} className={styles.copyButton}>
                  Copy Rewrite
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right side */}
        <div className={styles.rightSide}>
          {aiResult && scores.map((item, index) => (
            <div key={index} className={styles.scoreBox}>
              <span className={styles.categoryText}>{item.category}</span>
              <span
                className={styles.scoreValue}
                style={{ color: getScoreColor(item.score) }}
              >
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom input bar */}
      <div className={styles.bottomBar}>
        <textarea
          className={styles.inputArea}
          placeholder="Paste your headline, email, or pitch..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <div className={styles.dropdownRow}>
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
            <option value="Individual Contributor">IC</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
            <option value="C-Suite">C-Suite</option>
          </select>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option value="">Target Industry</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Software">Software</option>
            <option value="Automotive">Automotive</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className={styles.buttonRow}>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={styles.scoreButton}
          >
            {isLoading ? "Scoring..." : "Score My Message"}
          </button>
          <button
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputPanel;
