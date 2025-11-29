import React, { useState, useEffect } from 'react';
import { Form } from './components/Form';
import { JsonPreview } from './components/JsonPreview';
import { PromptState, PromptKey } from './types';
import { generateRandomPrompt } from './utils/randomizer';
import { GoogleGenAI } from "@google/genai";
import { Code, Shuffle, RefreshCw } from 'lucide-react';

const INITIAL_STATE: PromptState = {
  age: 'Young Adult',
  gender: 'Female',
  hairColor: 'Dark Brown',
  hairStyle: 'Slicked Back Bun',
  expression: 'Relaxed / Neutral',
  clothingType: 'Oversized Hoodie',
  clothingColor: 'Light Heather Grey',
  clothingDetails: 'soft fleece fabric',
  cameraStyle: 'Modern Smartphone Selfie',
  angle: 'Eye-level',
  lighting: 'Soft natural window light',
  setting: 'Interior of a car',
  atmosphere: 'casual daily life',
  aspectRatio: '9:16 Vertical (Stories)',
  description: '',
  preserveOriginal: true,
  makeup: 'fresh natural clean girl aesthetic',
  eyewearType: 'None',
  earringsType: 'Gold ear stack',
  jewelryType: 'Dainty gold chain'
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<PromptState>(INITIAL_STATE);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (key: PromptKey, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    if(window.confirm("Reset all fields to default?")) {
      setFormData(INITIAL_STATE);
      setGeneratedImage(null);
      setError(null);
    }
  };

  const handleRandomize = () => {
    const randomData = generateRandomPrompt();
    setFormData(randomData);
    setError(null);
  };

  const handleGenerateImage = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      setGeneratedImage(null);

      // Construct a rich prompt for the image model
      const promptText = `
        High quality realistic photograph.
        ${formData.description ? formData.description : `A portrait of a ${formData.age} ${formData.gender}`}.
        Appearance: ${formData.expression}, ${formData.hairColor} ${formData.hairStyle} hair, wearing ${formData.clothingColor} ${formData.clothingType} (${formData.clothingDetails}).
        Accessories: ${formData.eyewearType !== 'None' ? formData.eyewearType : ''}, ${formData.earringsType !== 'None' ? formData.earringsType : ''}.
        Setting: ${formData.setting}, ${formData.atmosphere}.
        Photography: ${formData.cameraStyle}, ${formData.angle} angle, ${formData.lighting}.
        Aspect Ratio: ${formData.aspectRatio}.
      `.trim();

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: promptText }],
        },
      });

      // Find image part
      let base64Image = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
           if (part.inlineData) {
             base64Image = part.inlineData.data;
             break;
           }
        }
      }

      if (base64Image) {
        setGeneratedImage(`data:image/png;base64,${base64Image}`);
      } else {
        throw new Error("No image data returned from API");
      }

    } catch (err: any) {
      console.error("Image generation error:", err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Run randomize on mount
  useEffect(() => {
    handleRandomize();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-black selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <Code size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              Prompt<span className="text-gray-400">Builder</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRandomize}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-black rounded-full transition-all active:scale-95"
            >
              <Shuffle size={14} />
              <span>Randomize</span>
            </button>
            <button 
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Reset Form"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: FORM */}
          <div className="xl:col-span-7">
            <Form data={formData} onChange={handleFieldChange} />
          </div>

          {/* RIGHT COLUMN: PREVIEW */}
          <div className="xl:col-span-5">
             <JsonPreview 
                data={formData} 
                onGenerateImage={handleGenerateImage}
                isGenerating={isGenerating}
                generatedImage={generatedImage}
                error={error}
             />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;