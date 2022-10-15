import React from 'react';
import style from './Switch.module.css';

export default function Switch({isOn, handleToggle, text}){

    return (
        <>
          <input
            checked={isOn}
            onChange={handleToggle}
            className={style.reactSwitchCheckbox}
            id={`react-switch-new`}
            type="checkbox"
          />
          <label
            style = {{background: isOn && '#06D6A0'}}
            className={style.reactSwitchLabel}
            htmlFor={`react-switch-new`}
          >
            <span className={style.reactSwitchButton} />
            <p className={style.switchText}>{text}</p>
          </label>
          
        </>
      );
}