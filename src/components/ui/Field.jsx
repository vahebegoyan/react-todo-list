import { useEffect, useState } from "react";

export default function Field({
    type = 'text',
    options = [],
    value = undefined,
    placeholder = '',
    className = '',
    onChange = undefined,
    onBlur = undefined,
    onFocus = undefined,
    disabled = false,
    readOnly = false,
    id = '',
    label = '',
    required = false,
    size = 'medium',
}) {
    const [classes, setClasses] = useState(className ? [className] : []);

    useEffect(() => {
        const newClasses = ['transition-all', 'border', 'rounded-lg', 'w-full', 'p-2'];

        if (disabled) {
            newClasses.push('cursor-not-allowed', 'opacity-50');
        }

        switch (size) {
            case 'small':
                newClasses.push('h-10', 'px-3');
                break;
            case 'medium':
                newClasses.push('h-12', 'px-4', 'text-sm');
                break;
            default:
                newClasses.push('h-14', 'px-5', 'text-sm');
        }

        newClasses.push('bg-gray-800', 'border-gray-950', 'focus:outline-0', 'focus:border-gray-700', 'caret-cyan-500', 'text-gray-300');
        newClasses.push('placeholder:text-gray-600');

        setClasses(newClasses);
    }, [className, disabled]);

    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required} // Added required
                        className={classes.join(' ')}
                    />
                );
            case 'select':
                return (
                    <select
                        id={id}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required} // Added required
                        className={classes.join(' ')}
                    >
                        {placeholder && <option value=''>
                            {placeholder}
                        </option>}
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'radio':
                return (
                    <div className={classes.join(' ')}>
                        {options.map((option, index) => (
                            <label key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    onFocus={onFocus}
                                    disabled={disabled}
                                    readOnly={readOnly}
                                    required={required} // Added required
                                    className="mr-2"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                );
            default: // 'text'
                return (
                    <input
                        type={type}
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required} // Added required
                        className={classes.join(' ')}
                    />
                );
        }
    };

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block mb-1">
                    {label}
                    {required && <span className="text-red-500">*</span>} {/* Optional asterisk for required */}
                </label>
            )}
            {renderInput()}
        </div>
    );
}
