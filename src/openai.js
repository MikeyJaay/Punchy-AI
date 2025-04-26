export async function getPunchyScores(prompt) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // REPLACE this with your real key safely later
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // using GPT-3.5 to avoid quota/billing
          messages: [{ role: "user", content: prompt }],
          temperature: 0.5,
          max_tokens: 500,
        }),
      });
  
      const data = await response.json();
      console.log("OpenAI raw response:", data);
  
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${data.error.message}`);
      }
  
      return data.choices[0].message.content;
    } catch (error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }
  