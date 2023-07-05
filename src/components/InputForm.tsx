
type inputProps = {
  text: string;
  type?: string | 'text';
  isRequired?: boolean;
  placeholder?: string;
  name: string;
  value: string
  onChange: (text: string) => void
  errorMessage?: string,
  style?: 'light' | 'dark'
}
export default function InputForm({ ...props }: inputProps) {
  const handleChange = (e: any) => {
    props.onChange(e.target.value)
  }
  return (
    <>
      <div className="w-full">
        <label className={`${props.style == 'light' ? ' text-gray-900' : 'text-gray-300'} text-sm font-medium block mb-2 dark:`}>{props.text}</label>
        <input type={props.type || 'text'} name={props.name} id={props.name} className={`${props.style == 'light' ? 'text-gray-900 bg-gray-50' : 'bg-gray-600 text-white'} border border-gray-300  sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 `} value={props.value || ''} onChange={handleChange} placeholder={props.placeholder} required={false} />
        {props.errorMessage && <p className="text-red-500 text-xs mt-1">{props.errorMessage}</p>}
      </div>
    </>
  )
}