'use client';

import { cn } from '@/lib/utils';
import {
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react';

type AutoWidthInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  minWidth?: number;
  mirrorClassName?: string;
  widthPadding?: number;
};

export default function AutoWidthInput({
  className,
  defaultValue,
  minWidth = 0,
  mirrorClassName,
  onChange,
  placeholder,
  style,
  value,
  widthPadding = 2,
  ...props
}: AutoWidthInputProps) {
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(minWidth);
  const [inputValue, setInputValue] = useState(() =>
    String(value ?? defaultValue ?? ''),
  );

  const measuredText = String((value ?? inputValue) || placeholder || '');

  useLayoutEffect(() => {
    if (!mirrorRef.current) {
      return;
    }

    setWidth(Math.max(minWidth, mirrorRef.current.offsetWidth + widthPadding));
  }, [measuredText, minWidth, widthPadding]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    onChange?.(event);
  }

  return (
    <span className='relative inline-grid max-w-full align-baseline'>
      <input
        {...props}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        placeholder={placeholder}
        onChange={handleChange}
        style={{ ...style, width }}
        className={cn('min-w-0 bg-transparent', className)}
      />
      <span
        ref={mirrorRef}
        aria-hidden='true'
        className={cn(
          'pointer-events-none invisible absolute left-0 top-0 whitespace-pre',
          className,
          mirrorClassName,
        )}
      >
        {measuredText || ' '}
      </span>
    </span>
  );
}
