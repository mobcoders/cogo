'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="default"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <>
              {setTheme('light')}
              <SunIcon height={20} className={className} />
            </>
          ) : (
            <>
              {setTheme('dark')}
              <MoonIcon height={17} className={className} />
            </>
          )
        }
      />
    </div>
  );
}
