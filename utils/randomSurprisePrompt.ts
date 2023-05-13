import { supriseMePrompts } from "@/constants";

const randomSurprisePrompt = (prompt: string): string => {
    const randomPrompt = supriseMePrompts[Math.floor(Math.random() * supriseMePrompts.length)];

    if(randomPrompt === prompt) return randomSurprisePrompt(prompt);

    return randomPrompt;
}

export default randomSurprisePrompt;