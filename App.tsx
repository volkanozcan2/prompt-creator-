import React, { useState, useEffect } from 'react';
import { Form } from './components/Form';
import { JsonPreview } from './components/JsonPreview';
import { PromptState, PromptKey } from './types';
import { generateRandomPrompt } from './utils/randomizer';
import { Button } from './components/ui/Button';
import { Sparkles, Terminal } from 'lucide-react';

const INITIAL_STATE: PromptState = {
  age: 'Young Adult',
  gender: 'Female',
  hairColor: 'Blonde',
  hairStyle: 'Long straight',
  expression: 'Neutral',
  clothingType: 'T-shirt',
  clothingColor: 'White',
  cameraStyle: '85mm Portrait',
  angle: 'Eye-level',
  lighting: 'Natural daylight',
  setting: 'Minimalist studio',
  aspectRatio: '1:1 (Square)',
  description: 'A simple portrait.'
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<PromptState>(INITIAL_STATE);

  const handleFieldChange = (key: PromptKey, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRandomize = () => {
    const randomData = generateRandomPrompt();
    setFormData(randomData);
  };

  // Run randomize on mount for instant gratification
  useEffect(() => {
    handleRandomize();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 text-white p-1.5 rounded-sm">
              <Terminal size={20} strokeWidth={2.5} />
            </div>
            <h1 className="font-bold tracking-tight text-lg">PROMPT<span className="font-light">BUILDER</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={handleRandomize} icon={<Sparkles size={16} />}>
              Smart Randomize
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            <div className="mb-2">
              <h2 className="text-2xl font-light">Configuration</h2>
              <p className="text-gray-500 text-sm mt-1">Customize your AI prompt parameters below.</p>
            </div>
            <Form data={formData} onChange={handleFieldChange} />
          </div>

          {/* Right Column: Preview */}
          <div className="col-span-1 lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="mb-2">
                <h2 className="text-2xl font-light">Output</h2>
                <p className="text-gray-500 text-sm mt-1">Real-time JSON generation.</p>
              </div>
              <JsonPreview data={formData} />
              
              <div className="p-4 bg-gray-100 border border-gray-200 text-xs text-gray-500 leading-relaxed">
                <strong>Note:</strong> The "Smart Randomizer" respects camera constraints. 
                For example, selecting "Drone Shot" will automatically restrict angles to high-altitude perspectives.
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default App;