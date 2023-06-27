const chatContainer = document.getElementById('chat-container');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('input-text');
const submitButton = document.getElementById('submit-btn');
let userName = ''; // Variabila pentru a stoca numele utilizatorului

submitButton.addEventListener('click', sendMessage);
userInput.addEventListener('input', function() {
    userInput.value = userInput.value;
});
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = userInput.value.trim();
    
    if (userMessage !== '') {
        displayMessage(userMessage, 'user');
        processCommand(userMessage.toLowerCase());
        userInput.value = '';
        userInput.focus();
    }
}


function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const contentElement = document.createElement('span');
    contentElement.innerText = message;

    // Verificăm dacă mesajul conține cod HTML
    if (message.includes('[HTML]')) {
        const codeElement = document.createElement('pre');
        codeElement.classList.add('html-code');
        codeElement.innerText = message.replace('[HTML]', ''); // Eliminăm markerul specific pentru codul HTML

        const typeElement = document.createElement('span');
        typeElement.classList.add('code-type');
        typeElement.innerText = 'HTML';

        messageElement.appendChild(typeElement); // Adăugăm indicatorul de tip HTML în div-ul mesajului
        messageElement.appendChild(codeElement); // Adăugăm codul HTML în div-ul mesajului
    }
    // Verificăm dacă mesajul conține cod CSS
    else if (message.includes('[CSS]')) {
        const codeElement = document.createElement('pre');
        codeElement.classList.add('css-code');
        codeElement.innerText = message.replace('[CSS]', ''); // Eliminăm markerul specific pentru codul CSS

        const typeElement = document.createElement('span');
        typeElement.classList.add('code-type');
        typeElement.innerText = 'CSS';

        messageElement.appendChild(typeElement); // Adăugăm indicatorul de tip CSS în div-ul mesajului
        messageElement.appendChild(codeElement); // Adăugăm codul CSS în div-ul mesajului
    } else {
        messageElement.appendChild(contentElement);
    }

    chatMessages.appendChild(messageElement);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const allMessages = chatMessages.querySelectorAll('.message');
    const messageCount = allMessages.length;
    const maxMessages = 20;

    if (messageCount > maxMessages) {
        for (let i = 0; i < messageCount - maxMessages; i++) {
            allMessages[i].remove();
        }
    }
}


  

let lastCommand = '';

function processCommand(userCommand) {
    let foundCommand = false;
    let lowercaseCommand = userCommand.toLowerCase();
    
    // Verificăm dacă ultimul caracter este un semn de punctuație
    const lastChar = lowercaseCommand.slice(-1);
    const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
    if (punctuationRegex.test(lastChar)) {
        lowercaseCommand = lowercaseCommand.slice(0, -1); // Eliminăm ultimul caracter de punctuație
    }

    if (lowercaseCommand.includes('numele meu este')) {
        const newName = lowercaseCommand.replace('numele meu este', '').trim();
        userName = newName;
        displayMessage(`Bună, ${userName}!`, 'assistant');
        foundCommand = true;
    } else if (lowercaseCommand.includes('salut')) {
        if (lastCommand === 'salut' || lastCommand === 'buna') {
            displayMessage('Bună din nou!', 'assistant');
        } else {
            if (userName !== '') {
                displayMessage(`Salut, ${userName}! Cu ce te pot ajuta?`, 'assistant');
            } else {
                displayMessage('Salut! Cu ce te pot ajuta?', 'assistant');
            }
        }
        foundCommand = true;
    } else if (lowercaseCommand.includes('buna')) {
        if (lastCommand === 'salut' || lastCommand === 'buna') {
            displayMessage('Bună din nou!', 'assistant');
        } else {
            if (userName !== '') {
                displayMessage(`Bună, ${userName}! Cu ce te pot ajuta?`, 'assistant');
            } else {
                displayMessage('Bună! Cu ce te pot ajuta?', 'assistant');
            }
        }
        foundCommand = true;
    } else if (lowercaseCommand.includes('in ce data suntem')) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('ro-RO');
        displayMessage(`Suntem în data de ${formattedDate}.`, 'assistant');
        foundCommand = true;
    } else if (lowercaseCommand.includes('cum te numesti')|| lowercaseCommand.includes('care e numele tau') || lowercaseCommand.includes('ce nume ai')) {
        displayMessage('Mă numesc Danlex.', 'assistant');
        foundCommand = true;
    } else if (lowercaseCommand.includes('goleste conversația') || lowercaseCommand.includes('goleste conversatia')) {
        clearChat();
        displayWelcomeMessage();
        foundCommand = true;
    }
    else if (lowercaseCommand.includes('ce faci') || lowercaseCommand.includes('ce mai faci')) {
        displayMessage('Sunt un program de computer, deci nu am emoții sau stări fizice, dar sunt aici să te ajut cu orice întrebare sau problemă ai. Ce pot să fac pentru tine?','assistant')
        foundCommand = true;
    } else if (lowercaseCommand.includes('nu stiu')) {
        if (lastCommand === 'salut' || lastCommand === 'buna') {
            displayMessage('Nu e nicio problemă. Există multe lucruri despre care putem conversa. Să începem cu ceva simplu: cum a fost ziua ta până acum? Sau avem și alte subiecte pe care le poți aborda, dacă dorești.', 'assistant');
        } else {
            displayMessage('Vă rog să specificați despre ce anume nu știți.', 'assistant');
        }
        foundCommand = true;
    } else if (lowercaseCommand.includes('ma poti ajuta')||lowercaseCommand.includes('mai putea ajuta')||lowercaseCommand.includes('ajutama')) {
        displayMessage('Desigur,cu ce te pot ajuta?','assistant')
        foundCommand = true;
    }

    else if  (lowercaseCommand.includes('fuck you') || lowercaseCommand.includes('dute drq') || lowercaseCommand.includes('sugi pula') || lowercaseCommand.includes('bagamias pula in mata'))
    {
        displayMessage('Îmi pare rău dacă ai fost deranjat sau nemulțumit în vreun fel, dar nu pot răspunde la cereri ofensatoare sau nepotrivite. Dacă ai o întrebare sau o problemă pe care aș putea să o abordez, te rog să mi-o spui într-un mod adecvat și voi fi bucuros să te ajut.','assistant')
        foundCommand = true;
    }
    else if (lowercaseCommand.includes('care este cel mai mare ocean al lumi')) {
        displayMessage('Cel mai mare ocean al lumii este Oceanul Pacific.','assistant')
        foundCommand = true;
    }
    else if (lowercaseCommand.includes('ce versiune ai')) {
        displayMessage('Sunt un asistent bazat pe modelul Danlex 1.5, creat de Dollz. Cunosc informații prestabilite de catre Dollz,prin urmare unele intrebari pot fi necnoscute.','assistant')
        foundCommand = true;
    }

    if (!foundCommand && lowercaseCommand.includes('cat e')) {
        const expression = lowercaseCommand.replace('cat e', '').trim();
        const result = evaluateExpression(expression);
    
        if (result !== null) {
            displayMessage(`Rezultatul expresiei "${expression}" este ${result}.`, 'assistant');
        } else {
            displayMessage('Nu pot evalua expresia. Te rog verifică sintaxa și asigură-te că este o expresie validă.', 'assistant');
        }
    
        foundCommand = true;
    }else if (!foundCommand && lowercaseCommand.includes('radical din')) {
        const number = parseFloat(lowercaseCommand.replace('radical din', '').trim());
        
        if (!isNaN(number)) {
            const squareRoot = calculateSquareRoot(number);
            
            if (squareRoot !== null) {
                displayMessage(`Rădăcina pătrată a numărului ${number} este ${squareRoot}.`, 'assistant');
            } else {
                displayMessage('Nu pot calcula rădăcina pătrată a numărului. Te rog verifică valoarea introdusă.', 'assistant');
            }
        } else {
            displayMessage('Nu pot identifica un număr valid pentru a calcula rădăcina pătrată. Te rog verifică sintaxa.', 'assistant');
        }
        
        foundCommand = true;
    }


   else if (lowercaseCommand.includes('creaza header') ||lowercaseCommand.includes('imi poti face un header') ||lowercaseCommand.includes('creaza un header') || lowercaseCommand.includes('fami un header')) {
        const headerHTML = `
            <header>
                <h1>Titlul paginii</h1>
                <nav>
                    <ul>
                        <li><a href="#">Acasă</a></li>
                        <li><a href="#">Despre</a></li>
                        <li><a href="#">Servicii</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;
        const headerCSS = `
            header {
                background-color: #f2f2f2;
                padding: 10px;
            }
            
            h1 {
                color: #333;
            }
            
            nav ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }
            
            nav li {
                display: inline;
                margin-right: 10px;
            }
            
            nav li a {
                text-decoration: none;
                color: #555;
            }
        `;
    
        const messageHTML = '[HTML]' + headerHTML;
        const messageCSS = '[CSS]' + headerCSS;
    
        displayMessage(messageHTML, 'assistant');
        displayMessage(messageCSS, 'assistant');
    
        foundCommand = true;
    }
    
    

    if (!foundCommand) {
        displayMessage('Nu am înțeles. Te rog reformulează întrebarea.', 'assistant');
    }

    lastCommand = lowercaseCommand;
}

function clearChat() {
    chatMessages.innerHTML = ''; // Ștergem toate mesajele din chat
}

function displayWelcomeMessage() {
    const welcomeMessage = "Buna,cu ce te pot ajuta azi?";
    displayMessage(welcomeMessage, 'assistant');
}


function calculateSquareRoot(number) {
    let squareRoot = null;
    if (number >= 0) {
        squareRoot = Math.sqrt(number);
        squareRoot = squareRoot.toFixed(3); // Reducem rezultatul la trei cifre zecimale
    }
    return squareRoot;
}
function evaluateExpression(expression) {
    try {
        const result = eval(expression);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
    foundCommand = true;
}


document.addEventListener('DOMContentLoaded', function() {
    displayWelcomeMessage();
});
