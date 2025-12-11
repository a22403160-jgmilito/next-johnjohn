'use client';

import { useEffect, useState } from 'react';

export default function Relogio() {
  const [hora, setHora] = useState<string>('');

  useEffect(() => {
    const atualizar = () => {
      setHora(new Date().toLocaleTimeString());
    };

    atualizar(); // primeira vez
    const id = setInterval(atualizar, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>{hora}</span>
  );
}
