import { OpenRouter } from "@openrouter/sdk";
import { apiKeysCreate } from "@openrouter/sdk/funcs/apiKeysCreate.js";

if(!process.env.OPENROUTER_API_KEY){
    throw new Error ("Your OpenRouter API key is missing")
}

const openRouter =new OpenRouter({
    apiKey:process.env.OPENROUTER_API_KEY
})

export default openRouter