import "./Slider.css";
import { useState } from "react";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  label?: string;
  onChange?: (value: number) => void;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  label = "Volume",
  onChange,
}: SliderProps) {
  const [value, setValue] = useState(defaultValue);

  const percent = ((value - min) / (max - min)) * 100;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = Number(event.target.value);
    setValue(next);
    onChange?.(next);
  }

  return (
    <div className="slider">
      <div className="slider__header">
        <span className="slider__label">{label}</span>
        <span className="slider__value">{value}</span>
      </div>
      <div className="slider__track-wrap">
        <div className="slider__track" />
        <div className="slider__fill" style={{ width: `${percent}%` }} />
        <div
          className="slider__bubble"
          style={{ left: `${percent}%` }}
          aria-hidden="true"
        >
          {value}
        </div>
        <input
          type="range"
          className="slider__input"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
    </div>
  );
}
