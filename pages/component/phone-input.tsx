import InputMask from 'react-input-mask';

interface Props {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: any) => void;
}

export function PhoneInput({ id, name, label, placeholder, value, onChange }: Props) {
  return (<div className="rounded-md pt-5 pb-5 px-5 border border-light-75 shadow mb-20">
    <label className="w-full text-10 text-light-500 font-medium px-15 inline-block">
      {label}
      <InputMask
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        className="w-full text-12 leading-7 focus:outline-none"
        mask="(+999)(999) 999-9999"
        type="tel"
        onChange={onChange}
      />
    </label>
  </div>);
}

PhoneInput.defaultProps = {
  id: '',
  label: '',
  value: '',
  placeholder: '',
  onChange: () => { },
};
