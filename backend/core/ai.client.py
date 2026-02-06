from openai import AsyncOpenAI
import os

groq_client = AsyncOpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY")
)

# Run Llama 3
async def analyze_toxicity():
    response = await groq_client.chat.completions.create(
        model="llama3-8b-8192",  # You just type the model name
        messages=[{"role": "system", "content": "Analyze this text for toxicity"}]
    )
    return response