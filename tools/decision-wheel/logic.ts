export interface WheelOption {
  text: string;
  color: string;
}

export interface SpinResult {
  winner: string;
  angle: number;
  timestamp: Date;
}

export interface WheelState {
  options: WheelOption[];
  isSpinning: boolean;
  currentRotation: number;
  winner: string | null;
  history: SpinResult[];
}

// Default color palette for wheel segments
export const DEFAULT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
];

// Parse options from textarea input
export const parseOptions = (text: string): string[] => {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
};

// Generate wheel options with colors
export const generateWheelOptions = (options: string[]): WheelOption[] => {
  return options.map((text, index) => ({
    text,
    color: DEFAULT_COLORS[index % DEFAULT_COLORS.length]
  }));
};

// Draw the wheel on canvas
export const drawWheel = (
  canvas: HTMLCanvasElement,
  options: WheelOption[],
  rotation: number = 0
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx || options.length === 0) return;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  const segmentAngle = (2 * Math.PI) / options.length;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw segments
  options.forEach((option, index) => {
    const startAngle = (index * segmentAngle) + (rotation * Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle) + (rotation * Math.PI / 180);

    // Draw segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = option.color;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw text
    const textAngle = startAngle + segmentAngle / 2;
    const textRadius = radius * 0.7;
    const textX = centerX + Math.cos(textAngle) * textRadius;
    const textY = centerY + Math.sin(textAngle) * textRadius;

    ctx.save();
    ctx.translate(textX, textY);
    ctx.rotate(textAngle + Math.PI / 2);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Truncate long text
    let displayText = option.text;
    if (displayText.length > 12) {
      displayText = displayText.substring(0, 12) + '...';
    }
    
    ctx.fillText(displayText, 0, 0);
    ctx.restore();
  });

  // Draw center circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw pointer
  ctx.beginPath();
  ctx.moveTo(centerX + radius - 5, centerY);
  ctx.lineTo(centerX + radius - 25, centerY - 10);
  ctx.lineTo(centerX + radius - 25, centerY + 10);
  ctx.closePath();
  ctx.fillStyle = '#333333';
  ctx.fill();
};

// Animate wheel spin
export const spinWheel = (
  canvas: HTMLCanvasElement,
  options: WheelOption[],
  duration: number = 4000,
  onComplete: (winner: string, finalAngle: number) => void
): void => {
  const startTime = Date.now();
  const initialVelocity = 20 + Math.random() * 20; // Random initial speed
  const finalRotation = 1800 + Math.random() * 1800; // 5-10 full rotations
  
  let currentRotation = 0;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for realistic deceleration
    const easeOut = 1 - Math.pow(1 - progress, 3);
    currentRotation = finalRotation * easeOut;

    drawWheel(canvas, options, currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Determine winner
      const normalizedAngle = (360 - (currentRotation % 360)) % 360;
      const segmentAngle = 360 / options.length;
      const winnerIndex = Math.floor(normalizedAngle / segmentAngle);
      const winner = options[winnerIndex]?.text || options[0].text;
      
      onComplete(winner, currentRotation);
    }
  };

  animate();
};

// Trigger confetti animation
export const triggerConfetti = (): void => {
  if (typeof window !== 'undefined' && (window as any).confetti) {
    (window as any).confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
};

// Save wheel configuration to localStorage
export const saveWheelConfig = (options: string[]): void => {
  try {
    const saved = JSON.parse(localStorage.getItem('decisionWheelHistory') || '[]');
    const newConfig = {
      id: Date.now(),
      options,
      timestamp: new Date().toISOString()
    };
    
    const updated = [newConfig, ...saved.slice(0, 9)]; // Keep last 10
    localStorage.setItem('decisionWheelHistory', JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save wheel config:', error);
  }
};

// Load wheel configurations from localStorage
export const loadWheelConfigs = (): Array<{id: number, options: string[], timestamp: string}> => {
  try {
    return JSON.parse(localStorage.getItem('decisionWheelHistory') || '[]');
  } catch (error) {
    console.error('Failed to load wheel configs:', error);
    return [];
  }
};

// Export wheel result as image
export const downloadWheelImage = (canvas: HTMLCanvasElement, winner: string): void => {
  try {
    const link = document.createElement('a');
    link.download = `decision-wheel-${winner.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  } catch (error) {
    console.error('Failed to download image:', error);
  }
};

// Copy result to clipboard
export const copyResult = async (winner: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(`Decision Wheel Result: ${winner} 🎉`);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

// Shuffle array
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Remove duplicates
export const removeDuplicates = (options: string[]): string[] => {
  return [...new Set(options.map(opt => opt.trim()))].filter(opt => opt.length > 0);
};

// Default options for quick start
export const DEFAULT_OPTIONS = [
  'Yes',
  'No',
  'Maybe'
];

export const EXAMPLE_OPTIONS = {
  food: ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Tacos'],
  activities: ['Study', 'Workout', 'Read', 'Watch Movie', 'Go for Walk'],
  names: ['Alice', 'Bob', 'Charlie', 'David', 'Emma'],
  colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple']
};