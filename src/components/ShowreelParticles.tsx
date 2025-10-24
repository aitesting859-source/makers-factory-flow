import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  angle: number;
  radius: number;
  size: number;
  speed: number;
  opacity: number;
}

const ShowreelParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 1800 }, (_, i) => ({
      id: i,
      angle: Math.random() * 360,
      radius: Math.random() * 600 + 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.15 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white orbital-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            left: '50%',
            top: '50%',
            transform: `rotate(${particle.angle}deg) translate(${particle.radius}px) rotate(-${particle.angle}deg)`,
            animation: `orbit ${50 / particle.speed}s linear infinite`,
            animationDelay: `${-Math.random() * 30}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ShowreelParticles;
