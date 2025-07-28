'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="hover:opacity-80 transition-opacity"
      >
        {mounted && (theme === 'dark' ? <SunIcon /> : <MoonIcon />)}

        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export { ThemeSwitcher };
