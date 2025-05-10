import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { eventSource, event_types, updateMessageBlock } from '../../../../../script.js';
import { getContext } from '../../../../extensions.js';
import { updateReasoningUI } from '../../../../reasoning.js';

// Choose the root container for the extension's main UI
const rootContainer = document.getElementById('extensions_settings');
const rootElement = document.createElement('div');
rootContainer.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

function createEventHandler(translateFunction) {
    return async (data) => {
        await translateFunction(data);
    };
}

function isGeneratingSwipe(messageId) {
    //return $(`#chat .mes[mesid="${messageId}"] .mes_text`).text() === '...';
    return false;
}

async function translateIncomingMessageReasoning(messageId) {
    const context = getContext();
    const message = context.chat[messageId];

    if (!message) {
        return false;
    }

    if (typeof message.extra !== 'object') {
        message.extra = {};
    }

    if (!message.extra.reasoning || isGeneratingSwipe(messageId)) {
        return false;
    }

    //const textToTranslate = substituteParams(message.extra.reasoning, context.name1, message.name);
    //const translation = await translate(textToTranslate, extension_settings.translate.target_language);
    const translation = "喵喵喵1";
    message.extra.reasoning_display_text = translation;

    updateReasoningUI(Number(messageId));
    return true;
}

async function translateIncomingMessage(messageId) {
    const context = getContext();
    const message = context.chat[messageId];

    if (!message) {
        return;
    }

    if (typeof message.extra !== 'object') {
        message.extra = {};
    }

    if (isGeneratingSwipe(messageId)) {
        return;
    }

    //const textToTranslate = substituteParams(message.mes, context.name1, message.name);
    //const translation = await translate(textToTranslate, extension_settings.translate.target_language);
    const translation = "喵喵2";
    message.extra.display_text = translation;

    updateMessageBlock(Number(messageId), message);
}

const handleIncomingMessage = createEventHandler(async (messageId) => {
    await translateIncomingMessageReasoning(messageId);
    await translateIncomingMessage(messageId);
});

eventSource.makeFirst(event_types.CHARACTER_MESSAGE_RENDERED, handleIncomingMessage);