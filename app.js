// Array de músicas (banco de dados simulado)
const musicas = [
    {
        titulo: "vampire",
        artista: "Olivia Rodrigo",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273af52c228c5c4c3325ce6ab4a",
        genero: "Pop"
    },
    {
        titulo: "Last Night",
        artista: "Morgan Wallen",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273559fd3cc1fe11a1c4a90e767",
        genero: "Country"
    },
    {
        titulo: "Flowers",
        artista: "Miley Cyrus",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d",
        genero: "Pop"
    },
    {
        titulo: "Cruel Summer",
        artista: "Taylor Swift",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
        genero: "Pop"
    },
    {
        titulo: "Paint The Town Red",
        artista: "Doja Cat",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273da59c8382d5c1f5174b2f8ce",
        genero: "Hip-Hop"
    },
    {
        titulo: "Karma",
        artista: "Taylor Swift",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
        genero: "Pop"
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