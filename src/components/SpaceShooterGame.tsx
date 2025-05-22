
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { addSecretNumberAttempts } from './SecretNumberGame';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface Player extends GameObject {
  lives: number;
  score: number;
  invincible: boolean;
  invincibleTimer: number;
}

interface Enemy extends GameObject {
  id: string;
  type: 'basic' | 'fast' | 'tank';
  health: number;
}

interface Projectile extends GameObject {
  id: string;
  isEnemy: boolean;
}

interface Powerup extends GameObject {
  id: string;
  type: 'health' | 'speed' | 'shield' | 'weapon';
  active: boolean;
}

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
  brightness: number;
}

interface GameStats {
  highScore: number;
  gamesPlayed: number;
  enemiesDefeated: number;
  totalScore: number;
}

const SpaceShooterGame = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  const [player, setPlayer] = useState<Player>({
    x: 0,
    y: 0,
    width: 40,
    height: 50,
    speed: 5,
    lives: 3,
    score: 0,
    invincible: false,
    invincibleTimer: 0
  });
  
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [powerups, setPowerups] = useState<Powerup[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [keys, setKeys] = useState<Record<string, boolean>>({});
  const [lastShot, setLastShot] = useState(0);
  const [enemySpawnRate, setEnemySpawnRate] = useState(2000);
  const [lastEnemySpawn, setLastEnemySpawn] = useState(0);
  const [powerupActiveUntil, setPowerupActiveUntil] = useState<Record<string, number>>({});
  const [currentWeapon, setCurrentWeapon] = useState<'basic' | 'spread' | 'laser'>('basic');
  
  const [stats, setStats] = useState<GameStats>({
    highScore: 0,
    gamesPlayed: 0,
    enemiesDefeated: 0,
    totalScore: 0
  });
  
  // Carregar estatísticas
  useEffect(() => {
    const savedStats = localStorage.getItem('spaceShooterStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);
  
  // Inicializar estrelas de fundo
  const initializeStars = (count: number) => {
    const newStars: Star[] = [];
    
    for (let i = 0; i < count; i++) {
      newStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 0.2 + Math.random() * 0.5,
        size: 1 + Math.random() * 2,
        brightness: 0.5 + Math.random() * 0.5
      });
    }
    
    setStars(newStars);
  };
  
  // Inicializar jogo
  const startGame = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const { width, height } = canvas;
    
    setPlayer({
      x: width / 2 - 20,
      y: height - 70,
      width: 40,
      height: 50,
      speed: 5,
      lives: 3,
      score: 0,
      invincible: false,
      invincibleTimer: 0
    });
    
    setEnemies([]);
    setProjectiles([]);
    setPowerups([]);
    setCurrentWeapon('basic');
    setPowerupActiveUntil({});
    initializeStars(100);
    
    setGameStarted(true);
    setGameOver(false);
    setPaused(false);
    
    setLastEnemySpawn(Date.now());
  };
  
  // Event Listeners para teclas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || paused) return;
      
      setKeys(prev => ({ ...prev, [e.code]: true }));
      
      if (e.code === 'Space') {
        shoot();
      }
      
      if (e.code === 'Escape') {
        setPaused(prev => !prev);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.code]: false }));
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, paused]);
  
  // Loop do jogo
  useEffect(() => {
    if (!gameStarted || gameOver || paused) return;
    
    const gameLoop = (timestamp: number) => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Limpar o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Atualizar e desenhar estrelas
      updateStars();
      drawStars(ctx);
      
      // Atualizar posição do jogador
      updatePlayerPosition();
      
      // Verificar powerups ativos
      checkActivePowerups(timestamp);
      
      // Desenhar jogador
      drawPlayer(ctx);
      
      // Atualizar e desenhar projéteis
      updateProjectiles();
      drawProjectiles(ctx);
      
      // Atualizar e desenhar inimigos
      if (timestamp - lastEnemySpawn > enemySpawnRate) {
        spawnEnemy();
        setLastEnemySpawn(timestamp);
        
        // Diminuir tempo de spawn a cada inimigo (até um mínimo)
        setEnemySpawnRate(prev => Math.max(500, prev - 50));
      }
      updateEnemies();
      drawEnemies(ctx);
      
      // Atualizar e desenhar powerups
      updatePowerups();
      drawPowerups(ctx);
      
      // Verificar colisões
      checkCollisions();
      
      // Desenhar UI
      drawUI(ctx);
      
      // Continuar loop
      requestRef.current = requestAnimationFrame(gameLoop);
    };
    
    requestRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameStarted, gameOver, paused, player, enemies, projectiles, powerups, stars, keys]);
  
  // Atualizar posição do jogador
  const updatePlayerPosition = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    let { x, y, width, height, speed } = player;
    
    // Verificar se tem powerup de velocidade
    if (powerupActiveUntil.speed && powerupActiveUntil.speed > Date.now()) {
      speed *= 1.5;
    }
    
    if (keys.ArrowLeft || keys.KeyA) {
      x = Math.max(0, x - speed);
    }
    if (keys.ArrowRight || keys.KeyD) {
      x = Math.min(canvas.width - width, x + speed);
    }
    if (keys.ArrowUp || keys.KeyW) {
      y = Math.max(0, y - speed);
    }
    if (keys.ArrowDown || keys.KeyS) {
      y = Math.min(canvas.height - height, y + speed);
    }
    
    setPlayer(prev => ({
      ...prev,
      x,
      y
    }));
  };
  
  // Atualizar posição das estrelas
  const updateStars = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    setStars(prev => prev.map(star => {
      let { y, speed } = star;
      
      y += speed;
      
      if (y > canvas.height) {
        return {
          ...star,
          x: Math.random() * canvas.width,
          y: 0
        };
      }
      
      return {
        ...star,
        y
      };
    }));
  };
  
  // Desenhar estrelas
  const drawStars = (ctx: CanvasRenderingContext2D) => {
    stars.forEach(star => {
      const { x, y, size, brightness } = star;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  // Atirar
  const shoot = () => {
    if (!canvasRef.current) return;
    
    const now = Date.now();
    const shootDelay = currentWeapon === 'laser' ? 100 : 300; // Laser dispara mais rápido
    
    if (now - lastShot < shootDelay) return;
    
    setLastShot(now);
    
    const { x, y, width } = player;
    
    if (currentWeapon === 'basic') {
      // Tiro único
      setProjectiles(prev => [
        ...prev,
        {
          id: `p-${Date.now()}-${Math.random()}`,
          x: x + width / 2 - 2,
          y,
          width: 4,
          height: 15,
          speed: 8,
          isEnemy: false
        }
      ]);
    } else if (currentWeapon === 'spread') {
      // Tiro triplo (spread)
      setProjectiles(prev => [
        ...prev,
        {
          id: `p-${Date.now()}-1`,
          x: x + width / 2 - 2,
          y,
          width: 4,
          height: 15,
          speed: 8,
          isEnemy: false
        },
        {
          id: `p-${Date.now()}-2`,
          x: x + width / 2 - 2,
          y,
          width: 4,
          height: 15,
          speed: 7,
          isEnemy: false
        },
        {
          id: `p-${Date.now()}-3`,
          x: x + width / 2 - 2,
          y,
          width: 4,
          height: 15,
          speed: 7,
          isEnemy: false
        }
      ]);
    } else if (currentWeapon === 'laser') {
      // Laser (tiro largo)
      setProjectiles(prev => [
        ...prev,
        {
          id: `p-${Date.now()}-${Math.random()}`,
          x: x + width / 2 - 6,
          y,
          width: 12,
          height: 20,
          speed: 9,
          isEnemy: false
        }
      ]);
    }
  };
  
  // Atualizar projéteis
  const updateProjectiles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    setProjectiles(prev => prev
      .map(projectile => {
        const { y, speed, isEnemy } = projectile;
        return {
          ...projectile,
          y: isEnemy ? y + speed : y - speed
        };
      })
      .filter(projectile => {
        // Remover projéteis que saem da tela
        return projectile.isEnemy 
          ? projectile.y < canvas.height + projectile.height
          : projectile.y + projectile.height > 0;
      })
    );
  };
  
  // Spawn de inimigos
  const spawnEnemy = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const enemyTypes = ['basic', 'fast', 'tank'];
    const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)] as 'basic' | 'fast' | 'tank';
    
    let width = 30;
    let height = 30;
    let speed = 2;
    let health = 1;
    
    if (type === 'fast') {
      width = 25;
      height = 25;
      speed = 3;
      health = 1;
    } else if (type === 'tank') {
      width = 40;
      height = 40;
      speed = 1;
      health = 3;
    }
    
    const enemy: Enemy = {
      id: `e-${Date.now()}-${Math.random()}`,
      x: Math.random() * (canvas.width - width),
      y: -height,
      width,
      height,
      speed,
      type,
      health
    };
    
    setEnemies(prev => [...prev, enemy]);
  };
  
  // Atualizar inimigos
  const updateEnemies = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    setEnemies(prev => prev
      .map(enemy => {
        const { y, speed } = enemy;
        return {
          ...enemy,
          y: y + speed
        };
      })
      .filter(enemy => {
        // Remover inimigos que saem da tela
        if (enemy.y > canvas.height) {
          // Perder pontos quando um inimigo escapa
          setPlayer(prev => ({
            ...prev,
            score: Math.max(0, prev.score - 10)
          }));
          return false;
        }
        return true;
      })
    );
    
    // Chance de inimigos atirarem
    enemies.forEach(enemy => {
      if (Math.random() < 0.005) { // 0.5% de chance por frame
        setProjectiles(prev => [
          ...prev,
          {
            id: `ep-${Date.now()}-${Math.random()}`,
            x: enemy.x + enemy.width / 2 - 2,
            y: enemy.y + enemy.height,
            width: 4,
            height: 10,
            speed: 4,
            isEnemy: true
          }
        ]);
      }
    });
  };
  
  // Spawn de powerups
  const spawnPowerup = (x: number, y: number) => {
    if (Math.random() > 0.3) return; // 30% de chance de spawn
    
    const powerupTypes = ['health', 'speed', 'shield', 'weapon'];
    const type = powerupTypes[Math.floor(Math.random() * powerupTypes.length)] as 'health' | 'speed' | 'shield' | 'weapon';
    
    setPowerups(prev => [
      ...prev,
      {
        id: `pu-${Date.now()}-${Math.random()}`,
        x,
        y,
        width: 20,
        height: 20,
        speed: 1,
        type,
        active: false
      }
    ]);
  };
  
  // Atualizar powerups
  const updatePowerups = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    setPowerups(prev => prev
      .map(powerup => {
        const { y, speed } = powerup;
        return {
          ...powerup,
          y: y + speed
        };
      })
      .filter(powerup => {
        // Remover powerups que saem da tela ou já foram coletados
        return powerup.y < canvas.height && !powerup.active;
      })
    );
  };
  
  // Verificar powerups ativos
  const checkActivePowerups = (timestamp: number) => {
    // Verificar invencibilidade do jogador
    if (player.invincible && Date.now() > player.invincibleTimer) {
      setPlayer(prev => ({
        ...prev,
        invincible: false
      }));
    }
    
    // Verificar se algum powerup expirou
    if (powerupActiveUntil.weapon && powerupActiveUntil.weapon <= Date.now()) {
      setCurrentWeapon('basic');
    }
  };
  
  // Verificar colisões
  const checkCollisions = () => {
    // Verificar colisão entre projéteis do jogador e inimigos
    projectiles
      .filter(projectile => !projectile.isEnemy)
      .forEach(projectile => {
        enemies.forEach(enemy => {
          if (isColliding(projectile, enemy)) {
            // Remover projétil
            setProjectiles(prev => prev.filter(p => p.id !== projectile.id));
            
            // Diminuir vida do inimigo ou remover
            if (enemy.health === 1) {
              setEnemies(prev => prev.filter(e => e.id !== enemy.id));
              
              // Adicionar pontos
              const pointsGained = enemy.type === 'basic' ? 10 : enemy.type === 'fast' ? 15 : 25;
              setPlayer(prev => ({
                ...prev,
                score: prev.score + pointsGained
              }));
              
              // Atualizar estatísticas
              setStats(prev => ({
                ...prev,
                enemiesDefeated: prev.enemiesDefeated + 1,
                totalScore: prev.totalScore + pointsGained
              }));
              
              // Chance de dropar powerup
              spawnPowerup(enemy.x, enemy.y);
            } else {
              setEnemies(prev => prev.map(e => {
                if (e.id === enemy.id) {
                  return {
                    ...e,
                    health: e.health - 1
                  };
                }
                return e;
              }));
            }
          }
        });
      });
    
    // Verificar colisão entre projéteis inimigos e jogador
    if (!player.invincible) {
      projectiles
        .filter(projectile => projectile.isEnemy)
        .forEach(projectile => {
          if (isColliding(projectile, player)) {
            // Remover projétil
            setProjectiles(prev => prev.filter(p => p.id !== projectile.id));
            
            // Diminuir vida do jogador
            damagePlayer();
          }
        });
    }
    
    // Verificar colisão entre jogador e inimigos
    if (!player.invincible) {
      enemies.forEach(enemy => {
        if (isColliding(player, enemy)) {
          // Remover inimigo
          setEnemies(prev => prev.filter(e => e.id !== enemy.id));
          
          // Diminuir vida do jogador
          damagePlayer();
        }
      });
    }
    
    // Verificar colisão entre jogador e powerups
    powerups.forEach(powerup => {
      if (!powerup.active && isColliding(player, powerup)) {
        // Ativar powerup
        activatePowerup(powerup);
      }
    });
  };
  
  // Ativar powerup
  const activatePowerup = (powerup: Powerup) => {
    setPowerups(prev => prev.map(p => {
      if (p.id === powerup.id) {
        return {
          ...p,
          active: true
        };
      }
      return p;
    }));
    
    if (powerup.type === 'health') {
      setPlayer(prev => ({
        ...prev,
        lives: Math.min(prev.lives + 1, 5) // Máximo de 5 vidas
      }));
      
      toast({
        title: "Vida Extra!",
        description: "+1 Vida",
      });
    } else if (powerup.type === 'speed') {
      setPowerupActiveUntil(prev => ({
        ...prev,
        speed: Date.now() + 10000 // 10 segundos de velocidade aumentada
      }));
      
      toast({
        title: "Velocidade Aumentada!",
        description: "Você está mais rápido por 10 segundos",
      });
    } else if (powerup.type === 'shield') {
      setPlayer(prev => ({
        ...prev,
        invincible: true,
        invincibleTimer: Date.now() + 8000 // 8 segundos de invencibilidade
      }));
      
      toast({
        title: "Escudo Ativado!",
        description: "Você está invencível por 8 segundos",
      });
    } else if (powerup.type === 'weapon') {
      const weapons = ['spread', 'laser'];
      const newWeapon = weapons[Math.floor(Math.random() * weapons.length)] as 'spread' | 'laser';
      
      setCurrentWeapon(newWeapon);
      setPowerupActiveUntil(prev => ({
        ...prev,
        weapon: Date.now() + 15000 // 15 segundos de arma especial
      }));
      
      toast({
        title: "Nova Arma!",
        description: `${newWeapon === 'spread' ? 'Tiro Triplo' : 'Laser'} ativado por 15 segundos`,
      });
    }
  };
  
  // Diminuir vida do jogador e verificar game over
  const damagePlayer = () => {
    setPlayer(prev => {
      const newLives = prev.lives - 1;
      
      if (newLives <= 0) {
        handleGameOver();
        return {
          ...prev,
          lives: 0
        };
      }
      
      // Dar invencibilidade temporária após dano
      return {
        ...prev,
        lives: newLives,
        invincible: true,
        invincibleTimer: Date.now() + 2000 // 2 segundos de invencibilidade
      };
    });
  };
  
  // Verificar se duas entidades estão colidindo
  const isColliding = (a: GameObject, b: GameObject) => {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  };
  
  // Game Over
  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
    
    // Atualizar estatísticas
    const newStats = {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      highScore: Math.max(stats.highScore, player.score)
    };
    
    setStats(newStats);
    localStorage.setItem('spaceShooterStats', JSON.stringify(newStats));
    
    // Determinar recompensa baseada na pontuação
    let attempts = 1;
    
    if (player.score >= 300) {
      attempts = 3;
    } else if (player.score >= 150) {
      attempts = 2;
    }
    
    const newAttempts = addSecretNumberAttempts(attempts);
    
    toast({
      title: "Game Over!",
      description: `Pontuação: ${player.score} - Você ganhou ${attempts} tentativa${attempts > 1 ? 's' : ''} para o Jogo do Número Secreto!`,
    });
  };
  
  // Desenhar jogador
  const drawPlayer = (ctx: CanvasRenderingContext2D) => {
    const { x, y, width, height, invincible } = player;
    
    // Piscar se estiver invencível
    if (invincible && Math.floor(Date.now() / 100) % 2 === 0) {
      ctx.fillStyle = '#9b30ff'; // Cor de invencibilidade
    } else {
      ctx.fillStyle = '#00f3ff'; // Cor normal
    }
    
    // Desenhar nave do jogador
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.closePath();
    ctx.fill();
    
    // Desenhar escudo se estiver invencível
    if (invincible) {
      ctx.strokeStyle = '#9b30ff';
      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, width / 2 + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Desenhar propulsores
    ctx.fillStyle = '#ff2cdf';
    ctx.beginPath();
    ctx.moveTo(x + width / 4, y + height);
    ctx.lineTo(x + width / 4 + 5, y + height + 10);
    ctx.lineTo(x + width / 4 - 5, y + height + 10);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x + width * 3 / 4, y + height);
    ctx.lineTo(x + width * 3 / 4 + 5, y + height + 10);
    ctx.lineTo(x + width * 3 / 4 - 5, y + height + 10);
    ctx.closePath();
    ctx.fill();
  };
  
  // Desenhar projéteis
  const drawProjectiles = (ctx: CanvasRenderingContext2D) => {
    projectiles.forEach(projectile => {
      const { x, y, width, height, isEnemy } = projectile;
      
      ctx.fillStyle = isEnemy ? '#ff2cdf' : '#00f3ff';
      
      if (currentWeapon === 'laser' && !isEnemy) {
        // Desenhar laser com efeito
        ctx.fillStyle = 'rgba(0, 243, 255, 0.7)';
        ctx.fillRect(x, y, width, height);
        
        // Brilho interno
        const gradient = ctx.createLinearGradient(x, y, x + width, y);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x + 2, y, width - 4, height);
      } else {
        // Projéteis normais
        ctx.fillRect(x, y, width, height);
      }
    });
  };
  
  // Desenhar inimigos
  const drawEnemies = (ctx: CanvasRenderingContext2D) => {
    enemies.forEach(enemy => {
      const { x, y, width, height, type, health } = enemy;
      
      if (type === 'basic') {
        ctx.fillStyle = '#ff2cdf';
        ctx.fillRect(x, y, width, height);
      } else if (type === 'fast') {
        ctx.fillStyle = '#ff8800';
        ctx.beginPath();
        ctx.moveTo(x + width / 2, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.closePath();
        ctx.fill();
      } else if (type === 'tank') {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Indicador de vida
        if (health > 1) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px Arial';
          ctx.fillText(health.toString(), x + width / 2 - 3, y + height / 2 + 3);
        }
      }
    });
  };
  
  // Desenhar powerups
  const drawPowerups = (ctx: CanvasRenderingContext2D) => {
    powerups.forEach(powerup => {
      if (powerup.active) return;
      
      const { x, y, width, height, type } = powerup;
      
      let color = '#ffffff';
      let text = '';
      
      switch (type) {
        case 'health':
          color = '#00ff00';
          text = '❤️';
          break;
        case 'speed':
          color = '#ffff00';
          text = '⚡';
          break;
        case 'shield':
          color = '#9b30ff';
          text = '🛡️';
          break;
        case 'weapon':
          color = '#00f3ff';
          text = '🔫';
          break;
      }
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#000000';
      ctx.font = '14px Arial';
      ctx.fillText(text, x + width / 2 - 7, y + height / 2 + 5);
    });
  };
  
  // Desenhar UI
  const drawUI = (ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Pontuação
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`${player.score}`, 20, 30);
    
    // Vidas
    for (let i = 0; i < player.lives; i++) {
      ctx.fillStyle = '#ff2cdf';
      ctx.fillRect(20 + i * 25, 40, 20, 20);
    }
    
    // Arma atual
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText(`Arma: ${
      currentWeapon === 'basic' ? 'Básica' : 
      currentWeapon === 'spread' ? 'Tripla' : 'Laser'
    }`, canvas.width - 120, 30);
  };
  
  // Se o jogo não começou, mostra tela inicial
  if (!gameStarted && !gameOver) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">SPACE SHOOTER</span>
          </h2>
          <p className="text-gray-300 light:text-gray-700 mb-6">
            Destrua naves inimigas, colete powerups e sobreviva o máximo possível!
          </p>
          
          <div className="flex flex-col space-y-4">
            <NeonButton onClick={() => startGame()} className="w-full">
              Iniciar Jogo
            </NeonButton>
            
            <NeonButton onClick={() => setShowControls(!showControls)} variant="outline" className="w-full">
              {showControls ? 'Ocultar Controles' : 'Ver Controles'}
            </NeonButton>
          </div>
          
          {showControls && (
            <div className="mt-6 bg-space-accent/20 p-4 rounded-lg border border-neon-purple/30">
              <h3 className="text-neon-blue text-lg font-medium mb-3">Controles:</h3>
              <ul className="text-left space-y-2 text-sm text-gray-300 light:text-gray-700">
                <li>⬅️ ➡️ ⬆️ ⬇️ ou WASD: Movimentar a nave</li>
                <li>Espaço: Atirar</li>
                <li>ESC: Pausar/Continuar</li>
              </ul>
              
              <h3 className="text-neon-blue text-lg font-medium mt-4 mb-3">Powerups:</h3>
              <ul className="text-left space-y-2 text-sm text-gray-300 light:text-gray-700">
                <li>❤️ Vida Extra: +1 vida</li>
                <li>⚡ Velocidade: Aumenta velocidade temporariamente</li>
                <li>🛡️ Escudo: Invencibilidade temporária</li>
                <li>🔫 Arma: Melhora sua arma temporariamente</li>
              </ul>
            </div>
          )}
        </div>
        
        <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-neon-blue">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-neon-blue text-xl font-bold">{stats.highScore}</p>
                <p className="text-gray-300 light:text-gray-700">Maior Pontuação</p>
              </div>
              <div>
                <p className="text-neon-pink text-xl font-bold">{stats.gamesPlayed}</p>
                <p className="text-gray-300 light:text-gray-700">Partidas Jogadas</p>
              </div>
              <div>
                <p className="text-neon-purple text-xl font-bold">{stats.enemiesDefeated}</p>
                <p className="text-gray-300 light:text-gray-700">Inimigos Derrotados</p>
              </div>
              <div>
                <p className="text-neon-purple text-xl font-bold">{stats.totalScore}</p>
                <p className="text-gray-300 light:text-gray-700">Pontuação Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Tela de Game Over
  if (gameOver) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">GAME OVER</span>
          </h2>
          
          <div className="bg-space-accent/20 border border-neon-purple/30 rounded-lg p-6 mb-6">
            <p className="text-4xl font-bold text-neon-blue mb-2">{player.score}</p>
            <p className="text-gray-300 light:text-gray-700">Pontuação</p>
            
            {player.score >= stats.highScore && stats.gamesPlayed > 1 && (
              <p className="text-neon-pink mt-2">Novo Recorde!</p>
            )}
          </div>
          
          <div className="flex flex-col space-y-4">
            <NeonButton onClick={() => startGame()} className="w-full">
              Jogar Novamente
            </NeonButton>
          </div>
        </div>
        
        <Card className="bg-space-darker/80 dark:bg-space-darker/80 light:bg-white/90 border-neon-purple/20 mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-neon-blue">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-neon-blue text-xl font-bold">{stats.highScore}</p>
                <p className="text-gray-300 light:text-gray-700">Maior Pontuação</p>
              </div>
              <div>
                <p className="text-neon-pink text-xl font-bold">{stats.gamesPlayed}</p>
                <p className="text-gray-300 light:text-gray-700">Partidas Jogadas</p>
              </div>
              <div>
                <p className="text-neon-purple text-xl font-bold">{stats.enemiesDefeated}</p>
                <p className="text-gray-300 light:text-gray-700">Inimigos Derrotados</p>
              </div>
              <div>
                <p className="text-neon-purple text-xl font-bold">{stats.totalScore}</p>
                <p className="text-gray-300 light:text-gray-700">Pontuação Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Jogo em execução
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          <span className="text-gradient">SPACE SHOOTER</span>
        </h2>
        {paused && (
          <div className="text-neon-purple">
            PAUSADO
          </div>
        )}
      </div>
      
      <div className="relative bg-space-darker rounded-lg border border-neon-purple/30 overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width={450} 
          height={500}
          className="w-full h-[500px]"
        />
        
        {paused && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-neon-blue mb-4">JOGO PAUSADO</p>
              <NeonButton onClick={() => setPaused(false)} className="mt-2">
                Continuar
              </NeonButton>
            </div>
          </div>
        )}
      </div>
      
      {/* Controles para dispositivos móveis */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="flex justify-start">
          <button 
            onMouseDown={() => setKeys(prev => ({ ...prev, ArrowLeft: true }))}
            onMouseUp={() => setKeys(prev => ({ ...prev, ArrowLeft: false }))}
            onTouchStart={() => setKeys(prev => ({ ...prev, ArrowLeft: true }))}
            onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowLeft: false }))}
            className="w-12 h-12 flex items-center justify-center bg-space-accent/30 border border-neon-purple/30 rounded-full"
          >
            <span className="text-white text-xl">←</span>
          </button>
        </div>
        
        <div className="flex justify-center gap-2">
          <button 
            onMouseDown={() => setKeys(prev => ({ ...prev, ArrowUp: true }))}
            onMouseUp={() => setKeys(prev => ({ ...prev, ArrowUp: false }))}
            onTouchStart={() => setKeys(prev => ({ ...prev, ArrowUp: true }))}
            onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowUp: false }))}
            className="w-12 h-12 flex items-center justify-center bg-space-accent/30 border border-neon-purple/30 rounded-full"
          >
            <span className="text-white text-xl">↑</span>
          </button>
          
          <button 
            onMouseDown={() => setKeys(prev => ({ ...prev, ArrowDown: true }))}
            onMouseUp={() => setKeys(prev => ({ ...prev, ArrowDown: false }))}
            onTouchStart={() => setKeys(prev => ({ ...prev, ArrowDown: true }))}
            onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowDown: false }))}
            className="w-12 h-12 flex items-center justify-center bg-space-accent/30 border border-neon-purple/30 rounded-full"
          >
            <span className="text-white text-xl">↓</span>
          </button>
        </div>
        
        <div className="flex justify-end">
          <button 
            onMouseDown={() => setKeys(prev => ({ ...prev, ArrowRight: true }))}
            onMouseUp={() => setKeys(prev => ({ ...prev, ArrowRight: false }))}
            onTouchStart={() => setKeys(prev => ({ ...prev, ArrowRight: true }))}
            onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowRight: false }))}
            className="w-12 h-12 flex items-center justify-center bg-space-accent/30 border border-neon-purple/30 rounded-full"
          >
            <span className="text-white text-xl">→</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={shoot}
          onTouchStart={shoot}
          className="w-full h-12 bg-neon-blue/20 border border-neon-blue rounded-md text-white"
        >
          ATIRAR
        </button>
      </div>
    </div>
  );
};

export default SpaceShooterGame;
