// tailwind config is required for editor support
import sharedConfig from 'tailwind-config/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'prefix' | 'presets'> = {
  presets: [sharedConfig],
};

export default config;
