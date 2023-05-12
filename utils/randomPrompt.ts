import { supriseMePrompts } from "@/constants";

const randomPrompt = (prompt: string): string => {
    const randomSurpriseMe = supriseMePrompts[Math.floor(Math.random() * supriseMePrompts.length)];

    if(randomSurpriseMe === prompt) return randomPrompt(prompt);

    return randomSurpriseMe;
}

export default randomPrompt;