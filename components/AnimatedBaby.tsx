'use client'

interface AnimatedBabyProps {
  color: 'pink' | 'blue'
  size?: number
}

export default function AnimatedBaby({ color, size = 80 }: AnimatedBabyProps) {
  const colors = color === 'pink' 
    ? {
        body: '#fff0f5',
        bodyDark: '#ffe4ec',
        onesie: '#f9a8d4',
        hair: '#fbbf24',
        hairBorder: '#f59e0b',
        skin: '#ffede2',
        mouth: '#FAA097',
      }
    : {
        body: '#f0f9ff',
        bodyDark: '#e0f2fe',
        onesie: '#93c5fd',
        hair: '#fbbf24',
        hairBorder: '#f59e0b',
        skin: '#ffede2',
        mouth: '#FAA097',
      }

  const scale = size / 80

  return (
    <div 
      className="animated-baby-container"
      style={{ 
        transform: `scale(${scale})`,
        width: 80,
        height: 100,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: 'absolute' }}>
        <defs>
          <filter id={`goo-${color}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" 
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      
      <div className="baby-wrapper">
        {/* Shadow */}
        <div 
          className="baby-shadow"
          style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
        />
        
        {/* Body */}
        <div 
          className="baby-body"
          style={{ 
            backgroundColor: colors.onesie,
          }}
        >
          <div 
            className="baby-body-inner"
            style={{ backgroundColor: colors.bodyDark }}
          />
        </div>
        
        {/* Head */}
        <div 
          className="baby-head"
          style={{ backgroundColor: colors.skin }}
        >
          {/* Hair */}
          <div className="hair-container">
            <div 
              className="hair hair-left"
              style={{ 
                backgroundColor: colors.hair,
                borderColor: colors.hairBorder,
              }}
            />
            <div 
              className="hair hair-right"
              style={{ backgroundColor: colors.hair }}
            />
          </div>
          
          {/* Eyes */}
          <div className="eye-container">
            <div className="eye" />
            <div className="eye" />
          </div>
          
          {/* Mouth */}
          <div className="mouth-container" style={{ filter: `url(#goo-${color})` }}>
            <div className="mouth mouth-left" style={{ backgroundColor: colors.mouth }} />
            <div className="mouth mouth-center" style={{ backgroundColor: colors.mouth }} />
            <div className="mouth mouth-right" style={{ backgroundColor: colors.mouth }} />
          </div>
        </div>
      </div>
    </div>
  )
}
