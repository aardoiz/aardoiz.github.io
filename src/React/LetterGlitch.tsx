import { useRef, useEffect, useState } from "react";

const MatrixTextWall = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<
    {
      char: string;
      color: string;
      targetColor: string;
      colorProgress: number;
      isMessage: boolean;
      messageIndex: number;
    }[]
  >([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());
  const [revealedChars, setRevealedChars] = useState(0);
  const [phase, setPhase] = useState<'glitch' | 'revealing' | 'complete'>('glitch');

  const messageLines = [
    " AI is the new electricity ",
    " and will transform and improve ", 
    " nearly all areas of human lives "
  ];
  const message = messageLines.join("");
  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;
  
  // Tonos de gris más apagados para los # 
  const grayColors = ["#333333", "#444444", "#555555", "#666666", "#777777", "#888888"];
  const glitchSpeed = 99;
  const centerVignette = false;
  const outerVignette = false;
  const smooth = true;
  
  // Paleta azul eléctrico MUY vibrante y brillante para el mensaje
  const blueColors = [
    "#00AAFF",  // Azul brillante
    "#33BBFF",  // Azul cielo brillante  
    "#66CCFF",  // Azul claro brillante
    "#00DDFF",  // Cian brillante
    "#4488FF",  // Azul real brillante
    "#77AAFF",  // Azul lavanda brillante
    "#00FFFF",  // Cian puro
    "#55CCFF"   // Azul hielo brillante
  ];

  const getRandomColor = (isMessage: boolean = false) => {
    if (isMessage) {
      return blueColors[Math.floor(Math.random() * blueColors.length)];
    }
    return grayColors[Math.floor(Math.random() * grayColors.length)];
  };

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number,
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const getMessagePosition = (columns: number, rows: number) => {
    // Calcular posición centrada para 3 líneas
    const lineHeight = 2; // Espaciado entre líneas
    const totalHeight = messageLines.length + (messageLines.length - 1) * (lineHeight - 1);
    const startRow = Math.floor((rows - totalHeight) / 2);
    
    return { startRow, lineHeight };
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    const { startRow, lineHeight } = getMessagePosition(columns, rows);

    letters.current = Array.from({ length: totalLetters }, (_, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      
      // Determinar si esta posición corresponde al mensaje
      let messageIndex = -1;
      let isMessage = false;
      
      // Revisar cada línea del mensaje
      let globalCharIndex = 0;
      
      for (let lineIndex = 0; lineIndex < messageLines.length; lineIndex++) {
        const line = messageLines[lineIndex];
        const lineRow = startRow + lineIndex * lineHeight;
        const lineStartCol = Math.floor((columns - line.length) / 2);
        
        if (row === lineRow && col >= lineStartCol && col < lineStartCol + line.length) {
          const charIndexInLine = col - lineStartCol;
          messageIndex = globalCharIndex + charIndexInLine;
          isMessage = true;
          break;
        }
        
        globalCharIndex += line.length;
      }

      return {
        char: "#",
        color: getRandomColor(false),
        targetColor: getRandomColor(false),
        colorProgress: 1,
        isMessage,
        messageIndex,
      };
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current!.getBoundingClientRect();
    
    // Fondo transparente
    ctx.clearRect(0, 0, width, height);
    
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      
      // Si es parte del mensaje revelado, usar colores vibrantes
      if (letter.isMessage && letter.messageIndex < revealedChars && letter.char !== "#") {
        ctx.fillStyle = letter.color;
        // Añadir un brillo sutil para las letras del mensaje
        ctx.shadowColor = letter.color;
        ctx.shadowBlur = 3;
        ctx.fillText(letter.char, x, y);
        ctx.shadowBlur = 0; // Reset shadow
      } else {
        // Para los # usar colores más apagados sin sombra
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      }
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    // Actualizar más caracteres para que se vea más dinámico
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.08));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      const letter = letters.current[index];
      
      // Solo actualizar # del fondo, no las letras del mensaje revelado
      if (letter.isMessage && letter.messageIndex < revealedChars) {
        // Keep updating revealed message letters with bright colors
        letter.targetColor = getRandomColor(true);
        letter.colorProgress = 0;
        continue;
      }

      letter.targetColor = getRandomColor(false);
      letter.colorProgress = 0;
    }
  };

  const updateMessageReveal = () => {
    if (phase !== 'revealing') return;

    letters.current.forEach((letter, index) => {
      if (letter.isMessage && letter.messageIndex === revealedChars) {
        // Cambiar # por la letra del mensaje
        letter.char = message[letter.messageIndex];
        letter.color = getRandomColor(true); // Set immediate bright color
        letter.targetColor = getRandomColor(true);
        letter.colorProgress = 1; // Make it immediate, no transition needed
      }
    });
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.08;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(
            startRgb,
            endRgb,
            letter.colorProgress,
          );
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  // Lógica de fases - sin reset automático
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === 'glitch') {
      // Mostrar efecto glitch por 3 segundos
      timer = setTimeout(() => {
        setPhase('revealing');
      }, 3000);
    } else if (phase === 'revealing') {
      // Revelar caracteres secuencialmente
      if (revealedChars < message.length) {
        timer = setTimeout(() => {
          setRevealedChars(prev => prev + 1);
        }, 40);
      } else {
        timer = setTimeout(() => {
          setPhase('complete');
        }, 800);
      }
    }
    // En fase 'complete' no hacemos nada - el mensaje permanece visible

    return () => clearTimeout(timer);
  }, [phase, revealedChars, message.length]);

  // Actualizar revelación cuando cambie revealedChars
  useEffect(() => {
    if (phase === 'revealing') {
      updateMessageReveal();
    }
  }, [revealedChars, phase]);

  const animate = () => {
    const now = Date.now();
    
    if (now - lastGlitchTime.current >= glitchSpeed) {
      if (phase === 'glitch' || phase === 'complete') {
        updateLetters();
      }
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext("2d");
    resizeCanvas();
    animate();

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current as number);
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", handleResize);
    };
  }, [glitchSpeed, smooth]);

  return (
    <div className="relative w-full h-full bg-[#101010] overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(16,16,16,0)_60%,_rgba(16,16,16,1)_100%)]"></div>
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>
      )}
    </div>
  );
};

export default MatrixTextWall;