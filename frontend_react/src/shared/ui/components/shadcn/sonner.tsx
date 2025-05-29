import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius-xl)',
          '--offset-top': 'calc(env(safe-area-inset-top) + 1.5rem)',
          '--mobile-offset-top': 'calc(env(safe-area-inset-top) + 1rem)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
