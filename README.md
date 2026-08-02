# Artools Precision

Landing page estática da Artools Precision Pen, pronta para publicação sem etapa de build.

## Estrutura

```text
.
├── index.html
└── assets/
    ├── css/
    │   └── site.css
    ├── images/
    │   ├── artools-closing-frame.jpg
    │   └── artools-pen-studio.png
    ├── js/
    │   └── site.js
    └── media/
        └── video2.mp4
```

As pastas de estudo e os arquivos antigos permanecem localmente, mas são ignorados pelo Git e pelo deploy na Vercel.

## Executar localmente

Abra um servidor HTTP na raiz do projeto:

```powershell
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Deploy

O diretório de publicação é a própria raiz do projeto e não há comando de build. O projeto pode ser publicado como site estático na Vercel, Netlify, GitHub Pages ou serviço equivalente.

