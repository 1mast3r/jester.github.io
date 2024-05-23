document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('Please install MetaMask to use this dApp!');
    }
});

const contractAddress = 'your_contract_address';
const abi = [
    // Вставьте ABI вашего контракта здесь
];

async function sendNotice() {
    const recipient = document.getElementById('recipient').value;
    if (!recipient) {
        alert('Please enter a recipient name.');
        return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    try {
        await contract.methods.sendNotice(recipient).send({ from: account });
        alert('Notice sent successfully!');
    } catch (error) {
        console.error('Error sending notice:', error);
        alert('Failed to send notice.');
    }
}

async function getNoticeById() {
    const noticeId = document.getElementById('noticeId').value;
    if (noticeId === '') {
        alert('Please enter a notice ID.');
        return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        const notice = await contract.methods.getNoticeById(noticeId).call();
        document.getElementById('noticeResult').innerText = `Recipient: ${notice.recipient}, Timestamp: ${new Date(notice.timestamp * 1000).toLocaleString()}`;
    } catch (error) {
        console.error('Error fetching notice:', error);
        alert('Failed to fetch notice.');
    }
}
