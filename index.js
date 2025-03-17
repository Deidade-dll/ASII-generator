// Conjunto 1 
const figlet = require('figlet');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const fonts = ['Star Wars','Stellar','Stforek','Stick Letters','Stop','Straight','Stronger Than All','Sub-Zero','Swamp Land','Swan','Sweet','THIS','Tanja','Tengwar','Term','Test1','The Edge','Thick','Thin','Thorned','Three Point','Ticks Slant','Ticks','Tiles','Tinker-Toy','Tombstone','Train','Trek','Tsalagi','Tubular','Twisted','Two Point','USA Flag','Univers','Varsity','Wavy','Weird','Wet Letter','Whimsy','Wow'];
let lang = '';

// Conjunto 2
const msg = (k) => ({
  tryAgain: lang === 'English' ? 'Would you like to try another ASCII art? (1 - yes / n - no): ' : 'Gostaria de gerar outra arte ASCII? (1 - sim / n - não): ',
  emptyText: lang === 'English' ? 'Empty text! Please enter something.' : 'Texto vazio! Por favor, insira algo.',
  enterText: lang === 'English' ? 'Enter the text to generate ASCII art: ' : 'Digite o texto para gerar a arte ASCII: ',
  languageChoice: lang === 'English' ? 'Choose the language:\n1 - English\n2 - Portuguese\nEnter 1 or 2: ' : 'Escolha o idioma:\n1 - Inglês\n2 - Português\nDigite 1 ou 2: '
}[k] || '');
const show = (m, e = false) => console.log(`${e ? 'Erro: ' : ''}${m}`);

// Conjunto 3 
const ascii = (t, f) => figlet(t, { font: f }, (err, d) => err ? show('Não foi possível gerar a arte ASCII.', true) : (console.log(d), again(t)));
const again = (t) => rl.question(msg('tryAgain'), a => a === '1' ? chooseFont(t) : a.toLowerCase() === 'n' ? (show('Obrigado por usar o gerador de arte ASCII! Até logo.'), rl.close()) : (show('Resposta inválida. Digite "1" para sim ou "n" para não.', true), again(t)));
const listFonts = () => {
  console.log(`\n${'─'.repeat(50)}\n\t\tEscolha o estilo da arte ASCII:\n${'─'.repeat(50)}\n`);
  fonts.forEach((f, i) => process.stdout.write(`  ${i + 1}. ${f.padEnd(20)}  ${(i + 1) % 3 === 0 ? '\n' : ''}`));
  console.log(`\n${'─'.repeat(50)}\nEscolha o número da fonte desejada para gerar a arte ASCII.\n`);
};
const chooseFont = (t) => {
  listFonts();
  rl.question('\nDigite o número do estilo que você quer: ', c => {
    const i = parseInt(c) - 1;
    i >= 0 && i < fonts.length ? ascii(t, fonts[i]) : (show('Escolha inválida. Por favor, insira um número válido.', true), chooseFont(t));
  });
};
const askText = () => rl.question(msg('enterText'), tx => tx.trim() === '' ? (show(msg('emptyText'), true), askText()) : chooseFont(tx));
const askLang = () => rl.question(msg('languageChoice'), c => c === '1' ? (lang = 'English', askText()) : c === '2' ? (lang = 'Português', askText()) : (show('Escolha inválida. Insira 1 para Inglês ou 2 para Português.', true), askLang()));


askLang();
