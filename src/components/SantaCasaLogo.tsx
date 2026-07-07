/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'icon-only';
  iconSize?: number;
  textColor?: string;
  subColor?: string;
}

export const SantaCasaLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  iconSize = 56,
  textColor = 'text-[#E21A36]',
  subColor = 'text-[#E21A36]',
}) => {
  // Use the exact PNG logo URL provided by the user
  const logoUrl = 'https://santacasabh.org.br/wp-content/uploads/2023/05/logo-gscbh.png';

  // Calculate proportional height based on iconSize
  const height = iconSize;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={logoUrl}
        alt="Grupo Santa Casa BH"
        referrerPolicy="no-referrer"
        style={{ height: height, width: 'auto', objectFit: 'contain' }}
        className="select-none max-w-full"
      />
    </div>
  );
};
