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

  function handleThemeChange() {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('light');
        break;
    }
  }

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="default"
        onValueChange={handleThemeChange}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <>
              <MoonIcon height={17} className={className} />
            </>
          ) : (
            <>
              <SunIcon height={20} className={className} />
            </>
          )
        }
      />
    </div>
  );
}
