/* global SillyTavern */

function App() {
    function handleClick() {
        alert(`Hello, ${SillyTavern.getContext().name1}!`);
    }

    return (
        <div className="huffman_settings">
            <div className="inline-drawer">
                <div className="inline-drawer-toggle inline-drawer-header">
                    <b data-i18n="ext_huffman_title">Huffman插件</b>
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
