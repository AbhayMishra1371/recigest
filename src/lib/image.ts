export const generateImageUrl = (query: string, visualPrompt?: string) => {
  const seedPrompt = visualPrompt || `delicious ${query} dish professional food photography cinematic lighting`;
  const deterministicSeed = Array.from(query).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Clean the visual prompt for URL safety
  const cleanPrompt = encodeURIComponent(seedPrompt.replace(/[^\w\s,]/gi, '').trim());
  
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1280&height=720&nologo=true&seed=${deterministicSeed}&model=flux`;
};
