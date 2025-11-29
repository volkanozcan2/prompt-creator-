import React from 'react';
import { PromptState, PromptKey } from '../types';
import { SelectField } from './ui/SelectField';
import { InputField } from './ui/InputField';
import { Section } from './ui/Section';
import { Divider } from './ui/Divider';
import * as Options from '../data/options';
import { User, Camera, Palette, MapPin } from 'lucide-react';

interface FormProps {
  data: PromptState;
  onChange: (key: PromptKey, value: string) => void;
}

export const Form: React.FC<FormProps> = ({ data, onChange }) => {
  
  const handleChange = (key: PromptKey) => (value: string) => {
    onChange(key, value);
  };

  return (
    <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-200">
      
      {/* Subject Section */}
      <Section title="Subject Details" icon={<User size={16} />}>
        <SelectField 
          label="Age Group" 
          value={data.age} 
          options={Options.AGES} 
          onChange={handleChange('age')} 
        />
        <SelectField 
          label="Gender" 
          value={data.gender} 
          options={Options.GENDERS} 
          onChange={handleChange('gender')} 
        />
        <InputField 
          label="Description" 
          value={data.description} 
          onChange={handleChange('description')} 
          placeholder="e.g. wearing headphones..."
          fullWidth
        />
      </Section>

      <Divider />

      {/* Appearance Section */}
      <Section title="Appearance" icon={<Palette size={16} />}>
        <SelectField 
          label="Hair Color" 
          value={data.hairColor} 
          options={Options.HAIR_COLORS} 
          onChange={handleChange('hairColor')} 
        />
        <SelectField 
          label="Hair Style" 
          value={data.hairStyle} 
          options={Options.HAIR_STYLES} 
          onChange={handleChange('hairStyle')} 
        />
        <SelectField 
          label="Expression" 
          value={data.expression} 
          options={Options.EXPRESSIONS} 
          onChange={handleChange('expression')} 
        />
        <SelectField 
          label="Clothing Type" 
          value={data.clothingType} 
          options={Options.CLOTHING_TYPES} 
          onChange={handleChange('clothingType')} 
        />
        <InputField
            label="Clothing Color"
            value={data.clothingColor}
            onChange={handleChange('clothingColor')}
            placeholder="e.g. Red, Pastel Blue"
        />
      </Section>

      <Divider />

      {/* Camera & Tech */}
      <Section title="Photography" icon={<Camera size={16} />}>
        <SelectField 
          label="Camera Style" 
          value={data.cameraStyle} 
          options={Options.CAMERA_STYLES} 
          onChange={handleChange('cameraStyle')} 
        />
        <SelectField 
          label="Angle" 
          value={data.angle} 
          options={Options.ANGLES} 
          onChange={handleChange('angle')} 
        />
        <SelectField 
          label="Lighting" 
          value={data.lighting} 
          options={Options.LIGHTING} 
          onChange={handleChange('lighting')} 
        />
        <SelectField 
          label="Aspect Ratio" 
          value={data.aspectRatio} 
          options={Options.ASPECT_RATIOS} 
          onChange={handleChange('aspectRatio')} 
        />
      </Section>

      <Divider />

      {/* Environment */}
      <Section title="Environment" icon={<MapPin size={16} />}>
        <SelectField 
          label="Setting" 
          value={data.setting} 
          options={Options.SETTINGS} 
          onChange={handleChange('setting')} 
        />
      </Section>
    </div>
  );
};