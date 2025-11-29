import React from 'react';
import { PromptState, PromptKey } from '../types';
import { SelectField } from './ui/SelectField';
import { InputField } from './ui/InputField';
import { Section } from './ui/Section';
import { Divider } from './ui/Divider';
import * as Options from '../data/options';
import { User, Camera, Sparkles, Shirt, Glasses, Check } from 'lucide-react';

interface FormProps {
  data: PromptState;
  onChange: (key: PromptKey, value: any) => void;
}

export const Form: React.FC<FormProps> = ({ data, onChange }) => {
  
  const handleChange = (key: PromptKey) => (value: any) => {
    onChange(key, value);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('preserveOriginal', e.target.checked);
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Subject Section */}
      <Section title="Subject" description="Core identity and expression" icon={<User size={20} />}>
        <div className="grid grid-cols-2 gap-6">
          <SelectField label="Age" value={data.age} options={Options.AGES} onChange={handleChange('age')} />
          <SelectField label="Gender" value={data.gender} options={Options.GENDERS} onChange={handleChange('gender')} />
        </div>
        <SelectField label="Expression" value={data.expression} options={Options.EXPRESSIONS} onChange={handleChange('expression')} />
        <InputField 
          label="Custom Description" 
          value={data.description} 
          onChange={handleChange('description')} 
          placeholder="E.g. Holding a coffee cup, looking at distance..." 
          fullWidth
        />
      </Section>

      <Divider />

      {/* Style Section */}
      <Section title="Style & Look" description="Physical appearance and grooming" icon={<Sparkles size={20} />}>
        <div className="grid grid-cols-2 gap-6">
          <SelectField label="Hair Color" value={data.hairColor} options={Options.HAIR_COLORS} onChange={handleChange('hairColor')} />
          <SelectField label="Hair Style" value={data.hairStyle} options={Options.HAIR_STYLES} onChange={handleChange('hairStyle')} />
        </div>
        
        <div className="py-2">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer group hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">Preserve Original Face ID</span>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${data.preserveOriginal ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                <input type="checkbox" checked={data.preserveOriginal} onChange={handleCheckbox} className="hidden" />
                {data.preserveOriginal && <Check size={14} className="text-white" />}
            </div>
          </label>
        </div>

        <InputField label="Makeup Details" value={data.makeup} onChange={handleChange('makeup')} placeholder="Natural, heavy glam..." />
      </Section>

      <Divider />

      {/* Fashion Section */}
      <Section title="Fashion" description="Outfit and apparel details" icon={<Shirt size={20} />}>
        <div className="grid grid-cols-2 gap-6">
          <SelectField label="Apparel Type" value={data.clothingType} options={Options.CLOTHING_TYPES} onChange={handleChange('clothingType')} />
          <SelectField label="Color Palette" value={data.clothingColor} options={Options.CLOTHING_COLORS} onChange={handleChange('clothingColor')} />
        </div>
        <InputField label="Fabric & Fit" value={data.clothingDetails} onChange={handleChange('clothingDetails')} placeholder="Cotton, silk, loose fit..." />
      </Section>

      <Divider />

      {/* Accessories Section */}
      <Section title="Accessories" description="Jewelry and eyewear" icon={<Glasses size={20} />}>
        <SelectField label="Eyewear" value={data.eyewearType} options={Options.EYEWEAR} onChange={handleChange('eyewearType')} />
        <div className="grid grid-cols-2 gap-6">
          <SelectField label="Earrings" value={data.earringsType} options={Options.EARRINGS} onChange={handleChange('earringsType')} />
          <SelectField label="Necklace" value={data.jewelryType} options={Options.NECKLACES} onChange={handleChange('jewelryType')} />
        </div>
      </Section>

      <Divider />

      {/* Camera Section */}
      <Section title="Scene & Camera" description="Environment and photography settings" icon={<Camera size={20} />}>
        <div className="grid grid-cols-2 gap-6">
          <SelectField label="Camera" value={data.cameraStyle} options={Options.CAMERA_STYLES} onChange={handleChange('cameraStyle')} />
          <SelectField label="Aspect Ratio" value={data.aspectRatio} options={Options.ASPECT_RATIOS} onChange={handleChange('aspectRatio')} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <SelectField label="Angle" value={data.angle} options={Options.ANGLES} onChange={handleChange('angle')} />
          <SelectField label="Lighting" value={data.lighting} options={Options.LIGHTING} onChange={handleChange('lighting')} />
        </div>
        
        <SelectField label="Setting" value={data.setting} options={Options.SETTINGS} onChange={handleChange('setting')} />
        <InputField label="Atmosphere" value={data.atmosphere} onChange={handleChange('atmosphere')} placeholder="Cinematic, cozy, bustling..." />
      </Section>

    </div>
  );
};