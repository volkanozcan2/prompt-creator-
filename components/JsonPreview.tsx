import React, { useState } from 'react';
import { PromptState } from '../types';
import { Copy, Check } from 'lucide-react';

interface JsonPreviewProps {
  data: PromptState;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  // Constructing the exact JSON schema required
  const output = {
    subject: {
      age: data.age.toLowerCase(),
      gender: data.gender.toLowerCase(),
      description: data.description,
      expression: data.expression.toLowerCase(),
      hair: {
        color: data.hairColor.toLowerCase(),
        style: data.hairStyle.toLowerCase(),
      },
      clothing: {
        top: {
          type: data.clothingType.toLowerCase(),
          color: data.clothingColor.toLowerCase(),
          details: "high detail texture"
        }
      },
      face: {
        preserve_original: true,
        makeup: data.gender === "Female" ? "natural" : "none"
      },
      accessories: {},
      photography: {
        camera: data.cameraStyle,
        angle: data.angle,
        lighting: data.lighting,
        aspect_ratio: data.aspectRatio
      },
      background: {
        setting: data.setting,
        details: "bokeh effect"
      }
    }
  };

  const jsonString = JSON.stringify(output, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting regex
  const highlightedJson = jsonString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, '<span class="text-blue-400">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span class="text-green-400">"$1"</span>')
    .replace(/: true/g, ': <span class="text-orange-400">true</span>')
    .replace(/: false/g, ': <span class="text-orange-400">false</span>');

  return (
    <div className="bg-gray-900 text-gray-100 p-6 h-full min-h-[500px] flex flex-col relative rounded-sm shadow-2xl">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
        <span className="text-xs font-mono uppercase tracking-widest text-gray-400">JSON Preview</span>
        <button 
          onClick={handleCopy}
          className="text-xs flex items-center gap-2 hover:text-white transition-colors text-gray-400 uppercase tracking-wider"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy JSON'}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto font-mono text-sm leading-relaxed custom-scrollbar">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightedJson }} />
        </pre>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500 font-mono">
        {jsonString.length} chars
      </div>
    </div>
  );
};