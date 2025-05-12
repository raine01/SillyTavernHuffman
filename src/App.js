/* global SillyTavern */

function App() {

    function translate(text) {

        const randomArraySize = 10;
        const charMap = {};
        const encodedArray = [];
        const randomArray = Array.from({ length: randomArraySize }, (_, i) => i)
            .sort(() => Math.random() - 0.5);
        let randomNumArrayIndex = 0;
        let randomNumIndex = 0;

        for (const char of text) {
            if (/[\u4e00-\u9fa5]/.test(char)) {
                if (!charMap[char]) {
                    charMap[char] = randomNumArrayIndex * randomArraySize + randomArray[randomNumIndex++];
                    if (randomNumIndex >= randomArraySize) {
                        randomNumArrayIndex++;
                        randomNumIndex = 0;
                        randomArray.sort(() => Math.random() - 0.5);
                    }
                }
                encodedArray.push(charMap[char]);
            } else {
                encodedArray.push(char);
            }
        }

        const encodedString = encodedArray.join(',');

        const conversionTable = Object.entries(charMap)
            .sort(() => Math.random() - 0.5)
            .map(([char, num]) => `${num}：${char}`)
            .join('；');

        return `${encodedString}\n转换表\n${conversionTable}`;
    }

    async function translateOutgoingMessage(messageId) {
        const context = SillyTavern.getContext();
        const message = context.chat[messageId];

        if (typeof message.extra !== 'object') {
            message.extra = {};
        }

        const originalText = message.mes;
        message.extra.display_text = originalText;
        message.mes = translate(originalText);
        context.updateMessageBlock(messageId, message);

        console.log('translateOutgoingMessage', messageId);
    }

    SillyTavern.getContext().eventSource.makeFirst(SillyTavern.getContext().eventTypes.USER_MESSAGE_RENDERED, translateOutgoingMessage);

    return (
        <div className="huffman_settings">
            <div className="inline-drawer">
                <div className="inline-drawer-toggle inline-drawer-header">
                    <b>Huffman插件</b>
                    <div className="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
                </div>
                <div className="inline-drawer-content">
                    若无需要配置的东西就删了
                </div>
            </div>
        </div>
    );
}

export default App;