//import { noop } from '../../../core/types';

interface Props {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: any) => void;
}

export function Input({ id, name, type, label, placeholder, value, onChange }: Props) {
  return (<div className="min-w-full rounded-md pt-5 pb-5 py-5 border border-light-75 shadow mb-10">
    <label className="w-full text-10 text-light-500 font-medium px-5 inline-block">
      {label}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full text-12 leading-7 focus:outline-none"
        onChange={onChange}
      />
    </label>
  </div>);
}

Input.defaultProps = {
  id: '',
  type: 'text',
  label: '',
  value: '',
  placeholder: '',
  onChange: () => { },
};
