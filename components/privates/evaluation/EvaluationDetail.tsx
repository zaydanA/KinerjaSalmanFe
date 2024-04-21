import React from 'react';
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import { KPIType } from '@/enums/enums';
import DropdownInput, { DropdownInputType } from '@/components/shares/inputs/DropdownInput';
import { IKPIDetail } from '@/types/kpi';

interface EvaluationDetailProps {
  detail: IKPIDetail;
  kpiTypes: KPIType[];
  onChange: (field: keyof IKPIDetail, value: string) => void;
  onDelete: () => void;
}

const EvaluationDetail: React.FC<EvaluationDetailProps> = ({
  detail,
  kpiTypes,
  onChange,
  onDelete,
}) => {
  const selectedType = detail.type;

  const dropdownProps: DropdownInputType = {
    id: 'kpiType',
    label: 'KPI Type',
    options: kpiTypes.map(type => ({ value: type, label: type })),
    selectedValue: selectedType,
    onChange: (e) => onChange('type', e.target.value),
    required: true,
  };

  return (
    <div className="border rounded-md p-4 mb-4">
      <div className="flex justify-end">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <div>
        <BaseInputText
          id={`indicator`}
          label="Indicator"
          placeholder="Indicator"
          value={detail.indicator}
          setValue={(e) => onChange('indicator', e.target.value)}
          required
        />
        <div className="flex gap-4 mt-2">
          <div style={{ flex: 1 }}>
            <DropdownInput {...dropdownProps} />
          </div>
          <div style={{ flex: 1 }}>
            <BaseInputText
              id={`target`}
              label="Target"
              placeholder="Target"
              value={detail.target.toString()}
              setValue={(e) => onChange('target', e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <BaseInputText
              id={`realization`}
              label="Realization"
              placeholder="Realization"
              value={detail.realization.toString()}
              setValue={(e) => onChange('realization', e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <BaseInputText
              id={`weight`}
              label="Weight"
              placeholder="Weight"
              value={detail.weight.toString()}
              setValue={(e) => onChange('weight', e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDetail;
