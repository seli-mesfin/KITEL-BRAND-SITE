import React, { useEffect, useState } from 'react';

export default function AfricaNetworkMap() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Connection destinations emanating from Ethiopia (Origin: cx=680, cy=380)
  const connections = [
    { target: 'Kenya', x: 670, y: 440, label: 'East Africa' },
    { target: 'Egypt', x: 640, y: 220, label: 'North Africa' },
    { target: 'Nigeria', x: 480, y: 360, label: 'West Africa' },
    { target: 'South Africa', x: 570, y: 620, label: 'Southern Africa' },
    { target: 'Ghana', x: 420, y: 380, label: 'West Coast' },
    { target: 'Morocco', x: 410, y: 190, label: 'NW Africa' },
    { target: 'UAE / Middle East', x: 770, y: 270, label: 'Middle East' },
    { target: 'Europe', x: 590, y: 120, label: 'Europe Hub' },
    { target: 'India / Asia', x: 860, y: 320, label: 'Asia Link' },
  ];

  const originX = 680;
  const originY = 380;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'transparent',
      }}
    >
      {/* Background Radial Glow around Ethiopia Origin */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180, 206, 76, 0.35) 0%, rgba(67, 106, 50, 0.15) 50%, transparent 75%)',
          filter: 'blur(40px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <svg
        viewBox="0 0 950 720"
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '620px',
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 15px 35px rgba(67, 106, 50, 0.12))',
        }}
      >
        <defs>
          {/* Kitel Gradient for Africa Continent Silhouette */}
          <linearGradient id="africaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#436a32" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#355327" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#273d1c" stopOpacity="0.95" />
          </linearGradient>

          {/* Line Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── High-Precision Stylized African Continent Silhouette ── */}
        <path
          d="M 430,130 Q 520,110 630,150 Q 720,200 750,260 Q 780,310 740,360 Q 710,390 680,440 Q 640,520 610,600 Q 570,680 540,660 Q 510,620 530,550 Q 540,490 490,440 Q 440,420 380,390 Q 320,360 360,300 Q 390,240 370,190 Q 390,150 430,130 Z"
          fill="url(#africaGradient)"
          stroke="#b4ce4c"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Surrounding Region Outlines (Europe / Middle East / Madagascar) */}
        <path
          d="M 540,70 Q 620,60 700,90 Q 660,140 600,150 Z"
          fill="#436a32"
          fillOpacity="0.3"
          stroke="#b4ce4c"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M 720,240 Q 820,220 860,280 Q 790,320 740,290 Z"
          fill="#436a32"
          fillOpacity="0.4"
          stroke="#b4ce4c"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Madagascar */}
        <path
          d="M 680,510 Q 710,490 730,540 Q 710,600 670,570 Z"
          fill="url(#africaGradient)"
          stroke="#b4ce4c"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />

        {/* Grid Lattice Network overlay on Continent */}
        <path
          d="M 400,200 L 700,200 M 350,300 L 750,300 M 420,400 L 700,400 M 480,500 L 650,500 M 520,600 L 600,600"
          stroke="#ffffff"
          strokeOpacity="0.1"
          strokeWidth="1"
        />

        {/* ── Animated Networking Signal Connection Curves from Ethiopia ── */}
        {connections.map((conn, idx) => {
          const midX = (originX + conn.x) / 2;
          const midY = (originY + conn.y) / 2 - 30; // Arc curvature
          const pathD = `M ${originX},${originY} Q ${midX},${midY} ${conn.x},${conn.y}`;

          // Pulsing light traveling along path
          const offsetRatio = ((pulseIndex + idx * 12) % 100) / 100;
          const pulseX = (1 - offsetRatio) * (1 - offsetRatio) * originX + 2 * (1 - offsetRatio) * offsetRatio * midX + offsetRatio * offsetRatio * conn.x;
          const pulseY = (1 - offsetRatio) * (1 - offsetRatio) * originY + 2 * (1 - offsetRatio) * offsetRatio * midY + offsetRatio * offsetRatio * conn.y;

          return (
            <g key={idx}>
              {/* Outer Glowing Arc Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#b4ce4c"
                strokeWidth="2.5"
                strokeOpacity="0.75"
                filter="url(#glow)"
              />

              {/* Inner White Core Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.9"
              />

              {/* Animated Signal Data Pulse Traveling along Arc */}
              <circle
                cx={pulseX}
                cy={pulseY}
                r="4.5"
                fill="#ffffff"
                filter="url(#glow)"
              />
              <circle
                cx={pulseX}
                cy={pulseY}
                r="7"
                fill="none"
                stroke="#b4ce4c"
                strokeWidth="1.5"
              />

              {/* Destination Country Endpoint Node */}
              <circle
                cx={conn.x}
                cy={conn.y}
                r="5"
                fill="#b4ce4c"
              />
              <circle
                cx={conn.x}
                cy={conn.y}
                r="9"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Label */}
              <text
                x={conn.x + 12}
                y={conn.y + 4}
                fill="#436a32"
                fontSize="11"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                {conn.target}
              </text>
            </g>
          );
        })}

        {/* ── ETHIOPIA ORIGIN BEACON (Primary Focal Node) ── */}
        <g transform={`translate(${originX}, ${originY})`}>
          {/* Expanding Ripple Ring 1 */}
          <circle
            r={(pulseIndex % 50) * 1.2 + 8}
            fill="none"
            stroke="#b4ce4c"
            strokeWidth="1.5"
            opacity={1 - (pulseIndex % 50) / 50}
          />
          {/* Expanding Ripple Ring 2 */}
          <circle
            r={((pulseIndex + 25) % 50) * 1.2 + 8}
            fill="none"
            stroke="#436a32"
            strokeWidth="1.5"
            opacity={1 - ((pulseIndex + 25) % 50) / 50}
          />

          {/* Central Beacon Solid Node */}
          <circle r="12" fill="#436a32" />
          <circle r="8" fill="#b4ce4c" />
          <circle r="5" fill="#ffffff" filter="url(#glow)" />

          {/* Ethiopia Origin Label */}
          <rect x="-55" y="-38" width="110" height="24" rx="12" fill="#436a32" />
          <text
            x="0"
            y="-22"
            fill="#ffffff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            🇪🇹 ETHIOPIA
          </text>
        </g>
      </svg>
    </div>
  );
}
