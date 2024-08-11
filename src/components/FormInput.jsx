import "./formInput.css";

const FormInput = (props) => {
  const { label, onChange, id, ...inputProps } = props;

  return (
    <div className="formInput">
      <label>{label}</label>
      {inputProps.type === "select" ? (
        <select {...inputProps} onChange={onChange}>
          {inputProps.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...inputProps} onChange={onChange} />
      )}
    </div>
  );
};

export default FormInput;
