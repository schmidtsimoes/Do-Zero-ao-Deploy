// Estado da aplicação
let favoritas = [];
let playlists = [
    {
        id: 1,
        nome: "Minhas Favoritas",
        musicas: []
    }
];

// Array de músicas (banco de dados simulado)
const musicas = [
    {
        titulo: "Cruel Summer",
        artista: "Taylor Swift",
        capaUrl: "https://upload.wikimedia.org/wikipedia/pt/4/48/Taylor_Swift_-_Lover.png",
        genero: "Pop"
    },
    {
        titulo: "As It Was",
        artista: "Harry Styles",
        capaUrl: "https://upload.wikimedia.org/wikipedia/pt/b/b1/Harry_Styles_-_Harry%27s_House.png",
        genero: "Pop"
    },
    {
        titulo: "Anti-Hero",
        artista: "Taylor Swift",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png",
        genero: "Pop"
    },
    {
        titulo: "About Damn Time",
        artista: "Lizzo",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/7/7b/Lizzo_-_Special.png",
        genero: "Pop"
    },
    {
        titulo: "Break My Soul",
        artista: "Beyoncé",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/a/ad/Renaissance_-_Beyonc%C3%A9.png",
        genero: "Pop/R&B"
    },
    {
        titulo: "Stay With Me",
        artista: "Calvin Harris",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/4/45/Funk_Wav_Bounces_Vol._2.jpg",
        genero: "Dance/Electronic"
    },
    {
        titulo: "I'm Good (Blue)",
        artista: "David Guetta & Bebe Rexha",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/a/a9/David_Guetta_and_Bebe_Rexha_-_I%27m_Good_%28Blue%29.png",
        genero: "Dance/Pop"
    },
    {
        titulo: "Unholy",
        artista: "Sam Smith & Kim Petras",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/1/1b/Sam_Smith_and_Kim_Petras_-_Unholy.png",
        genero: "Pop"
    },
    {
        titulo: "Late Night Talking",
        artista: "Harry Styles",
        capaUrl: "https://upload.wikimedia.org/wikipedia/pt/b/b1/Harry_Styles_-_Harry%27s_House.png",
        genero: "Pop"
    },
    {
        titulo: "Karma",
        artista: "Taylor Swift",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png",
        genero: "Pop"
    }
];

// Funções de utilidade
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Função para adicionar/remover das favoritas
function toggleFavorita(musica) {
    const index = favoritas.findIndex(m => m.titulo === musica.titulo);
    if (index === -1) {
        favoritas.push(musica);
    } else {
        favoritas.splice(index, 1);
    }
    localStorage.setItem('favoritas', JSON.stringify(favoritas));
    renderizarMusicas();
}

// Função para criar nova playlist
function criarPlaylist(nome) {
    const novaPlaylist = {
        id: playlists.length + 1,
        nome: nome,
        musicas: []
    };
    playlists.push(novaPlaylist);
    localStorage.setItem('playlists', JSON.stringify(playlists));
    renderizarPlaylists();
}

// Função para adicionar música à playlist
function adicionarNaPlaylist(musicaId, playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    const musica = musicas.find(m => m.titulo === musicaId);
    if (playlist && musica) {
        playlist.musicas.push(musica);
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }
}

// Função para renderizar as músicas
function renderizarMusicas() {
    const container = document.getElementById('lista-de-musicas');
    container.innerHTML = '';
    
    musicas.forEach(musica => {
        const card = document.createElement('div');
        card.className = 'musica-card';
        
        const isFavorita = favoritas.some(m => m.titulo === musica.titulo);
        
        card.innerHTML = `
            <img src="${musica.capaUrl}" alt="Capa do álbum - ${musica.titulo}">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
            <button class="play-button" onclick="reproduzirMusica('${musica.titulo}')">
                <i class="fas fa-play"></i>
            </button>
            <button class="favorite-btn ${isFavorita ? 'active' : ''}" onclick="toggleFavorita(${JSON.stringify(musica).replace(/"/g, '&quot;')})">
                <i class="fas ${isFavorita ? 'fa-heart' : 'fa-heart-o'}"></i>
            </button>
        `;
        
        // Adiciona menu de contexto para playlists
        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showPlaylistMenu(musica, e.clientX, e.clientY);
        });
        
        container.appendChild(card);
    });
}

// Função para reproduzir música
function reproduzirMusica(titulo) {
    const musica = musicas.find(m => m.titulo === titulo);
    if (musica) {
        document.getElementById('current-song-image').src = musica.capaUrl;
        document.getElementById('current-song-title').textContent = musica.titulo;
        document.getElementById('current-song-artist').textContent = musica.artista;
        
        // Simular progresso
        document.querySelector('.progress').style.width = '0%';
        setTimeout(() => {
            document.querySelector('.progress').style.width = '30%';
        }, 100);
    }
}

// Função para renderizar playlists
function renderizarPlaylists() {
    const container = document.getElementById('user-playlists');
    container.innerHTML = '<li><a href="#" onclick="showCreatePlaylistDialog()"><i class="fas fa-plus-circle"></i> Criar Playlist</a></li>';
    
    playlists.forEach(playlist => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" onclick="mostrarPlaylist(${playlist.id})">
                <i class="fas fa-music"></i> ${playlist.nome}
            </a>
        `;
        container.appendChild(li);
    });
}

// Função para mostrar diálogo de criação de playlist
function showCreatePlaylistDialog() {
    const nome = prompt('Digite o nome da nova playlist:');
    if (nome) {
        criarPlaylist(nome);
    }
}

// Função para mostrar menu de playlists
function showPlaylistMenu(musica, x, y) {
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.position = 'fixed';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.style.backgroundColor = '#282828';
    menu.style.padding = '8px';
    menu.style.borderRadius = '4px';
    menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    menu.style.zIndex = '1000';
    
    playlists.forEach(playlist => {
        const item = document.createElement('div');
        item.style.padding = '8px 16px';
        item.style.cursor = 'pointer';
        item.textContent = `Adicionar a ${playlist.nome}`;
        item.onmouseover = () => item.style.backgroundColor = '#383838';
        item.onmouseout = () => item.style.backgroundColor = 'transparent';
        item.onclick = () => {
            adicionarNaPlaylist(musica.titulo, playlist.id);
            document.body.removeChild(menu);
        };
        menu.appendChild(item);
    });
    
    document.body.appendChild(menu);
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function closeMenu() {
        if (document.body.contains(menu)) {
            document.body.removeChild(menu);
        }
        document.removeEventListener('click', closeMenu);
    });
}

// Função para mostrar playlist
function mostrarPlaylist(id) {
    const playlist = playlists.find(p => p.id === id);
    if (playlist) {
        const container = document.getElementById('lista-de-musicas');
        container.innerHTML = `
            <h2>${playlist.nome}</h2>
            <div class="playlist-songs">
                ${playlist.musicas.map(musica => `
                    <div class="musica-card">
                        <img src="${musica.capaUrl}" alt="Capa do álbum - ${musica.titulo}">
                        <h3>${musica.titulo}</h3>
                        <p>${musica.artista}</p>
                        <button class="play-button" onclick="reproduzirMusica('${musica.titulo}')">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Carregar dados salvos
document.addEventListener('DOMContentLoaded', () => {
    const savedFavoritas = localStorage.getItem('favoritas');
    const savedPlaylists = localStorage.getItem('playlists');
    
    if (savedFavoritas) {
        favoritas = JSON.parse(savedFavoritas);
    }
    
    if (savedPlaylists) {
        playlists = JSON.parse(savedPlaylists);
    }
    
    renderizarMusicas();
    renderizarPlaylists();
});