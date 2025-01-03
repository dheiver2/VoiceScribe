# VoiceScribe - Transcrição de Áudio com IA

VoiceScribe é uma aplicação web moderna para transcrição de áudio usando tecnologia avançada de IA. Esta documentação fornecerá todas as informações necessárias para entender, configurar e utilizar o projeto.

## 📋 Índice

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso](#uso)
- [Customização](#customização)
- [API e Integrações](#api-e-integrações)
- [Solução de Problemas](#solução-de-problemas)

## 🚀 Recursos

- **Transcrição de Áudio**: Suporte para arquivos MP3, WAV e M4A
- **Interface Bilíngue**: Suporte para múltiplos idiomas
- **Modo Escuro**: Interface adaptável com tema claro/escuro
- **Upload de Arquivos**: Suporte para arquivos de até 25MB
- **Pré-visualização de Áudio**: Player integrado para demonstração
- **Download de Transcrições**: Exportação em formato de texto
- **Design Responsivo**: Funciona em dispositivos móveis e desktop
- **Feedback Visual**: Barra de progresso e mensagens de status

## 💻 Tecnologias Utilizadas

- React.js
- Tailwind CSS
- Lucide Icons
- Web Audio API

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Navegador moderno com suporte a ES6

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/voicescribe.git
cd voicescribe
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── TranscriptionLanding.js
├── styles/
│   └── tailwind.css
├── assets/
│   └── audio/
└── utils/
    └── audioProcessing.js
```

## 🎯 Uso

### Upload de Arquivo

1. Clique no botão "Upload" ou arraste um arquivo para a área demarcada
2. Arquivos suportados: MP3, WAV, M4A (máx. 25MB)
3. Aguarde o processamento do arquivo
4. A transcrição aparecerá automaticamente após o processamento

### Demonstração de Áudio

1. Clique no botão "Reproduzir Demonstração" na seção principal
2. Use os controles de áudio para pausar/retomar
3. A reprodução para automaticamente ao final

### Download de Transcrição

1. Após a transcrição ser gerada, clique no botão "Download"
2. O arquivo será salvo no formato .txt
3. O nome padrão será "transcricao.txt"

## 🎨 Customização

### Temas

Para alterar as cores do tema:

1. Localize as classes Tailwind no componente
2. Modifique as cores conforme necessário:
```jsx
// Exemplo de customização
<div className="bg-blue-600"> // Mude para sua cor preferida
```

### Idiomas

Para adicionar novos idiomas:

1. Adicione o idioma no array `supportedLanguages`:
```jsx
const supportedLanguages = [
  'Português',
  'English',
  // Adicione mais idiomas aqui
];
```

## 🔌 API e Integrações

### Configuração da API

O projeto está preparado para integração com serviços de transcrição. Para configurar:

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione suas credenciais:
```env
REACT_APP_API_KEY=sua_chave_api
REACT_APP_API_URL=url_da_api
```

### Endpoints

- `/api/transcribe`: Endpoint para envio de arquivos de áudio
- `/api/download`: Endpoint para download de transcrições

## 🔧 Solução de Problemas

### Problemas Comuns

1. **Erro no Upload de Arquivo**
   - Verifique o formato do arquivo
   - Confirme se o tamanho está dentro do limite
   - Verifique a conexão com a internet

2. **Áudio não Reproduz**
   - Verifique se o arquivo de demonstração está acessível
   - Confirme se o navegador tem permissão de áudio
   - Tente atualizar a página

3. **Modo Escuro não Funciona**
   - Limpe o cache do navegador
   - Verifique as configurações do sistema
   - Atualize para a última versão do navegador

### Suporte

Para obter ajuda adicional:
- Abra uma issue no GitHub
- Contate o suporte em support@voicescribe.com
- Consulte a documentação completa em docs.voicescribe.com

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre nosso código de conduta e o processo para enviar pull requests.
