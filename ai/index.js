import "dotenv/config";

const response = await fetch(
    "https://api.mistral.ai/v1/chat/completions",
    {
        method: "POST",

        headers: {
            "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            model: "mistral-small-latest",

            messages: [
                {
                    role: "user",
                    content: "What is the meaning of life?"
                }
            ]
        })
    }
);

const data = await response.json();

console.log(data.choices[0].message.content);