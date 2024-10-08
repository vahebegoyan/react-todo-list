import { useEffect, useMemo, useState } from "react";

export default function Button({
    tag = 'button',
    children = '',
    className = '',
    onClick = (event) => {},
    href = '',
    id = '',
    type = 'accent', // secondary
    size = 'medium', // small, medium, large
    disabled = false,
    loading = false,
}) {
    const [classes, setClasses] = useState(className ? [className] : []);

    useEffect(() => {
        const newClasses = ['transition-all', 'flex', 'items-center', 'justify-items-center', 'gap-2'];

        newClasses.push('rounded-lg', 'border');

        // Size Classes
        switch (size) {
            case 'small':
                newClasses.push('h-10', 'px-5');
                break;
            case 'medium':
                newClasses.push('h-12', 'px-5', 'text-sm');
                break;
            default:
                newClasses.push('h-14', 'px-5', 'text-md');
        }

        // Style Classes
        const styleClasses = {
            accent: ['bg-cyan-500', 'border-cyan-600', 'text-white'],
            accentSecondary: ['bg-cyan-100', 'border-cyan-600', 'text-blue-600'],
            error: ['bg-red-500', 'border-red-600', 'text-white'],
            errorSecondary: ['bg-red-100', 'border-red-600', 'text-red-600'],
            danger: ['bg-yellow-500', 'border-yellow-600', 'text-white'],
            dangerSecondary: ['bg-yellow-100', 'border-yellow-600', 'text-yellow-600'],
            success: ['bg-green-500', 'border-green-600', 'text-white'],
            successSecondary: ['bg-green-100', 'border-green-600', 'text-green-600'],
        };
        // Style Classes
        const styleClassesHover = {
            accent: ['hover:bg-cyan-600'],
            accentSecondary: ['hover:bg-cyan-500', 'hover:text-white'],
            error: ['hover:bg-red-600'],
            errorSecondary: ['hover:bg-red-500', 'hover:text-white'],
            danger: ['hover:bg-yellow-600'],
            dangerSecondary: ['hover:bg-yellow-500', 'hover:text-white'],
            success: ['hover:bg-green-600'],
            successSecondary: ['hover:bg-green-500', 'hover:text-white'],
        };

        if (disabled) {
            newClasses.push('cursor-not-allowed', 'opacity-50');
        } else {
            newClasses.push(...(styleClassesHover[type] || styleClassesHover.primary));
        }

        newClasses.push(...(styleClasses[type] || styleClasses.primary));

        setClasses(newClasses);
    }, [className, disabled, type, size]);

    const attrs = {};
    if (tag === 'a') {
        attrs.href = href;
    }
    if (id) {
        attrs.id = id;
    }
    if (disabled) {
        attrs.disabled = true;
    }

    return (
        <button className={classes.join(' ')} onClick={loading || disabled ? undefined : onClick} {...attrs}>
            {loading && <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5" viewBox="0 0 512 512">
                <path d="M457 372c11.5 6.6 26.3 2.7 31.8-9.3C503.7 330.2 512 294.1 512 256C512 122.7 410.1 13.2 280 1.1C266.8-.1 256 10.7 256 24v0c0 13.3 10.8 23.9 24 25.4C383.5 61.2 464 149.2 464 256c0 29.3-6.1 57.3-17 82.6c-5.3 12.2-1.5 26.8 10 33.5v0z" />
            </svg>}
            {children}
        </button>
    );
}
