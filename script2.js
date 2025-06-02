// Configuración
const API_BASE_URL = 'https://localhost:7266';
const TIER_LETTERS = ['S', 'A', 'B', 'C', 'D', 'E'];

// Elementos del DOM
const rankingContainer = document.getElementById('rankingContainer');

// Colores para los tiers
// const tierColors = {
//     S: { bg: 'rgba(74, 0, 224, 0.3)', border: 'rgba(74, 0, 224, 0.5)' },
//     A: { bg: 'rgba(142, 45, 226, 0.3)', border: 'rgba(142, 45, 226, 0.5)' },
//     B: { bg: 'rgba(0, 198, 255, 0.3)', border: 'rgba(0, 198, 255, 0.5)' },
//     C: { bg: 'rgba(255, 215, 0, 0.3)', border: 'rgba(255, 215, 0, 0.5)' },
//     D: { bg: 'rgba(200, 200, 200, 0.3)', border: 'rgba(200, 200, 200, 0.5)' },
//     E: { bg: 'rgba(205, 127, 50, 0.3)', border: 'rgba(205, 127, 50, 0.5)' }
// };
const tierColors = {
  S:  { bg: 'rgba(224, 194, 0 ,0.3)',   border: 'rgba(255, 215, 0, 0.8)' },
  A:  { bg: 'rgba(187, 222, 251, 0.3)', border: 'rgba(155, 89, 182, 0.8)' },
  B:  { bg: 'rgba(174, 213, 129, 0.3)', border: 'rgba(52, 152, 219, 0.8)' },
  C:  { bg: 'rgba(255, 224, 178, 0.3)', border: 'rgba(46, 204, 113, 0.8)' },
  D:  { bg: 'rgba(255, 204, 188, 0.3)', border: 'rgba(231, 76, 60, 0.8)' },
  E:  { bg: 'rgba(197, 202, 233, 0.3)', border: 'rgba(243, 156, 18, 0.8)' },
  F:  { bg: 'rgba(178, 235, 242, 0.3)', border: 'rgba(94, 94, 94, 1)' },
  G:  { bg: 'rgba(255, 245, 157, 0.3)', border: 'rgba(255, 245, 157, 0.5)' },
  H:  { bg: 'rgba(128, 222, 234, 0.3)', border: 'rgba(128, 222, 234, 0.5)' },
  I:  { bg: 'rgba(248, 187, 208, 0.3)', border: 'rgba(248, 187, 208, 0.5)' },
  J:  { bg: 'rgba(200, 230, 201, 0.3)', border: 'rgba(200, 230, 201, 0.5)' },
  K:  { bg: 'rgba(255, 236, 179, 0.3)', border: 'rgba(255, 236, 179, 0.5)' },
  L:  { bg: 'rgba(179, 229, 252, 0.3)', border: 'rgba(179, 229, 252, 0.5)' },
  M:  { bg: 'rgba(255, 205, 210, 0.3)', border: 'rgba(255, 205, 210, 0.5)' },
  N:  { bg: 'rgba(215, 204, 200, 0.3)', border: 'rgba(215, 204, 200, 0.5)' },
  O:  { bg: 'rgba(224, 247, 250, 0.3)', border: 'rgba(224, 247, 250, 0.5)' },
  P:  { bg: 'rgba(255, 204, 128, 0.3)', border: 'rgba(255, 204, 128, 0.5)' },
  Q:  { bg: 'rgba(207, 216, 220, 0.3)', border: 'rgba(207, 216, 220, 0.5)' },
  R:  { bg: 'rgba(236, 239, 241, 0.3)', border: 'rgba(236, 239, 241, 0.5)' },
  T:  { bg: 'rgba(244, 143, 177, 0.3)', border: 'rgba(244, 143, 177, 0.5)' },
  U:  { bg: 'rgba(129, 212, 250, 0.3)', border: 'rgba(129, 212, 250, 0.5)' },
  V:  { bg: 'rgba(255, 171, 145, 0.3)', border: 'rgba(255, 171, 145, 0.5)' },
  W:  { bg: 'rgba(186, 104, 200, 0.3)', border: 'rgba(186, 104, 200, 0.5)' },
  X:  { bg: 'rgba(149, 117, 205, 0.3)', border: 'rgba(149, 117, 205, 0.5)' },
  Y:  { bg: 'rgba(121, 134, 203, 0.3)', border: 'rgba(121, 134, 203, 0.5)' },
  Z:  { bg: 'rgba(144, 202, 249, 0.3)', border: 'rgba(144, 202, 249, 0.5)' },
  AA: { bg: 'rgba(129, 199, 132, 0.3)', border: 'rgba(129, 199, 132, 0.5)' },
  AB: { bg: 'rgba(255, 213, 79, 0.3)',  border: 'rgba(255, 213, 79, 0.5)'  },
  AC: { bg: 'rgba(174, 234, 215, 0.3)', border: 'rgba(174, 234, 215, 0.5)' },
  AD: { bg: 'rgba(200, 200, 255, 0.3)', border: 'rgba(200, 200, 255, 0.5)' },
  AE: { bg: 'rgba(224, 224, 224, 0.3)', border: 'rgba(224, 224, 224, 0.5)' }
};

function renderPlayers(players) {
    if (!players?.length) {
        rankingContainer.innerHTML = '<div class="no-players">No players data available</div>';
        return;
    }

    // Ordenar jugadores
    const leagueOrder = { MASTER: 1, DIAMOND: 2, EMERALD: 3, PLATINUM: 4, GOLD: 5, SILVER: 6, BRONZE: 7 ,UNRANKED: 8 };
    const sortedPlayers = [...players].sort((a, b) =>
        leagueOrder[a.tier] - leagueOrder[b.tier] ||
        b.leaguePoints - a.leaguePoints ||
        b.wins - a.wins
    );

    // Agrupar Tiers
    rankingContainer.innerHTML = Array.from({ length: Math.ceil(sortedPlayers.length / 5) }, (_, i) => {
        const group = sortedPlayers.slice(i * 5, (i + 1) * 5);
        const tierLetter = TIER_LETTERS[i] || 'F';
        // const { bg, border } = tierColors[tierLetter] || {};
        const { border } = tierColors[tierLetter] || {};
//// <div class="tier-body" style="background-color: ${bg}; border: 1px solid ${border}">
  //<div class="tier-header" style="border-bottom: 2px solid ${border}"></div>
  //${player.tagLine ? `<div class="player-tag">${player.tagLine}</div>` : ''}
        return `
            <div class="tier-card">
                <div class="tier-header" >
                    Tier ${tierLetter}
                </div>
                
               <div class="tier-body" style=" border: 4px solid ${border}">
                    ${group.map((player, idx) => `
                        <div class="player-card">
                            <div class="player-header">
                                <div class="player-rank">${idx + 1}</div>
                                <div>
                                    <div class="player-name">${player.gameName}</div>
                                    
                                </div>
                            </div>
                            <div class="player-stats">
                                <div class="stat-item1"> <div class="stat-label">Rango</div> <div class="stat-value">${player.tier} ${player.rank}</div> </div>
                                <div class="stat-item2"><div class="stat-label">LP</div><div class="stat-value">${player.leaguePoints}</div></div>
                                <div class="stat-item3"><div class="stat-label3">Wins</div><div class="stat-value">${player.wins}</div></div>
                                <div class="stat-item4"><div class="stat-label4">Losses</div><div class="stat-value">${player.losses}</div></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}




// Cargar datos iniciales
async function loadRanking() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/summoner/friends-ranking`);
        if (!response.ok) throw new Error('Failed to load data');
        const data = await response.json();
        console.log("Datos JSON:", data);
        console.log("Tipo de dato:", typeof data);
console.log("Contenido de data:", data);

const allPlayers = Object.values(data).flat();
renderPlayers(allPlayers);

        
    } catch (error) {
        rankingContainer.innerHTML = `
            <div class="error-message">
                Error loading data: ${error.message}
            </div>
        `;
        console.error('Error:', error);
    }
}



// Inicializar
document.addEventListener('DOMContentLoaded', loadRanking);