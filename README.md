# CryptoWeb - atividade de introdução à criptografia

Projeto didático com interface web e API em Node.js/TypeScript para OTP, Cifra de César, Vigenère, Hill e ataque de força bruta à cifra de César. As cifras são implementadas no próprio projeto, sem biblioteca criptográfica pronta.

## Requisitos

- Node.js 20 ou superior e npm.

## Como executar após clonar

No PowerShell, na pasta do repositório:

```powershell
cd backend
npm install
npm run dev
```

Mantenha esse terminal aberto. Acesse a interface em <http://localhost:3000> e a documentação da API em <http://localhost:3000/api-docs>. O servidor também publica as páginas HTML da pasta `frontend`.

Para parar o servidor, pressione `Ctrl+C`. Para rodar o ataque de César pelo terminal, em outro terminal execute `cd backend` e `npm run attack`.

## OTP em decimal

Informe bytes decimais entre 0 e 255, separados por vírgula ou espaço. Exemplo para `HELLO`: `72, 69, 76, 76, 79`. Uma chave opcional deve conter um byte para cada byte da mensagem; se deixada vazia, o sistema gera uma chave aleatória. A tela mostra decimal, binário e XOR. A saída pode ser decriptada na seção abaixo, e os campos são preenchidos automaticamente.

O OTP só oferece segurança teórica quando a chave é verdadeiramente aleatória, tão longa quanto a mensagem e usada uma única vez. Este projeto é uma demonstração acadêmica.

## Rotas principais

- `POST /api/caesar/encrypt` e `/api/caesar/decrypt`
- `POST /api/vigenere/encrypt` e `/api/vigenere/decrypt`
- `POST /api/hill/encrypt` e `/api/hill/decrypt`
- `POST /api/otp/encrypt` e `/api/otp/decrypt`

Abra `/api-docs` para ver os formatos das requisições. A cifra de Hill usa matriz 2×2 módulo 26 e acrescenta `X` ao texto claro quando necessário; esse preenchimento aparece no resultado decripto.

## Escopo da atividade

Os quatro algoritmos e a opção de criptoanálise por força bruta de César estão implementados. O OTP aceita bytes decimais e apresenta a representação binária para cada operação, conforme o enunciado. O ataque de César compara os 25 deslocamentos usando frequências de letras e palavras comuns em português e inglês; textos curtos podem continuar gerando sugestões incertas.
