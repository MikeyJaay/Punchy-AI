import { useState } from "react";
import "../styles/spinner.css";
import styles from "../styles/InputPanel.module.css";
import { getPunchyScores } from "../openai";

function InputPanel() {
  // --- Local State ---
  const [userMessage, setUserMessage] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Parse the current aiResult ---
  const { scores, rewrite } = parseScores(aiResult);

  // --- Handle Submit (simulate GPT response for now) ---
  async function handleSubmit() {
    console.log("Message:", userMessage);
    console.log("Persona:", selectedPersona);
    console.log("Level:", selectedLevel);
    console.log("Industry:", selectedIndustry);

    const prompt = buildPrompt({
      message: userMessage,
      persona: selectedPersona,
      level: selectedLevel,
      industry: selectedIndustry,
    });

    console.log("Built Prompt:", prompt);

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

  // --- Handle Reset Form ---
  function handleReset() {
    setUserMessage("");
    setSelectedPersona("");
    setSelectedIndustry("");
    setSelectedLevel("");
    setAiResult("");
    setIsLoading(false);
  }

  // --- Handle Copy to Clipboard ---
  function handleCopy() {
    if (rewrite) {
      navigator.clipboard
        .writeText(rewrite)
        .then(() => {
          alert("✂️ Suggested Rewrite copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  }

  // --- Parse AI Result into Scores and Rewrite ---
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

  // --- Build GPT Prompt ---
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

  return (
    <div className={styles.pageBackground}>
      <div className={styles.chatContainer}>
        {/* Display GPT Output */}
        {aiResult && (
          <div className={`${styles.outputCard}`}>
            <h3>📈 Your Message Scores:</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {scores.map((item, index) => (
                <li key={index}>
                  <strong>{item.category}:</strong> {item.score}
                </li>
              ))}
            </ul>

            {rewrite && (
              <>
                <h3 style={{ marginTop: "30px" }}>✍️ Suggested Rewrite:</h3>
                <div className={styles.rewriteBox}>{rewrite}</div>
                <button onClick={handleCopy} className={styles.smallButton}>
                  Copy Rewrite
                </button>
              </>
            )}
          </div>
        )}

        {/* Spinner */}
        {isLoading && (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>

      {/* Bottom Input Bar */}
      <div className={styles.inputBar}>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.inputField}
            placeholder="Paste your headline, email, or pitch..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            rows={2}
          />

          <button
            onClick={handleSubmit}
            className={styles.scoreButton}
            disabled={isLoading}
          >
            {isLoading ? "Scoring..." : "Score"}
          </button>

          <div className={styles.filters}>
            <select
              className={styles.select}
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
            >
              <option value="">Persona</option>
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

            <select
              className={styles.select}
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">Level</option>
              <option value="Individual Contributor">
                Individual Contributor (IC)
              </option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Vice President">Vice President (VP)</option>
              <option value="C-Suite Executive">C-Suite Executive</option>
            </select>

            <select
              className={styles.select}
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">Industry</option>
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

            <button onClick={handleReset} className={styles.resetButton}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputPanel;
