import React, { useState, useEffect } from 'react';

export default function TransparentLogo({ style, className, alt = 'Kitel Logo', height = '80px', lightMode = true }) {
  const [logoSrc, setLogoSrc] = useState('/logo-raw.jpg');

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = '/logo-raw.jpg';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const heightVal = canvas.height;
        
        // Remove white background using a flood fill starting at the corners
        const visited = new Uint8Array(width * heightVal);
        const queue = [];
        
        const checkAndPush = (x, y) => {
          if (x < 0 || x >= width || y < 0 || y >= heightVal) return;
          const idx = y * width + x;
          if (visited[idx]) return;
          
          const pIdx = idx * 4;
          const r = data[pIdx];
          const g = data[pIdx + 1];
          const b = data[pIdx + 2];
          
          // Check if color is close to white background
          if (r > 220 && g > 220 && b > 220) {
            visited[idx] = 1;
            queue.push([x, y]);
            data[pIdx + 3] = 0; // Set alpha to 0 (transparent background)
          }
        };
        
        // Seed from boundaries
        for (let x = 0; x < width; x++) {
          checkAndPush(x, 0);
          checkAndPush(x, heightVal - 1);
        }
        for (let y = 0; y < heightVal; y++) {
          checkAndPush(0, y);
          checkAndPush(width - 1, y);
        }
        
        // BFS / Flood fill
        let qHead = 0;
        while (qHead < queue.length) {
          const [cx, cy] = queue[qHead++];
          checkAndPush(cx + 1, cy);
          checkAndPush(cx - 1, cy);
          checkAndPush(cx, cy + 1);
          checkAndPush(cx, cy - 1);
        }
        
        // If lightMode is enabled, recolor dark logo pixels to bright white and lime green for dark background
        if (lightMode) {
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) { // Non-transparent pixel
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              
              // If green-ish (leaf body), boost to bright lime green (#b4ce4c)
              if (g > r && g > b) {
                data[i] = 180;     // R
                data[i + 1] = 206; // G
                data[i + 2] = 76;  // B
              } else { // Dark text/lines, convert to bright clean white (#ffffff)
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
              }
            }
          }
        }
        
        ctx.putImageData(imgData, 0, 0);
        setLogoSrc(canvas.toDataURL());
      } catch (err) {
        console.error('Failed to make logo transparent:', err);
      }
    };
  }, [lightMode]);

  return (
    <img 
      src={logoSrc} 
      alt={alt} 
      className={className} 
      style={{ height, display: 'block', objectFit: 'contain', ...style }} 
    />
  );
}
