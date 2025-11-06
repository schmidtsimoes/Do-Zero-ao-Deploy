// Array de músicas (banco de dados simulado)
const musicas = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273566d4ee496766672400a06dd"
    },
    {
        titulo: "Billie Jean",
        artista: "Michael Jackson",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97"
    },
    {
        titulo: "Imagine",
        artista: "John Lennon",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273872d05a85022dba32a278b49"
    },
    {
        titulo: "Sweet Child O' Mine",
        artista: "Guns N' Roses",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2736a72a77f74b2ca5c4a21979a"
    },
    {
        titulo: "Smooth Criminal",
        artista: "Michael Jackson",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97"
    },
    {
        titulo: "Hotel California",
        artista: "Eagles",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273d628a4046d9e40c70b05a975"
    }
];

// Função para renderizar os cards de música
function renderizarMusicas() {
    const container = document.getElementById('lista-de-musicas');
    
    // Limpa o conteúdo atual do container
    container.innerHTML = '';
    
    // Para cada música no array, cria um card
    musicas.forEach(musica => {
        const card = document.createElement('div');
        card.className = 'musica-card';
        
        card.innerHTML = `
            <img src="${musica.capaUrl}" alt="Capa do álbum - ${musica.titulo}">
            <h3>${musica.titulo}</h3>
            <p>${musica.artista}</p>
        `;
        
        // Adiciona o card ao container
        container.appendChild(card);
    });
}

// Chama a função quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarMusicas);