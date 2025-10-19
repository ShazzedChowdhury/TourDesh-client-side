import React, { use, useEffect, useState } from 'react';
import { ImSun } from 'react-icons/im';
import { LuSunMoon } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { ThemeContext } from '../../providers/ThemeProvider';


const ToggleButton = () => {
   const { theme, setTheme } = use(ThemeContext);
   
    
    return (
      <>
        <label
         data-tooltip-id="theme-tooltip"
         className="swap swap-rotate"
        >
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
            checked={theme === "light" ? false : true}
          />

          {/* sun icon */}
          <ImSun className="swap-on" size={30} />

          {/* moon icon */}
          <LuSunMoon className="swap-off" size={30} />
        </label>

        <Tooltip id="theme-tooltip" place="bottom-start">
            <p className='text-sm font-normal'>{theme === "light" ? "dark" : "light"}</p>
        </Tooltip>
      </>
    );
};

export default ToggleButton;