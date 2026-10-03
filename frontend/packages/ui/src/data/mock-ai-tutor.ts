import { AIChatMessage } from "@learnova/types";

export const mockAITutorHistory: AIChatMessage[] = [
  {
    id: "msg-1",
    sender: "user",
    timestamp: "10:42 AM",
    text: "How do I decide whether to use sine or cosine for the gravity component along an incline?",
  },
  {
    id: "msg-2",
    sender: "assistant",
    timestamp: "10:43 AM",
    badge: "Verified Physics Concept",
    text: "Great question! Remember this simple rule of thumb for inclined planes:",
    suggestedSteps: [
      "1. When ramp angle θ = 0° (flat ground), gravity points directly into the surface, so normal force equals full gravity: FN = mg · cos(0°) = mg",
      "2. As the ramp gets steeper (θ → 90°), the sliding force down the ramp increases: F_parallel = mg · sin(θ)",
    ],
    formulaSnippet: "• Use sin(θ) for the downhill parallel force (Fg,∥ = mg sin θ)\n• Use cos(θ) for the perpendicular into-the-ramp force (Fg,⊥ = mg cos θ)",
  },
];

export const mockAIPromptSuggestions = [
  "Simplify this concept",
  "Generate a practice question",
  "Derive the normal force equation",
  "Explain kinetic friction on tilted planes",
];
